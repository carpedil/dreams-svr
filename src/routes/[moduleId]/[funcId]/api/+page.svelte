<script lang="ts">
	import ApiMessageList from '$lib/components/ApiMessageList.svelte';
	import { ApiMessage as ApiMessageData } from '$lib/scenario';
	import type { ApiMessage as Api } from '@prisma/client';

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
</script>

<div class="card pl-[14vw]">
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
	<ApiMessageList {_OldApiMessages} {_NewApiMessages} viewHeight={65} />
</div>
