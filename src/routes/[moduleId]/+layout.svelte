<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { showable } from '$lib/stores';
	import ApiMessageSave from '$lib/components/ApiMessageSave.svelte';
	export let data: PageData;

	const updateStore = () => {
		showable.update((s) => (s = true));
	};

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div
			id="sidebar-left"
			class="card list-nav h-[96vh] w-[14vw] p-5 text-sm rounded-none fixed z-10 overflow-y-auto hide-scrollbar"
		>
			<ul>
				<li class=" variant-filled-secondary rounded-md text-white hover:variant-ghost-surface">
					<a href={`/${data.moduleId}`} on:click={updateStore}><span>New Recored</span> </a>
				</li>
				{#each data.functions as func}
					<li>
						<a href={func.Uri} class={classesActive(func.Uri)}>{func.Name}</a>
					</li>
				{/each}
			</ul>
		</div>
	</svelte:fragment>
	<slot />
	{#if $showable}
		<ApiMessageSave functions={data.functions} moduleId={data.moduleId} />
	{/if}
</AppShell>
