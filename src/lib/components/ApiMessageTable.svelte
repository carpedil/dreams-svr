<script lang="ts">
	import type { ApiMessage } from '$lib/scenario';
	import { selectedApiMessageList } from '$lib/stores';
	export let ApiMessagesList: ApiMessage[];

	const handleClick = (apiMessage: ApiMessage): any => {
		selectedApiMessageList.update((list) => {
			if (list.includes(apiMessage)) return list;
			return (list = [...list, apiMessage]);
		});
	};
	const handleDbClick = (seq: number): any => {
		selectedApiMessageList.update((list) => (list = list.filter((el) => el.Seq !== seq)));
	};
</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>#</th>
				<th>ApiName</th>
				<th>HDR</th>
				<th>Platform</th>
				<th>SendParams Count</th>
				<th>ReceivedParams Count</th>
				<th>Operation</th>
			</tr>
		</thead>
		<tbody>
			{#each ApiMessagesList as apiMessage}
				<tr on:click={handleClick(apiMessage)} on:dblclick={handleDbClick(apiMessage.Seq)}>
					<td>
						<span class="badge-icon variant-filled-primary mr-2">{apiMessage.Seq}</span>
					</td>
					<td>
						<span class="text-sm bg-secondary-500 pl-2 pr-2 pt-1 pb-1 rounded-md"
							>/{apiMessage.ApiName}</span
						>
					</td>
					<td>
						<span class="text-sm">{apiMessage.HDR}</span>
					</td>
					<td>
						<span class="text-sm">{apiMessage.Platform.toUpperCase()}</span>
					</td>
					<td class=" text-center">{apiMessage.SendParams.length}</td>
					<td class="text-center">{apiMessage.ReceivedParams.length}</td>
					<td class="text-center"><input class="checkbox" type="checkbox" /></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
