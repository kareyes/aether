import type { WithElementRef, WithoutChildren } from "$core/utils.js";
import type { HTMLTextareaAttributes } from "svelte/elements";
import type { TextareaVariant, TextareaSize, TextareaResize } from "./textarea-variants.js";

export type TextareaProps = WithoutChildren<WithElementRef<HTMLTextareaAttributes>> & {
	variant?: TextareaVariant;
	size?: TextareaSize;
	resize?: TextareaResize;
	maxLength?: number;
	showCount?: boolean;
	autoResize?: boolean;
	minRows?: number;
	maxRows?: number;
};
