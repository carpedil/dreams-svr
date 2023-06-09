<script lang="ts">
	import type { ApiMessage } from '$lib/scenario';
	import { Accordion } from '@skeletonlabs/skeleton';
	import ApiMessageListItem from './ApiMessageListItem.svelte';

	export let _OldApiMessages: ApiMessage[];
	export let _NewApiMessages: ApiMessage[];
	export let viewHeight: number = 45;
</script>

<div class="card flex flex-row justify-evenly h-[{viewHeight}vh] overflow-y-scroll">
	{#if _OldApiMessages.length != 0}
		<div class="flex-1">
			<Accordion>
				{#each _OldApiMessages as msg, index}
					<ApiMessageListItem {msg} {index} />
				{/each}
			</Accordion>
		</div>
	{/if}
	{#if _NewApiMessages.length != 0}
		<div class="flex-1">
			<Accordion>
				{#each _NewApiMessages as msg, index}
					<ApiMessageListItem {msg} {index} />
				{/each}
			</Accordion>
		</div>
	{/if}
</div>
