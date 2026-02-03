/**
 * Schema validation utilities for form handling
 *
 * Provides helpers to validate form data against @effect/schema
 * and extract field-level errors for UI display.
 */
import { Schema, SchemaAST, Effect, Either, ParseResult, pipe } from "effect";

// ============================================================================
// Validation Result Types
// ============================================================================

/** Field-level validation errors (mutable version for internal use) */
type MutableFieldErrors = Record<string, string | undefined>;

/** Field-level validation errors */
export interface FieldErrors {
  readonly [fieldName: string]: string | undefined;
}

/** Validation result with typed success/failure */
export type ValidationResult<T> =
  | { readonly valid: true; readonly data: T; readonly errors: undefined }
  | { readonly valid: false; readonly data: undefined; readonly errors: FieldErrors };

// ============================================================================
// Error Extraction
// ============================================================================

/**
 * Helper to get first element from SingleOrNonEmpty path
 */
const getFirstKey = (path: ParseResult.Path): PropertyKey => {
  if (Array.isArray(path)) {
    return path[0] as PropertyKey;
  }
  return path as PropertyKey;
};

/**
 * Helper to iterate SingleOrNonEmpty issues
 */
const iterateIssues = (issues: ParseResult.SingleOrNonEmpty<ParseResult.ParseIssue>): ParseResult.ParseIssue[] => {
  if (Array.isArray(issues)) {
    return issues as ParseResult.ParseIssue[];
  }
  return [issues as ParseResult.ParseIssue];
};

/**
 * Recursively extract all field errors from a ParseResult error
 */
const extractFieldErrors = (
  error: ParseResult.ParseError,
  prefix = ""
): FieldErrors => {
  const errors: MutableFieldErrors = {};

  const processIssue = (issue: ParseResult.ParseIssue, path: string = ""): void => {
    switch (issue._tag) {
      case "Type": {
        // Type mismatch error
        const message = issue.message ?? `Invalid value`;
        if (path) {
          errors[path] = message;
        }
        break;
      }

      case "Missing": {
        // Missing required field
        if (path) {
          errors[path] = issue.message ?? "This field is required";
        }
        break;
      }

      case "Pointer": {
        // Field access - drill down
        const key = getFirstKey(issue.path);
        const fieldPath = path
          ? `${path}.${String(key)}`
          : String(key);
        processIssue(issue.issue, fieldPath);
        break;
      }

      case "Composite": {
        // Multiple issues
        for (const subIssue of iterateIssues(issue.issues)) {
          processIssue(subIssue, path);
        }
        break;
      }

      case "Refinement": {
        // Refinement/filter failure - process inner issue
        processIssue(issue.issue, path);
        break;
      }

      case "Transformation": {
        // Transformation error
        processIssue(issue.issue, path);
        break;
      }

      case "Forbidden": {
        // Unexpected field
        if (path) {
          errors[path] = issue.message ?? "This field is not allowed";
        }
        break;
      }
    }
  };

  processIssue(error.issue, prefix);
  return errors as FieldErrors;
};

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate form data against a schema synchronously
 *
 * @example
 * ```ts
 * const result = validateSync(UserSchema, formData);
 * if (result.valid) {
 *   console.log(result.data); // typed data
 * } else {
 *   console.log(result.errors); // field errors
 * }
 * ```
 */
export const validateSync = <A, I>(
  schema: Schema.Schema<A, I, never>,
  data: unknown
): ValidationResult<A> => {
  const decode = Schema.decodeUnknownEither(schema, { errors: "all" });
  const result = decode(data);

  return Either.match(result, {
    onLeft: (parseError: ParseResult.ParseError): ValidationResult<A> => ({
      valid: false as const,
      data: undefined,
      errors: extractFieldErrors(parseError)
    }),
    onRight: (validData: A): ValidationResult<A> => ({
      valid: true as const,
      data: validData,
      errors: undefined
    })
  });
};

/**
 * Validate form data and return an Effect
 *
 * @example
 * ```ts
 * const program = pipe(
 *   validate(UserSchema, formData),
 *   Effect.flatMap((validData) => registerUser(validData))
 * );
 * ```
 */
export const validate = <A, I, R>(
  schema: Schema.Schema<A, I, R>,
  data: unknown
): Effect.Effect<A, FieldErrors, R> =>
  pipe(
    Schema.decodeUnknown(schema, { errors: "all" })(data),
    Effect.mapError(extractFieldErrors)
  );

/**
 * Validate a single field against a schema
 *
 * @example
 * ```ts
 * const emailError = validateField(EmailSchema, emailValue);
 * // Returns string error message or undefined if valid
 * ```
 */
export const validateField = <A, I>(
  schema: Schema.Schema<A, I, never>,
  value: unknown
): string | undefined => {
  const decode = Schema.decodeUnknownEither(schema, { errors: "first" });
  const result = decode(value);

  return Either.match(result, {
    onLeft: (parseError: ParseResult.ParseError): string | undefined => {
      const errors = extractFieldErrors(parseError);
      return Object.values(errors)[0] ?? "Invalid value";
    },
    onRight: (_validData: A): string | undefined => undefined
  });
};

/**
 * Create a field validator function for a specific field in a struct schema
 *
 * @example
 * ```ts
 * const validateEmail = createFieldValidator(UserSchema, "email");
 * const error = validateEmail(emailValue);
 * ```
 */
export const createFieldValidator = <A extends Record<string, unknown>, I>(
  schema: Schema.Schema<A, I, never>,
  fieldName: keyof A
): (value: unknown) => string | undefined => {
  // Extract field schema from struct
  const ast = schema.ast;
  if (ast._tag !== "TypeLiteral") {
    throw new Error("createFieldValidator only works with Struct schemas");
  }

  const field = ast.propertySignatures.find(
    (prop: SchemaAST.PropertySignature) => prop.name === fieldName
  );

  if (!field) {
    throw new Error(`Field "${String(fieldName)}" not found in schema`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldSchema = Schema.make(field.type) as Schema.Schema<any, any, never>;

  return (value) => validateField(fieldSchema, value);
};

/**
 * Validate multiple fields and return combined errors
 *
 * @example
 * ```ts
 * const errors = validateFields(UserSchema, {
 *   email: emailValue,
 *   password: passwordValue
 * });
 * // Returns { email?: string, password?: string }
 * ```
 */
export const validateFields = <A extends Record<string, unknown>, I>(
  schema: Schema.Schema<A, I, never>,
  fields: Partial<Record<keyof A, unknown>>
): FieldErrors => {
  const errors: MutableFieldErrors = {};

  for (const [fieldName, value] of Object.entries(fields)) {
    try {
      const validator = createFieldValidator(schema, fieldName as keyof A);
      const error = validator(value);
      if (error) {
        errors[fieldName] = error;
      }
    } catch {
      // Field might not exist or schema structure issue
    }
  }

  return errors as FieldErrors;
};

// ============================================================================
// Async Validation (for server-side checks)
// ============================================================================

/**
 * Validate with potential async validators (e.g., email availability check)
 */
export const validateAsync = async <A, I>(
  schema: Schema.Schema<A, I, never>,
  data: unknown
): Promise<ValidationResult<A>> => {
  // First do sync validation
  const syncResult = validateSync(schema, data);

  if (!syncResult.valid) {
    return syncResult;
  }

  // Here you could add async validation steps
  // e.g., checking email availability via API

  return syncResult;
};

// ============================================================================
// Form State Helpers
// ============================================================================

/** Form field state */
export interface FieldState<T> {
  readonly value: T;
  readonly error: string | undefined;
  readonly touched: boolean;
  readonly dirty: boolean;
}

/** Create initial field state */
export const createFieldState = <T>(value: T): FieldState<T> => ({
  value,
  error: undefined,
  touched: false,
  dirty: false
});

/** Update field value and mark as dirty */
export const updateFieldValue = <T>(
  state: FieldState<T>,
  value: T
): FieldState<T> => ({
  ...state,
  value,
  dirty: true
});

/** Mark field as touched (e.g., on blur) */
export const touchField = <T>(state: FieldState<T>): FieldState<T> => ({
  ...state,
  touched: true
});

/** Set field error */
export const setFieldError = <T>(
  state: FieldState<T>,
  error: string | undefined
): FieldState<T> => ({
  ...state,
  error
});

/** Check if form has any errors */
export const hasErrors = (errors: FieldErrors): boolean =>
  Object.values(errors).some((error) => error !== undefined);

/** Get first error message */
export const getFirstError = (errors: FieldErrors): string | undefined =>
  Object.values(errors).find((error) => error !== undefined);
