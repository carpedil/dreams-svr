<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { AppShell, LightSwitch, storeHighlightJs } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	import hljs from 'highlight.js';
	storeHighlightJs.set(hljs);

	export let data: PageData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<ol class="flex flex-row justify-evenly p-10 text-2xl bg-blue-500">
			<span>{data.title}</span>
			<li><a href="/">Home</a></li>
			{#each data.modules as module}
				<li><a href={module.Uri}>{module.Name}</a></li>
			{/each}
			<LightSwitch />
		</ol>
	</svelte:fragment>
	<div class="flex flex-row">
		<div class="min-w-[100%]">
			<slot />
		</div>
	</div>
</AppShell>
