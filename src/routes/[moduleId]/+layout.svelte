<script lang="ts">
	import {
		AppShell,
		TabGroup,
		Tab,
		Modal,
		modalStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { ApiMessage, ScenarioData } from '$lib/scenario';
	import ApiMessageList from '$lib/components/ApiMessageList.svelte';
	export let data: PageData;

	let tabSet: string = '';
	let output: string = '';

	const modal: ModalSettings = {
		type: 'alert',
		// Data
		title: 'Validation Alert',
		backdropClasses: '!bg-slate-300',
		modalClasses: '!bg-red-400',
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
		// console.log('old:\n',scenario.OldApiMessages);
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
		// console.log('new:\n',scenario.NewApiMessages);
	};

	const save = async () => {
		if (scenario.scenarioNameAndIdValidation()) {
			modalStore.trigger(modal);
			return;
		}
		// console.log(scenario);
		let response = await fetch(`/${data.moduleId}/save`, {
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
			let response = await fetch(`/${data.moduleId}/save/message`, {
				method: 'POST',
				body: JSON.stringify(message)
			});
			const res = await response.json();
			output += `${res.message} \n`;
			// console.log(res.message);
		});
	};

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div
			id="sidebar-left"
			class="card list-nav h-[92.5vh] w-[15vw] p-5 text-2xl hidden lg:block rounded-none"
		>
			<ul>
				{#each data.functions as func}
					<li>
						<a href={func.Uri} class={classesActive(func.Uri)}>{func.Name}</a>
					</li>
				{/each}
			</ul>
		</div>
	</svelte:fragment>
	<div class=" flex justify-start">
		<TabGroup
			justify="justify-start"
			active="variant-filled-secondary"
			class="bg-surface-200-800-token m-1 w-screen"
			on:click={handleFunctionSelect}
		>
			{#each data.functions as func}
				<Tab
					bind:group={tabSet}
					name={func.Name}
					value={func.Name}
					data-name={func.Name}
					data-id={func.Id}>{func.Name}</Tab
				>
			{/each}
			<svelte:fragment slot="panel">
				<label class="label flex flex-row items-center">
					<input
						class="input rounded-none"
						type="text"
						placeholder="Enter the log information about using the old server. eg.>>> 10.9.64.28"
						on:change={handleOldMessageChange}
					/>
				</label>
				<label class="label flex flex-row items-center">
					<input
						class="input rounded-none"
						type="text"
						placeholder="Enter the log information about using the new server. eg.>>> 10.9.64.83"
						on:change={handleNewMessageChange}
					/>
				</label>
				<label class="label flex flex-row items-center">
					<input
						class="input rounded-none"
						type="text"
						bind:value={scenario.Name}
						placeholder="Enter the scenario In which the current log file operation is generated, such as opening the Job In function interface and clicking the drop-down list."
					/>
				</label>
				<ApiMessageList
					_OldApiMessages={scenario.OldApiMessages}
					_NewApiMessages={scenario.NewApiMessages}
				/>
				<label class="label flex flex-row items-center">
					<input
						class="input rounded-none"
						type="text"
						data-clipboard="exampleInput"
						bind:value={scenario.Comment}
						placeholder="Comment"
					/>
				</label>
				<Modal />
				<button class="btn variant-filled-secondary rounded-none w-full" on:click={save}
					>Save</button
				>
				<label class="label">
					<span>Output:</span>
					<textarea class="textarea rounded-none" rows="19" placeholder=">>>" bind:value={output} />
				</label>
			</svelte:fragment>
		</TabGroup>
	</div>
	<slot />
</AppShell>
