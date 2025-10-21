import Root, {
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	buttonVariants,
} from "./button.svelte";


const Variants: ButtonVariant[] = Object.keys(buttonVariants.variants.variant) as ButtonVariant[];
const Sizes: ButtonSize[] = Object.keys(buttonVariants.variants.size) as ButtonSize[];



export {
	Root,
	type ButtonProps as Props,
	//
	Root as Button,
	buttonVariants,
	Variants,
	Sizes,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
};
