<script lang="ts">
	import type { ApiMessage } from '$lib/scenario';
	import { selectedApiMessageList } from '$lib/stores';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton/dist/utilities/Toast/types';
	export let ApiMessagesList: ApiMessage[];

	const handleClick = (apiMessage: ApiMessage): any => {
		if ($selectedApiMessageList.length >= 2) {
			const t: ToastSettings = {
				message: 'Exceeded the maximum size of The Compare List, Max: 2 ApiMessages ',
				// Provide any utility or variant background style:
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
			return;
		}

		selectedApiMessageList.update((list) => {
			if (list.includes(apiMessage)) {
				const t: ToastSettings = {
					message: 'ApiMessage Duplicated !',
					// Provide any utility or variant background style:
					background: 'variant-filled-warning'
				};
				toastStore.trigger(t);
				return list;
			}
			return (list = [...list, apiMessage]);
		});
	};
	const handleDbClick = (seq: number): any => {
		selectedApiMessageList.update((list) => (list = list.filter((el) => el.Seq !== seq)));
	};
</script>

<div class="table-container">
	<table class="table table-hover table-interactive">
		<thead>
			<tr>
				<th>#</th>
				<th>ApiName</th>
				<th>HDR</th>
				<th>Platform</th>
				<th>SendParams Count</th>
				<th>ReceivedParams Count</th>
			</tr>
		</thead>
		<tbody>
			{#each ApiMessagesList as apiMessage}
				<tr on:click={handleClick(apiMessage)} on:dblclick={handleDbClick(apiMessage.Seq)}>
					<td>
						<span class="badge-icon variant-filled-primary mr-2">{apiMessage.Seq}</span>
					</td>
					<td>
						<span class="text-sm bg-secondary-500 text-white pl-2 pr-2 pt-1 pb-1 rounded-md"
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
				</tr>
			{/each}
		</tbody>
	</table>
	<Toast position="t" rounded="rounded-md" />
</div>
