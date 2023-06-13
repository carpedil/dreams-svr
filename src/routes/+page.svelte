<script lang="ts">
	import type { PageData } from './$types';
	import ChartView from '$lib/components/ChartView.svelte';
	export let data: PageData;
</script>

<div class="overflow-y-auto hide-scrollbar">
	<ChartView data={data.data} />
</div>
