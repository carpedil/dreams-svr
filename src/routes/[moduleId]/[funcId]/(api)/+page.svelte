<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		Drawer,
		Toast,
		drawerStore,
		toastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { ApiMessage as ApiMessageData } from '$lib/scenario';
	import type { ApiMessage as Api } from '@prisma/client';
	import { onMount } from 'svelte';
	import { showable, selectedApiMessageList } from '$lib/stores';
	import ApiMessageTable from '$lib/components/ApiMessageTable.svelte';
	import ApiMessageList from '$lib/components/ApiMessageList.svelte';
	import ParameterBlockTwins from '$lib/components/ParameterBlockTwins.svelte';
	import MessageWarpper from '$lib/components/MessageWarpper.svelte';

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
		if ($selectedApiMessageList.length < 2) {
			const t: ToastSettings = {
				message: 'At least 2 ApiMessage can be compared ,try to select one more ApiMessage ! ',
				// Provide any utility or variant background style:
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
			return;
		}

		const drawerSettings: DrawerSettings = {
			id: 'example-3',
			// Provide your property overrides:
			bgDrawer: 'bg-purple-900 text-white',
			bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
			width: 'w-[100vw]',
			height: 'h-[95vh] overflow-y-auto hide-scrollbar',
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

<div class="card pl-[14vw] h-[96vh] w-auto overflow-y-auto hide-scrollbar">
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
						<td>{row.No}</td>
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
				<input type="button" value="Compare" class="flex-1 bg-orange-600" on:click={view} />
				<input type="button" value="Clear" class="flex-1 bg-slate-600" on:click={clear} />
			</div>
		</div>
		<Drawer>
			<Accordion>
				<AccordionItem hover="hover:bg-primary-hover-token" open class="text-2xl">
					<svelte:fragment slot="lead">
						<span class="bg-green-500 h1 pr-2 pl-2 rounded-lg">/{$drawerStore.meta[0].ApiName}</span
						>
					</svelte:fragment>
					<svelte:fragment slot="summary">
						<h1 class="h1">HDR={$drawerStore.meta[0].HDR}</h1>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<MessageWarpper
							message={$drawerStore.meta[0].Sendto}
							color={'variant-filled-secondary'}
						/>
						<MessageWarpper
							message={$drawerStore.meta[0].Received}
							color={'variant-filled-secondary'}
						/>

						<MessageWarpper
							message={$drawerStore.meta[1].Sendto}
							color={'variant-filled-surface'}
						/>
						<MessageWarpper
							message={$drawerStore.meta[1].Received}
							color={'variant-filled-surface'}
						/>
						<ParameterBlockTwins meta0={$drawerStore.meta[0]} meta1={$drawerStore.meta[1]} />
						<blockquote class="blockquote h2">
							*注意⚠️: 参数列表解析可能存在一定偏差,请仔细对比发送和接受的消息原文 <button
								class="btn variant-filled-secondary rounded-xl float-right pl-10 pr-1"
								on:click={() => {
									drawerStore.close();
								}}>CLOSE(ESC)</button
							>
						</blockquote>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</Drawer>
		<Toast position="t" rounded="rounded-md" />
	{/if}
</div>
