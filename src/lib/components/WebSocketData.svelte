<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import {URLS} from '../consts';
    import BaseWrapperComponent from './BaseWrapperComponent.svelte';

	export let config;

	// component configs
	let url = config.url || URLS.WEBSOCKET;
	let DEFAULT_NAME = 'WebSocket Data Stream';

	let data = [];
	let filteredData = [];
	let isExpanded = false;
	let filter = '';
	const filterRegex = /^\[[^\]]+\] \[([^\]]+)\]/;

	onMount(() => {
		const ws = new WebSocket(url);

		ws.onopen = () => {
			console.log('WebSocket connected');
		};

		ws.onmessage = (message) => {
			const match = message?.data?.match(filterRegex);
			const newItem = { text: message.data, expanded: isExpanded, type: match?.[1] };
			data = [newItem, ...data];

			applyFilter();
		};

		ws.onclose = () => {
			console.log('WebSocket disconnected');
		};

		return () => {
			ws.close();
		};
	});

	function toggleExpand(index) {
		filteredData = filteredData.map((item, i) =>
			i === index ? { ...item, expanded: !item.expanded } : item
		);
	}

	function toggleExpandAll() {
		isExpanded = !isExpanded;
		filteredData = filteredData.map((item) => ({ ...item, expanded: isExpanded }));
	}

	function applyFilter() {
		if (filter) {
			filteredData = data.filter((item) => {
				return item.type === filter;
			});
		} else {
			filteredData = [...data];
		}
	}

	function setFilter(newFilter) {
		filter = newFilter;
		applyFilter();
	}
</script>

<BaseWrapperComponent {config} name={DEFAULT_NAME}>
	<div class="btn-group variant-filled mb-2">
		<button class="expand-button" on:click={toggleExpandAll}
		>{isExpanded ? 'Collapse All' : 'Expand All'}</button
		>
		<button on:click={() => setFilter('')}>All</button>
		<button class:selected={filter === '[INFO]'} on:click={() => setFilter('INFO')}>INFO</button
			>
			<button class:selected={filter === '[ERROR]'} on:click={() => setFilter('ERROR')}
				>ERROR</button
				>
				<button class:selected={filter === '[WARNING]'} on:click={() => setFilter('WARNING')}
					>WARNING</button
					>
				</div>
				{#if filteredData.length > 0}
			<ul class="overflow-auto h-full">
				{#each filteredData as { text, expanded, type }, index}
					<li class={type?.toLowerCase()}>
						<div class="flex" on:click={() => toggleExpand(index)}>
							{#if text.length > 150}
								<span class="arrow">{expanded ? '▼' : '▶'}</span>
							{/if}
							<span class="text">
								{#if expanded}
									<div class="expanded">{text}</div>
								{:else}
									{text.slice(0, 150)}{text.length > 150 ? '...' : ''}
								{/if}
							</span>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No data available</p>
		{/if}
</BaseWrapperComponent>

<style>
	.info {
		background: #00ff4017;
	}
	.error {
		background: #6a121b72;
	}
	.warning {
		background: #b66f2c23;
	}
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	li {
		margin-bottom: 10px;
		padding: 10px;
		border-radius: 5px;
		color: #00ff41;
		font-family: 'Courier New', monospace;
		font-size: 14px;
		transition: background 0.3s;
		background: rgba(84, 81, 84, 0.138);
		cursor: pointer;
	}

	li:hover {
		background: rgba(0, 255, 65, 0.2);
	}

	.arrow {
		margin-right: 10px;
		color: #30e9ff;
		font-size: 14px;
	}

	.text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: break-word;
	}

	li.expanded .text {
		white-space: normal;
	}

	p {
		text-align: center;
		color: #ff0000;
		font-size: 18px;
		font-family: 'Courier New', monospace;
	}

	.expanded {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		max-width: 90%;
		text-wrap: balance;
	}

	.btn-group {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		background: #1d2425;
		color: white;
	}

	.btn-group button {
		margin: 0 5px;
		padding: 10px 20px;
		color: #0a0a0a;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-family: 'Courier New', monospace;
		font-size: 12px;
		transition: background-color 0.3s;
	}

	.btn-group button:hover {
		background-color: #00ff41;
		color: #0a0a0a;
	}

	.btn-group button.selected {
		background-color: #00ff41;
		color: #0a0a0a;
	}

	.expand-button {
		display: block;
		margin: 0 auto 20px;
		padding: 10px 20px;
		color: #0a0a0a;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-family: 'Courier New', monospace;
		font-size: 16px;
		transition: background-color 0.3s;
	}

	.expand-button:hover {
		background-color: #00ff41;
		color: #0a0a0a;
	}
</style>
