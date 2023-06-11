<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';
	export let message: string;
	export let color: string;
</script>

<CodeBlock language="console" code={message} {color} text="text-xl" />
