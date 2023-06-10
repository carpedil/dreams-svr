<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { ApiMessage as ApiMessageData } from '$lib/scenario';
	import type { ApiMessage as Api } from '@prisma/client';
	import { onMount } from 'svelte';
	import { showable, selectedApiMessageList } from '$lib/stores';
	import ApiMessageTable from '$lib/components/ApiMessageTable.svelte';
	import ApiMessageList from '$lib/components/ApiMessageList.svelte';

	export let data: any;
	let selectedScenarioMessageSet: Api[] = [];
	let _OldApiMessages: ApiMessageData[] = [];
	let _NewApiMessages: ApiMessageData[] = [];

	const handleClick = (scenario: any): any => {
		_OldApiMessages = [];
		_NewApiMessages = [];
		// console.log(scenario);
		selectedScenarioMessageSet = scenario.messages;

		selectedScenarioMessageSet.forEach((message: Api) => {
			if (message.Platform === 'Xp') {
				_OldApiMessages.push(ApiMessageData.into(message));
			} else {
				_NewApiMessages.push(ApiMessageData.into(message));
			}
		});
		console.log(_OldApiMessages, _NewApiMessages);
	};

	const clear = () => {
		selectedApiMessageList.update((list) => (list = []));
	};

	const view = () => {
		const drawerSettings: DrawerSettings = {
			id: 'example-3',
			// Provide your property overrides:
			bgDrawer: 'bg-purple-900 text-white',
			bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
			width: 'w-[100vw]',
			height: 'h-[80vh]',
			padding: 'p-4',
			rounded: 'rounded-sm',
			position: 'bottom',
			meta: $selectedApiMessageList
		};

		drawerStore.open(drawerSettings);
	};

	onMount(() => {
		showable.update((s) => (s = false));
	});
</script>

<div class="card pl-[14vw] h-[93vh] w-auto overflow-y-auto hide-scrollbar">
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>#</th>
					<th>FunctionName</th>
					<th>ScenarioName</th>
					<th>Comment</th>
					<th>Messages</th>
				</tr>
			</thead>
			<tbody>
				{#each data.func.Scenarios as row, i}
					<tr on:click={handleClick(row)}>
						<td>{row.Id}</td>
						<td>{row.FuncName}</td>
						<td>{row.Name}</td>
						<td>{row.Comment}</td>
						<td>{row.messages.length}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">Total Scenarios</th>
					<td>{data.func.Scenarios.length}</td>
				</tr>
			</tfoot>
		</table>
	</div>
	<div class="flex flex-row">
		<div class="flex-1">
			<ApiMessageTable ApiMessagesList={_OldApiMessages} />
		</div>
		<div class="flex-1">
			<ApiMessageTable ApiMessagesList={_NewApiMessages} />
		</div>
	</div>
	{#if $selectedApiMessageList.length !== 0}
		<div class="flex flex-col justify-stretch">
			<div class="flex-1">
				<ApiMessageList _OldApiMessages={$selectedApiMessageList} />
			</div>
			<div class="flex flex-row p-2">
				<input type="button" value="View" class="flex-1 bg-orange-600" on:click={view} />
				<input type="button" value="Clear" class="flex-1 bg-slate-600" on:click={clear} />
			</div>
		</div>
		<Drawer>
			<div class="flex-1">
				<ApiMessageList _OldApiMessages={$drawerStore.meta} />
			</div>
		</Drawer>
	{/if}
</div>
