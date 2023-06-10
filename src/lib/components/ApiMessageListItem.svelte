<script lang="ts">
	import type { ApiMessage } from '$lib/scenario';
	import { AccordionItem, CodeBlock } from '@skeletonlabs/skeleton';
	export let msg: ApiMessage;
</script>

<AccordionItem hover="hover:bg-primary-hover-token ">
	<svelte:fragment slot="lead">
		<div class="flex flex-row items-center">
			<span class="badge-icon variant-filled-secondary mr-2">{msg.Seq}</span>
			<span class="text-sm bg-green-500 pr-2 pl-2">/{msg.ApiName}</span>
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
			background="bg-slate-600"
		/>
		<CodeBlock
			language="console"
			code={msg.Received}
			color="text-blue-400"
			background="bg-slate-600"
		/>
		<input
			class="input rounded-none"
			type="text"
			bind:value={msg.Comment}
			placeholder="Leave a comment if needed."
		/>
		<div class="flex flex-row pl-10 w-100% max-h-[400px]">
			<div class="flex-1 list-decimal w-[50%]">
				<h3 class="h3">Items:{msg.SendParams.length}</h3>
				{#each msg.SendParams as param}
					<li>{param}</li>
				{/each}
			</div>
			<div class="flex-1 list-decimal w-[50%] break-all overflow-y-auto">
				<h3 class="h3">Items:{msg.ReceivedParams.length}</h3>
				{#each msg.ReceivedParams as param}
					<li>{param}</li>
				{/each}
			</div>
		</div>
	</svelte:fragment>
</AccordionItem>
