<script lang="ts">
	import HiddenInput from "$lib/bits/utilities/hidden-input.svelte";
	import { useSwitchInput } from "../switch.svelte.js";

	const inputState = useSwitchInput();
</script>

{#if inputState.shouldRender}
	<HiddenInput {...inputState.props} />
{/if}
