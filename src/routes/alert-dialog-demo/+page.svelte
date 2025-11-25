<script lang="ts">
	import { Button } from "$core/components/ui/button/index.js";
	import {
		AlertDialogProvider,
		getAlertDialogContext,
		type AlertDialogContext,
	} from "$core/components/ui/alert-dialog/index.js";
	import {
		AlertCircle,
		CheckCircle2,
		Info,
		AlertTriangle,
		Trash2,
		Save,
	} from "@lucide/svelte";

	let result = $state<string>("");

	// Variant Examples
	function showDefaultAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "default",
			title: "Default Alert",
			description: "This is a default alert dialog with standard styling.",
			onAction: () => {
				result = "Default: Action clicked";
			},
		});
	}

	function showDestructiveAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "destructive",
			title: "Delete Account",
			description:
				"This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
			icon: Trash2,
			actionText: "Delete",
			onAction: () => {
				result = "Destructive: Account deleted";
			},
		});
	}

	function showSuccessAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "success",
			title: "Success!",
			description: "Your changes have been saved successfully.",
			icon: CheckCircle2,
			actionText: "Great!",
			showCancel: false,
			onAction: () => {
				result = "Success: Confirmed";
			},
		});
	}

	function showWarningAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "warning",
			title: "Warning",
			description: "You have unsaved changes. Are you sure you want to continue?",
			icon: AlertTriangle,
			actionText: "Continue",
			onAction: () => {
				result = "Warning: Continued";
			},
		});
	}

	function showInfoAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "info",
			title: "Information",
			description: "Here's some important information you should know about.",
			icon: Info,
			actionText: "Got it",
			showCancel: false,
		});
	}

	// Size Examples
	function showSmallDialog(dialog: AlertDialogContext) {
		dialog.open({
			size: "sm",
			title: "Small Dialog",
			description: "This is a small alert dialog.",
			icon: Info,
		});
	}

	function showDefaultSizeDialog(dialog: AlertDialogContext) {
		dialog.open({
			size: "default",
			title: "Default Size Dialog",
			description: "This is a default size alert dialog.",
			icon: Info,
		});
	}

	function showLargeDialog(dialog: AlertDialogContext) {
		dialog.open({
			size: "lg",
			title: "Large Dialog",
			description:
				"This is a large alert dialog with more space for content. You can use this when you need to display more detailed information to the user.",
			icon: Info,
		});
	}

	// Configuration Examples
	function showNoCancelDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "No Cancel Button",
			description: "This dialog only has an action button.",
			showCancel: false,
		});
	}

	function showNoActionDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "No Action Button",
			description: "This dialog only has a cancel button.",
			showAction: false,
		});
	}

	function showCustomTextDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "Custom Button Text",
			description: "This dialog has custom button labels.",
			cancelText: "No, go back",
			actionText: "Yes, proceed",
			icon: AlertCircle,
		});
	}

	function showCallbacksDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "With Callbacks",
			description: "This dialog has callback functions for both buttons.",
			onCancel: () => {
				result = "Cancelled";
			},
			onAction: () => {
				result = "Confirmed";
			},
		});
	}

	// Practical Examples
	function showDeleteFileDialog(dialog: AlertDialogContext) {
		dialog.open({
			variant: "destructive",
			title: "Delete File",
			description: "Are you sure you want to delete this file? This action cannot be undone.",
			icon: Trash2,
			actionText: "Delete File",
			cancelText: "Keep File",
			onAction: () => {
				result = "File deleted";
			},
			onCancel: () => {
				result = "File kept";
			},
		});
	}

	function showSavePromptDialog(dialog: AlertDialogContext) {
		dialog.open({
			variant: "warning",
			title: "Unsaved Changes",
			description:
				"You have unsaved changes that will be lost. Do you want to save before leaving?",
			icon: Save,
			actionText: "Save Changes",
			cancelText: "Discard",
			onAction: () => {
				result = "Changes saved";
			},
			onCancel: () => {
				result = "Changes discarded";
			},
		});
	}

	function showPaymentSuccessDialog(dialog: AlertDialogContext) {
		dialog.open({
			variant: "success",
			size: "sm",
			title: "Payment Successful",
			description: "Your payment has been processed successfully.",
			icon: CheckCircle2,
			actionText: "Continue",
			showCancel: false,
			onAction: () => {
				result = "Payment confirmed";
			},
		});
	}
</script>

<AlertDialogProvider>
	<div class="container mx-auto max-w-4xl space-y-8 p-8">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold">Alert Dialog Implementation</h1>
			<p class="text-muted-foreground">
				Examples of programmatically triggered alert dialogs with various variants and
				configurations.
			</p>
		</div>

		{#snippet AlertDialogButtons()}
			{@const dialog = getAlertDialogContext()}

			<div class="space-y-6">
				<!-- Variants Section -->
				<div class="space-y-3">
					<h2 class="text-xl font-semibold">Variants</h2>
					<div class="flex flex-wrap gap-2">
						<Button onclick={() => dialog && showDefaultAlert(dialog)}>Default</Button>

						<Button variant="destructive" onclick={() => dialog && showDestructiveAlert(dialog)}>
							Destructive
						</Button>

						<Button color="success" onclick={() => dialog && showSuccessAlert(dialog)}>
							Success
						</Button>

						<Button color="warning" onclick={() => dialog && showWarningAlert(dialog)}>
							Warning
						</Button>

						<Button color="info" onclick={() => dialog && showInfoAlert(dialog)}>Info</Button>
					</div>
				</div>

				<!-- Sizes Section -->
				<div class="space-y-3">
					<h2 class="text-xl font-semibold">Sizes</h2>
					<div class="flex flex-wrap gap-2">
						<Button variant="outline" onclick={() => dialog && showSmallDialog(dialog)}>
							Small
						</Button>

						<Button variant="outline" onclick={() => dialog && showDefaultSizeDialog(dialog)}>
							Default
						</Button>

						<Button variant="outline" onclick={() => dialog && showLargeDialog(dialog)}>
							Large
						</Button>
					</div>
				</div>

				<!-- Configuration Options -->
				<div class="space-y-3">
					<h2 class="text-xl font-semibold">Configuration Options</h2>
					<div class="flex flex-wrap gap-2">
						<Button variant="outline" onclick={() => dialog && showNoCancelDialog(dialog)}>
							No Cancel
						</Button>

						<Button variant="outline" onclick={() => dialog && showNoActionDialog(dialog)}>
							No Action
						</Button>

						<Button variant="outline" onclick={() => dialog && showCustomTextDialog(dialog)}>
							Custom Text
						</Button>

						<Button variant="outline" onclick={() => dialog && showCallbacksDialog(dialog)}>
							With Callbacks
						</Button>
					</div>
				</div>

				<!-- Practical Examples -->
				<div class="space-y-3">
					<h2 class="text-xl font-semibold">Practical Examples</h2>
					<div class="flex flex-wrap gap-2">
						<Button onclick={() => dialog && showDeleteFileDialog(dialog)}>Delete File</Button>

						<Button variant="outline" onclick={() => dialog && showSavePromptDialog(dialog)}>
							Save Prompt
						</Button>

						<Button color="success" onclick={() => dialog && showPaymentSuccessDialog(dialog)}>
							Payment Success
						</Button>
					</div>
				</div>

				<!-- Result Display -->
				{#if result}
					<div class="rounded-lg border bg-muted p-4">
						<p class="text-sm font-medium">Last Action:</p>
						<p class="text-sm text-muted-foreground">{result}</p>
					</div>
				{/if}
			</div>
		{/snippet}

		{@render AlertDialogButtons()}
	</div>
</AlertDialogProvider>


