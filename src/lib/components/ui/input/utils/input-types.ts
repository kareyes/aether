import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
import type { WithElementRef } from "$core/utils.js";
import type { InputVariant, InputSize } from './input-variants.js';
import type { MaskType, MaskPattern } from './input-masks.js';

export type InputType = Exclude<HTMLInputTypeAttribute, "file">;

export interface InputProps extends WithElementRef<Omit<HTMLInputAttributes, "type" | "size">> {
	variant?: InputVariant;
	size?: InputSize;
	/** 
	 * Input mask - can be a predefined mask name or a custom MaskPattern object.
	 * Predefined masks: 'phone', 'ssn', 'creditCard', 'date', 'time'
	 * Custom mask: { pattern: RegExp, placeholder: string, transform?: function }
	 */
	mask?: MaskType | MaskPattern;
	type?: InputType;
	class?: string;
	"data-slot"?: string;
}

// Re-export types from other modules for convenience
export type { InputVariant, InputSize } from './input-variants.js';
export type { MaskType, MaskPattern, MaskConfig } from './input-masks.js';