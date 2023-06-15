<script lang="ts">
	import ParameterList from './ParameterList.svelte';
	import type { ApiMessage } from '$lib/scenario';
	export let meta0: ApiMessage;
	export let meta1: ApiMessage;
</script>

<div class="card flex flex-row w-100% justify-start h-[40vh]">
	<div class="flex-1 p-5 variant-filled-secondary overflow-y-auto hide-scrollbar">
		<ParameterList params={meta0.SendParams} />
		<hr class="!border-t-4" />
		<ParameterList params={meta0.ReceivedParams} />
	</div>
	<div class="flex-1 p-5 variant-filled-surface overflow-y-auto hide-scrollbar">
		<ParameterList params={meta1.SendParams} />
		<hr class="!border-t-4" />
		<ParameterList params={meta1.ReceivedParams} />
	</div>
</div>
