<script lang="ts">
	import type { ApiMessage } from '$lib/scenario';
	import { AccordionItem, CodeBlock } from '@skeletonlabs/skeleton';
	export let msg: ApiMessage;
	export let index: number;
</script>

<AccordionItem hover="hover:bg-primary-hover-token">
	<svelte:fragment slot="lead">
		<div class="flex flex-row items-center">
			<span class="badge-icon variant-filled-secondary mr-2">{index + 1}</span>
			<h3 class="h3 bg-green-500 pr-2 pl-2">/{msg.ApiName}</h3>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="summary"><h3 class="h3">{msg.HDR}</h3></svelte:fragment>
	<svelte:fragment slot="content">
		<CodeBlock language="console" lineNumbers code={msg.Sendto} />
		<CodeBlock language="console" lineNumbers code={msg.Received} />
		<input
			class="input rounded-none"
			type="text"
			bind:value={msg.Comment}
			placeholder="Leave a comment if needed."
		/>
	</svelte:fragment>
</AccordionItem>
