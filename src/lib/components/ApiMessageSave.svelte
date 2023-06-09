<script lang="ts">
	import {
		TabGroup,
		Tab,
		Modal,
		modalStore,
		type ModalSettings,
		Toast,
		toastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import { ApiMessage, ScenarioData } from '$lib/scenario';
	import ApiMessageList from '$lib/components/ApiMessageList.svelte';
	import type { Functions } from '@prisma/client';
	export let functions: Functions[];
	export let moduleId: string;

	let tabSet: string = '';
	let output: string = '';

	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Validation Alert',
		backdropClasses: '!bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		modalClasses: '!bg-purple-700 text-whit text-2xl rounded-none',
		body: `
		Scenario Name,Function Name and FuncId can not be null;
	`
	};

	let scenario = new ScenarioData();

	const handleFunctionSelect: (e: any) => void = (evt) => {
		let data: string = evt.target.dataset.name;
		let id: number = evt.target.dataset.id;

		if (data !== undefined) scenario.FuncName = data;
		if (id !== undefined) scenario.FuncId = id;
	};

	const handleOldMessageChange: (e: any) => void = (evt) => {
		if (scenario.funcNameAndIdValidation()) {
			modalStore.trigger(modal);
			evt.target.value = '';
			return;
		}
		scenario.OldRawLogs = evt.target.value;
		let oldmessages = scenario.extractMessages(scenario.OldRawLogs);
		scenario.set_old_api_message(oldmessages);
		console.log('old:\n', scenario.OldApiMessages);
	};
	const handleNewMessageChange: (e: any) => void = (evt) => {
		if (scenario.funcNameAndIdValidation()) {
			modalStore.trigger(modal);
			evt.target.value = '';
			return;
		}
		scenario.NewRawLogs = evt.target.value;
		let newmessages = scenario.extractMessages(scenario.NewRawLogs);
		scenario.set_new_api_message(newmessages);
		console.log('new:\n', scenario.NewApiMessages);
	};

	const save = async () => {
		if (scenario.scenarioNameAndIdValidation()) {
			modalStore.trigger(modal);
			return;
		}
		// clear output messages firstly
		output = '';
		let resp = await fetch(`/${moduleId}/save/${scenario.Name}`, {
			method: 'GET'
		});
		const isExisted = await resp.json();
		if (isExisted) {
			const t: ToastSettings = {
				message: 'Current Scenario is Already Saved in DB !',
				// Provide any utility or variant background style:
				background: 'variant-filled-warning'
			};
			toastStore.trigger(t);
			return;
		}
		// console.log(scenario);
		let response = await fetch(`/${moduleId}/save`, {
			method: 'POST',
			body: JSON.stringify(scenario)
		});

		const res = await response.json();
		output += `${res.message} \n`;
		scenario.OldApiMessages.forEach((message: ApiMessage) => {
			message.ScenarioId = res.Id;
		});
		scenario.NewApiMessages.forEach((message: ApiMessage) => {
			message.ScenarioId = res.Id;
		});

		let mergedApiMessageList = [...scenario.OldApiMessages, ...scenario.NewApiMessages];
		// console.log(mergedApiMessageList);
		mergedApiMessageList.forEach(async (message: ApiMessage) => {
			console.log(message);
			let response = await fetch(`/${moduleId}/save/message`, {
				method: 'POST',
				body: JSON.stringify(message)
			});
			const res = await response.json();
			output += `${res.message} \n`;
			// console.log(res.message);
		});
	};

	const reset = () => {
		const { FuncName, FuncId } = scenario;
		scenario = new ScenarioData();
		scenario.FuncName = FuncName;
		scenario.FuncId = FuncId;
	};
</script>

<div class="flex justify-start pl-[14vw] h-[96vh] w-auto overflow-y-auto hide-scrollbar">
	<TabGroup
		justify="justify-start"
		active="variant-filled-secondary"
		class="bg-surface-200-800-token m-1 w-screen"
		on:click={handleFunctionSelect}
	>
		{#each functions as func}
			<Tab
				bind:group={tabSet}
				name={func.Name}
				value={func.Name}
				data-name={func.Name}
				data-id={func.Id}>{func.Name}</Tab
			>
		{/each}
		<svelte:fragment slot="panel">
			<div class="flex flex-row items-center">
				<textarea
					class="input rounded-none hide-scrollbar text-sm"
					rows="4"
					value={scenario.OldRawLogs ? scenario.OldRawLogs : ''}
					placeholder="Enter the log information about using the old server. eg.>>> 10.9.64.28"
					on:change={handleOldMessageChange}
				/>
				<textarea
					class="input rounded-none hide-scrollbar text-sm"
					rows="4"
					value={scenario.NewRawLogs ? scenario.NewRawLogs : ''}
					placeholder="Enter the log information about using the new server. eg.>>> 10.162.138.83"
					on:change={handleNewMessageChange}
				/>
				<div class="flex flex-row h-[6vh]">
					<button class="btn-sm variant-filled-secondary rounded-md w-[8vw]" on:click={save}
						>Save</button
					>
					<button class="btn-sm variant-filled-surface rounded-md w-[8vw]" on:click={reset}
						>Reset</button
					>
				</div>
			</div>
			<label class="label flex flex-row items-center">
				<input
					class="input rounded-none"
					type="text"
					bind:value={scenario.Name}
					placeholder="Enter the scenario In which the current log file operation is generated, such as opening the Job In function interface and clicking the drop-down list."
				/>
			</label>
			<div class="h-[55vh] overflow-y-auto hide-scrollbar">
				<ApiMessageList
					_OldApiMessages={scenario.OldApiMessages}
					_NewApiMessages={scenario.NewApiMessages}
				/>
			</div>
			<label class="label flex-1 items-center">
				<input
					class="input rounded-none"
					type="text"
					data-clipboard="exampleInput"
					bind:value={scenario.Comment}
					placeholder="Comment"
				/>
			</label>
			<Modal />

			<label class="label">
				<textarea
					class="textarea rounded-none"
					rows="18"
					placeholder=">>> {scenario.FuncName ? `${scenario.FuncName}` : ''}"
					bind:value={output}
				/>
			</label>
			<Toast position="t" rounded="rounded-md" />
		</svelte:fragment>
	</TabGroup>
</div>
