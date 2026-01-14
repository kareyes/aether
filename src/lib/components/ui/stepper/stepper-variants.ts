import { tv, type VariantProps } from "tailwind-variants";

export const stepperVariants = tv({
	slots: {
		root: ["flex gap-0"],
		step: [
			"flex items-center gap-2 relative",
			"transition-all duration-200",
		],
		stepButton: [
			"flex items-center justify-center rounded-full",
			"font-medium transition-all duration-300",
			"border-2 shrink-0",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"transform-gpu",
		],
		stepIcon: [
			"flex items-center justify-center",
			"transition-all duration-200",
		],
		stepContent: [
			"flex flex-col gap-1",
		],
		stepLabel: [
			"font-medium transition-colors duration-200",
		],
		stepDescription: [
			"text-sm text-muted-foreground transition-colors duration-200",
		],
		separator: [
			"flex-1 transition-all duration-200",
		],
		separatorLine: [
			"bg-border transition-all duration-200",
			"flex-shrink-0",
		],
	},
	variants: {
		orientation: {
			horizontal: {
				root: "flex-row items-start",
				step: "flex-col items-center",
				stepContent: "text-center",
				separator: "flex items-center justify-center flex-1",
				separatorLine: "h-[2px] w-full",
			},
			vertical: {
				root: "flex-col",
				step: "flex-row gap-3 last:pb-0",
				stepContent: "text-left flex-1 pt-1",
				separator: "flex items-center justify-start py-2 my-0 min-h-8",
				separatorLine: "w-0.5 h-full ml-[19px] bg-border",
			},
		},
		size: {
			xs: {
				stepButton: "size-6 text-xs",
				stepLabel: "text-xs",
				stepDescription: "text-[10px]",
			},
			sm: {
				stepButton: "size-8 text-sm",
				stepLabel: "text-sm",
				stepDescription: "text-xs",
			},
			default: {
				stepButton: "size-10 text-base",
				stepLabel: "text-base",
				stepDescription: "text-sm",
			},
			lg: {
				stepButton: "size-12 text-lg",
				stepLabel: "text-lg",
				stepDescription: "text-base",
			},
		},
		variant: {
			default: {
				stepButton: [
					"data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground data-[state=completed]:border-primary data-[state=completed]:scale-100",
					"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:scale-110 data-[state=active]:shadow-lg",
					"data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-border data-[state=inactive]:scale-95",
				],
				separatorLine: [
					"data-[state=completed]:bg-primary",
				],
			},
			outline: {
				stepButton: [
					"data-[state=completed]:bg-background data-[state=completed]:text-primary data-[state=completed]:border-primary data-[state=completed]:scale-100",
					"data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:scale-110 data-[state=active]:shadow-lg",
					"data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-border data-[state=inactive]:scale-95",
				],
				separatorLine: [
					"data-[state=completed]:bg-primary",
				],
			},
			ghost: {
				stepButton: [
					"border-0",
					"data-[state=completed]:bg-primary/10 data-[state=completed]:text-primary data-[state=completed]:scale-100",
					"data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:scale-110 data-[state=active]:shadow-lg",
					"data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground data-[state=inactive]:scale-95",
				],
				separatorLine: [
					"data-[state=completed]:bg-primary",
				],
			},
			flat: {
				root: "gap-0",
				step: "relative flex-1",
				stepButton: [
					"rounded-none border-0 size-auto w-full h-1 bg-border relative z-10",
					"text-transparent select-none pointer-events-none",
					"data-[state=completed]:bg-success",
					"data-[state=active]:bg-success",
					"data-[state=inactive]:bg-border",
				],
				separator: "hidden",
				separatorLine: "hidden",
				stepContent: "absolute -top-10 left-0 right-0 flex flex-col items-start gap-0.5 mb-2",
				stepLabel: [
					"text-sm font-medium whitespace-nowrap",
					"data-[state=completed]:text-success",
					"data-[state=active]:text-success",
					"data-[state=inactive]:text-muted-foreground",
				],
				stepDescription: [
					"text-xs",
					"data-[state=completed]:text-success/70",
					"data-[state=active]:text-success/70",
					"data-[state=inactive]:text-muted-foreground",
				],
			},
		},
		clickable: {
			true: {
				stepButton: "cursor-pointer hover:scale-105 active:scale-95",
			},
			false: {
				stepButton: "cursor-default",
			},
		},
	},
	compoundVariants: [
		// Vertical orientation size-specific separator positioning and height
		{
			orientation: "vertical",
			size: "xs",
			class: {
				separatorLine: "ml-[11px]", // (size-6 / 2) - 1px = 11px
				separator: "min-h-6",
			},
		},
		{
			orientation: "vertical",
			size: "sm",
			class: {
				separatorLine: "ml-[15px]", // (size-8 / 2) - 1px = 15px
				separator: "min-h-8",
			},
		},
		{
			orientation: "vertical",
			size: "default",
			class: {
				separatorLine: "ml-[19px]", // (size-10 / 2) - 1px = 19px
				separator: "min-h-10",
			},
		},
		{
			orientation: "vertical",
			size: "lg",
			class: {
				separatorLine: "ml-[23px]", // (size-12 / 2) - 1px = 23px
				separator: "min-h-12",
			},
		},
		// Horizontal orientation - align separator with button center
		{
			orientation: "horizontal",
			size: "xs",
			class: {
				separator: "mt-[12px]", // size-6 / 2 = 12px (to center with button)
			},
		},
		{
			orientation: "horizontal",
			size: "sm",
			class: {
				separator: "mt-[16px]", // size-8 / 2 = 16px (to center with button)
			},
		},
		{
			orientation: "horizontal",
			size: "default",
			class: {
				separator: "mt-[20px]", // size-10 / 2 = 20px (to center with button)
			},
		},
		{
			orientation: "horizontal",
			size: "lg",
			class: {
				separator: "mt-[24px]", // size-12 / 2 = 24px (to center with button)
			},
		},
	],
	defaultVariants: {
		orientation: "horizontal",
		size: "default",
		variant: "default",
		clickable: false,
	},
});

export type StepperVariants = VariantProps<typeof stepperVariants>;
export type StepperOrientation = NonNullable<StepperVariants["orientation"]>;
export type StepperSize = NonNullable<StepperVariants["size"]>;
export type StepperVariant = NonNullable<StepperVariants["variant"]>;
export type StepState = "inactive" | "active" | "completed";
