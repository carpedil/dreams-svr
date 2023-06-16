<script lang="ts">
	import * as echarts from 'echarts/core';
	import {
		TitleComponent,
		TooltipComponent,
		GridComponent,
		type GridComponentOption,
		type TitleComponentOption,
		type TooltipComponentOption
	} from 'echarts/components';
	import { BarChart, PieChart, type BarSeriesOption, type PieSeriesOption } from 'echarts/charts';
	import { LabelLayout } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	import { onMount } from 'svelte';

	export let data: any;

	echarts.use([
		TitleComponent,
		TooltipComponent,
		GridComponent,
		BarChart,
		PieChart,
		CanvasRenderer,
		LabelLayout
	]);

	type EChartsOption = echarts.ComposeOption<
		| TitleComponentOption
		| TooltipComponentOption
		| GridComponentOption
		| BarSeriesOption
		| PieSeriesOption
	>;

	onMount(() => {
		var chartDom = document.getElementById('chartDiv')!;
		var myChart = echarts.init(chartDom);
		var option: EChartsOption;

		const builderJson = {
			all: data.builderJson.all,
			charts: data.builderJson.charts as Record<string, number>,
			components: data.builderJson.componnets as Record<string, number>
		};

		const downloadJson: Record<string, number> = data.downloadJson;

		const themeJson: Record<string, number> = data.themeJson;

		const waterMarkText = 'ZETATECH';

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;
		canvas.width = canvas.height = 100;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.globalAlpha = 0.08;
		ctx.font = '20px Microsoft Yahei';
		ctx.translate(50, 50);
		ctx.rotate(-Math.PI / 4);
		ctx.fillText(waterMarkText, 0, 0);

		option = {
			aria: {
				show: true,
				decal: {
					show: true,
					decals: {
						symbol: 'triangle'
					}
				}
			},
			backgroundColor: {
				type: 'pattern',
				image: canvas,
				repeat: 'repeat'
			},
			tooltip: {},
			title: [
				{
					text: 'ApiMessages',
					subtext: '总计 ' + builderJson.all,
					left: '25%',
					textAlign: 'center',
					textStyle: {
						color: '#4A65BF'
					}
				},
				{
					text: 'By HDRs',
					subtext:
						'总计(已去重) ' +
						Object.keys(downloadJson).reduce(function (all, key) {
							return all + downloadJson[key];
						}, 0),
					left: '75%',
					textAlign: 'center',
					textStyle: {
						color: '#4A65BF'
					}
				},
				{
					text: 'By Functions',
					subtext:
						'总计(已去重) ' +
						Object.keys(themeJson).reduce(function (all, key) {
							return all + themeJson[key];
						}, 0),
					left: '75%',
					top: '50%',
					textAlign: 'center',
					textStyle: {
						color: '#4A65BF'
					}
				}
			],
			grid: [
				{
					top: 50,
					width: '48.3%',
					bottom: '45%',
					height: '20%',
					left: 37,
					containLabel: true
				},
				{
					top: '55%',
					width: '50%',
					bottom: 0,
					left: 10,
					containLabel: true
				}
			],
			xAxis: [
				{
					type: 'value',
					max: builderJson.all,
					splitLine: {
						show: false
					}
				},
				{
					type: 'value',
					max: builderJson.all,
					gridIndex: 1,
					splitLine: {
						show: false
					}
				}
			],
			yAxis: [
				{
					type: 'category',
					data: Object.keys(builderJson.charts),
					axisLabel: {
						interval: 0,
						rotate: 30,
						color: 'gray'
					},
					splitLine: {
						show: false
					}
				},
				{
					gridIndex: 1,
					type: 'category',
					data: Object.keys(builderJson.components),
					axisLabel: {
						interval: 0,
						rotate: 30,
						color: 'gray'
					},
					splitLine: {
						show: false
					}
				}
			],
			series: [
				{
					type: 'bar',
					stack: 'chart',
					z: 3,
					label: {
						position: 'right',
						show: true
					},
					data: Object.keys(builderJson.charts).map(function (key) {
						return builderJson.charts[key];
					})
				},
				{
					type: 'bar',
					stack: 'chart',
					silent: true,
					itemStyle: {
						color: 'lightgray'
					},
					data: Object.keys(builderJson.charts).map(function (key) {
						return builderJson.all - builderJson.charts[key];
					})
				},
				{
					type: 'bar',
					stack: 'component',
					xAxisIndex: 1,
					yAxisIndex: 1,
					z: 3,
					label: {
						position: 'right',
						show: true
					},
					data: Object.keys(builderJson.components).map(function (key) {
						return builderJson.components[key];
					})
				},
				{
					type: 'bar',
					stack: 'component',
					silent: true,
					xAxisIndex: 1,
					yAxisIndex: 1,
					itemStyle: {
						color: 'lightgray'
					},
					data: Object.keys(builderJson.components).map(function (key) {
						return builderJson.all - builderJson.components[key];
					})
				},
				{
					type: 'pie',
					radius: [0, '30%'],
					center: ['75%', '25%'],
					data: Object.keys(downloadJson).map(function (key) {
						return {
							name: key,
							value: downloadJson[key]
						};
					}),
					label: {
						color: 'gray',
						alignTo: 'labelLine',
						formatter: '{name|{b}}\n{count|{c}}',
						minMargin: 10,
						edgeDistance: 8,
						lineHeight: 15,
						rich: {
							count: {
								fontSize: 10,
								color: '#999'
							}
						}
					}
				},
				{
					type: 'pie',
					radius: [0, '30%'],
					center: ['75%', '75%'],
					data: Object.keys(themeJson).map(function (key) {
						return {
							name: key,
							value: themeJson[key]
						};
					}),
					label: {
						color: 'gray',
						alignTo: 'labelLine',
						formatter: '{name|{b}}\n{count|{c}}',
						minMargin: 10,
						edgeDistance: 5,
						lineHeight: 15,
						rich: {
							count: {
								fontSize: 10,
								color: '#999'
							}
						}
					}
				}
			]
		};

		option && myChart.setOption(option);
	});
</script>

<div class="card">
	<div id="chartDiv" class="h-[96vh] w-full" />
</div>
