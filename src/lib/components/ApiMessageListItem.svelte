<script lang="ts">
	import type { ApiMessage } from '$lib/scenario';
	import { AccordionItem, CodeBlock } from '@skeletonlabs/skeleton';
	import ParameterList from './ParameterList.svelte';
	export let msg: ApiMessage;
</script>

<AccordionItem hover="hover:bg-primary-hover-token ">
	<svelte:fragment slot="lead">
		<div class="flex flex-row items-center">
			<span class="badge-icon variant-filled-secondary mr-2">{msg.Seq}</span>
			<span class="text-sm bg-blue-500 p-1.5 rounded-md">/{msg.ApiName}</span>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="summary"
		><span class="text-sm">{msg.HDR} | {msg.Platform.toUpperCase()}</span></svelte:fragment
	>
	<svelte:fragment slot="content">
		<CodeBlock
			language="console"
			code={msg.Sendto}
			color="text-blue-400"
			text="text-xl"
			background="bg-slate-600"
		/>
		<CodeBlock
			language="console"
			code={msg.Received}
			color="text-blue-400"
			text="text-xl"
			background="bg-slate-600"
		/>
		<input
			class="input rounded-none"
			type="text"
			bind:value={msg.Comment}
			placeholder="Leave a comment if needed."
		/>
		<div class="flex flex-row pl-10 w-100% max-h-[30vh]">
			<ParameterList params={msg.SendParams} />
			<ParameterList params={msg.ReceivedParams} />
		</div>
	</svelte:fragment>
</AccordionItem>
