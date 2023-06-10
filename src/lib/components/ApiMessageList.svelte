<script lang="ts">
	import type { ApiMessage } from '$lib/scenario';
	import { Accordion } from '@skeletonlabs/skeleton';
	import ApiMessageListItem from './ApiMessageListItem.svelte';
	export let height: string = '350px';
	export let _OldApiMessages: ApiMessage[] = [];
	export let _NewApiMessages: ApiMessage[] = [];
</script>

<div class="card flex flex-row justify-evenly h-[{height}] overflow-y-scroll">
	{#if _OldApiMessages.length != 0}
		<div class="flex-1">
			<Accordion>
				{#each _OldApiMessages as msg}
					<ApiMessageListItem {msg} />
				{/each}
			</Accordion>
		</div>
	{/if}
	{#if _NewApiMessages.length != 0}
		<div class="flex-1">
			<Accordion>
				{#each _NewApiMessages as msg}
					<ApiMessageListItem {msg} />
				{/each}
			</Accordion>
		</div>
	{/if}
</div>
