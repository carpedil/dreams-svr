<script lang="ts">
	import {
		AppShell,
		TabGroup,
		Tab,
		Accordion,
		AccordionItem,
		Modal,
		modalStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { ScenarioData } from '$lib/scenario';
	let tabSet: string = '';

	export let data: PageData;

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

	const handleOldMessageChange = () => {
		// console.log(scenarioObj);
		let oldmessages = scenario.extractMessages(scenario.OldRawLogs);
		scenario.set_old_api_message(oldmessages);
		console.log(scenario);
	};
	const handleNewMessageChange = () => {
		// console.log(scenarioObj);
		let newmessages = scenario.extractMessages(scenario.NewRawLogs);
		scenario.set_new_api_message(newmessages);
		console.log(scenario);
	};

	const save = () => {
		if (scenario.IsInValid()) {
			modalStore.trigger(modal);
			return;
		}
		console.log(scenario);
	};

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
	$: _OldApiMessages = scenario.OldApiMessages;
	$: _NewApiMessages = scenario.NewApiMessages;
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
						bind:value={scenario.OldRawLogs}
						placeholder="Enter the log information about using the old server. eg.>>> 10.9.64.28"
						on:change={handleOldMessageChange}
					/>
				</label>
				<label class="label flex flex-row items-center">
					<input
						class="input rounded-none"
						type="text"
						bind:value={scenario.NewRawLogs}
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
				<div class="card flex flex-row justify-evenly h-[45vh]">
					{#if _OldApiMessages.length != 0}
						<div class="flex-1">
							<Accordion>
								{#each _OldApiMessages as msg, index}
									<AccordionItem hover="hover:bg-primary-hover-token">
										<svelte:fragment slot="lead">
											<div class="flex flex-row items-center">
												<span class="badge-icon variant-filled-secondary mr-2">{index + 1}</span>
												<h3 class="h3">{msg.ApiName}</h3>
											</div>
										</svelte:fragment>
										<svelte:fragment slot="summary"><h3 class="h3">{msg.HDR}</h3></svelte:fragment>
										<svelte:fragment slot="content">
											<h4 class="h4">{msg.Sendto}</h4>
											<h5 class="h5">{msg.Received}</h5>
										</svelte:fragment>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					{/if}
					{#if _NewApiMessages.length != 0}
						<div class="flex-1">
							<Accordion>
								{#each _NewApiMessages as msg, index}
									<AccordionItem hover="hover:bg-primary-hover-token">
										<svelte:fragment slot="lead">
											<div class="flex flex-row items-center">
												<span class="badge-icon variant-filled-secondary mr-2">{index + 1}</span>
												<h3 class="h3">{msg.ApiName}</h3>
											</div>
										</svelte:fragment>
										<svelte:fragment slot="summary"><h3 class="h3">{msg.HDR}</h3></svelte:fragment>
										<svelte:fragment slot="content">
											<p>{msg.Sendto}</p>
											<p>{msg.Received}</p>
										</svelte:fragment>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					{/if}
				</div>
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

				<div>
					data : <span>{JSON.stringify(scenario, null, 6)} </span>
				</div>
			</svelte:fragment>
		</TabGroup>
	</div>
	<slot />
</AppShell>
