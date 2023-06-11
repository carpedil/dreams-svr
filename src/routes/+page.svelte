<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	export let data: PageData;

</script>

<div class="card  p-1 overflow-y-auto hide-scrollbar">
	<CodeBlock
		language="json"
		code={JSON.stringify(data.data, null, 4)}
		text="text-2xl"
		class="w-full h-[96vh] bg-transparent"
		color=""
	/>
</div>
