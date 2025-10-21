import Root, {
	type CheckboxProps,
	type CheckboxSize,
	type CheckboxVariant,
	checkboxVariants,
	checkboxIconVariants,
} from "./checkbox.svelte";

const Variants: CheckboxVariant[] = Object.keys(checkboxVariants.variants.variant) as CheckboxVariant[];
const Sizes: CheckboxSize[] = Object.keys(checkboxVariants.variants.size) as CheckboxSize[];

export {
	Root,
	type CheckboxProps as Props,
	//
	Root as Checkbox,
	checkboxVariants,
	checkboxIconVariants,
	Variants,
	Sizes,
};
