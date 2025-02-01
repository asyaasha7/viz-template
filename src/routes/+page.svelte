<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { popup } from '@skeletonlabs/skeleton';
	import { defaultEvmStores } from 'ethers-svelte';

	import { layoutConfig } from '../lib/config/layoutConfig';
	import {URLS} from '../lib/consts';

	//  components
	import ListInfoKeyValue from '../lib/components/ListInfoKeyValue.svelte';
	import WalletConnectEther from '../lib/components/WalletConnectEther.svelte';
	import TableTabs from '../lib/modules/TableTabs.svelte';
	import TableComponent from '../lib/components/TableComponent.svelte';
	import FormComponent from '../lib/components/FormComponent.svelte';
	import BestPrice from '../lib/components/BestPrice.svelte';
	import PingAgent from '../lib/components/PingAgent.svelte';
	import WebSocketData from '../lib/components/WebSocketData.svelte';
	import GrafanaDashboard from '../lib/components/GrafanaDashboard.svelte';

	// Map component names to Svelte components
	const componentsMap = {
		ListInfoKeyValue,
		FormComponent,
		BestPrice,
		TableComponent,
		PingAgent,
		GrafanaDashboard,
		// WalletConnectEther,
		TableTabs,
		WebSocketData
	};

	// Utility function to generate unique IDs
	const id = () => Math.random().toString(36).substr(2, 9);

	// State variables
	let items = [];
	let adjustAfterRemove = false;
	let loading = true;

	// Fetch layout from API
	async function fetchLayout() {
		let currentLayout = layoutConfig; // set default fallback layout
		try {
			const response = await fetch(URLS.LAYOUT);
			console.log('response', response);
			if (!response.ok) {
				console.error('Failed to fetch layout configuration. Fall back to default');
			} else {
				currentLayout = await response.json();
			}
		} catch (error) {
			console.error('Error fetching custom layout configuration:', error);
		}

		items = currentLayout?.data?.map((item) => ({
			6: {...gridHelp.item({
				...item.coordinates,
				fixed: item.fixed
			})},
			id: id(),
			com: componentsMap[item.com],
			canRemove: item.canRemove,
			config: item.config
		}));
		console.log({ items });
		loading = false;
	}

	// Remove an item from the grid
	function remove(item) {
		console.log('remove', item)
		items = items.filter((value) => value.id !== item.id);

		if (adjustAfterRemove) {
			items = gridHelp.adjust(items, [[120, 6]]);
		}
	}

	// Initialize default provider and fetch layout on mount
	onMount(() => {
		// defaultEvmStores.setProvider();
		fetchLayout();
	});
</script>

<div>
	{#if loading}
		<!-- Show loader while fetching -->
		Loading...
	{:else}
		{#if items?.length}
			<Grid bind:items rowHeight={100} let:item let:dataItem cols={[[120, 6]]}>
				{#if dataItem.canRemove}
					<span
						on:pointerdown={(e) => e.stopPropagation()}
						on:click={() => remove(dataItem)}
						class="remove"
					>
						✕
					</span>
				{/if}
				<svelte:component this={dataItem.com} config={dataItem.config}></svelte:component>
			</Grid>
		{:else}
			Oops
		{/if}
	{/if}
</div>

<style>
	.remove {
		text-align: right;
		color: grey;
		display: block;
		position: absolute;
		right: 9px;
		top: 9px;
		cursor: pointer;
	}
</style>
