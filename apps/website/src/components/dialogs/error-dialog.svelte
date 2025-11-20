<script lang="ts">
	import Dialog, { type DialogMode } from "./dialog.svelte";
	import { t } from "svelte-i18n";

	interface Props {
		mode: DialogMode;
		error?: string;
	}

	let { mode = $bindable("hidden"), error = "An error occured" }: Props = $props();

	if(error.includes("LOGIN_REQUIRED"))
	{
		error = "Sandbox users can only view this website, not interact with it. Please visit official 7tv.app website";
	}
</script>

{#if !error.includes("LACKING_PRIVILEGES")}
<Dialog width={30} bind:mode>
	<div class="layout">
		<h1>{$t("dialogs.error.title")}</h1>
		<hr />
		<p>{error}</p>
	</div>
</Dialog>
{/if}

<style lang="scss">
	.layout {
		padding: 1rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;

		color: lime;
		font-weight: bold;
	}

	h1 {
		font-size: 1rem;
		font-weight: 600;
	}
</style>
