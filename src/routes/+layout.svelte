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
	import { page } from '$app/stores';
	storeHighlightJs.set(hljs);

	export let data: PageData;
</script>
<svelte:head>
    <title>{$page.data.title || "DREAMS Server Api Test bundles"}</title>
</svelte:head>
<AppShell>
	<svelte:fragment slot="header">
		<ol class="card flex flex-row justify-evenly p-5 text-sm">
			<span>{data.title}</span>
			<li><a href="/">Home</a></li>
			{#each data.modules as module}
				<li><a href={module.Uri}>{module.Name.toUpperCase()}</a></li>
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
