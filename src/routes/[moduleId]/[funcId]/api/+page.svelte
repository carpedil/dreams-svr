<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton';
</script>

<div class="card card-hover h-full p-5">
	<label class="label flex flex-row items-center">
		<button class="rounded-none" use:clipboard={{ input: 'exampleInput' }}>Copy</button>
		<input
			class="input rounded-none"
			type="text"
			data-clipboard="exampleInput"
			value=""
			placeholder="Message 1"
		/>
	</label>

	<label class="label">
		<input class="input rounded-none" type="text" placeholder="Message 2" />
	</label>

	<label class="label">
		<span>Select</span>
		<select class="select rounded-none">
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
	</label>
</div>
