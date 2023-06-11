<script lang="ts">
	export let params: string[] = [];
</script>

<div class="flex-1 list-decimal">
	<h3 class="h3">Items:{params.length}</h3>
	{#each params as param}
		<li>{param}</li>
	{/each}
</div>
