<script>
	// @ts-nocheck
	import { defaultEvmStores } from 'ethers-svelte';
	import { onMount } from 'svelte';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { popup } from '@skeletonlabs/skeleton';

	// Import components
	import ListInfoKeyValue from '../lib/components/ListInfoKeyValue.svelte';
	// import WalletConnectEther from '../lib/components/WalletConnectEther.svelte';
	import TableTabs from '../lib/modules/TableTabs.svelte';
	import TableComponent from '../lib/components/TableComponent.svelte';
	import FormComponent from '../lib/components/FormComponent.svelte';
	import BestPrice from '../lib/components/BestPrice.svelte';
	import PingAgent from '../lib/components/PingAgent.svelte';

	// Map component names to Svelte components
	const componentsMap = {
		ListInfoKeyValue,
		FormComponent,
		BestPrice,
		TableComponent,
		PingAgent,
		// WalletConnectEther,
		TableTabs
	};

	// Utility function to generate unique IDs
	const id = () => Math.random().toString(36).substr(2, 9);

	// State variables
	let items = [];
	let adjustAfterRemove = false;

	// API endpoint to fetch the layout configuration
	const layoutApiEndpoint = 'http://localhost:5000/api/layout'; // Replace with your API endpoint

	// Fetch layout from API
	async function fetchLayout() {
		try {
			const response = await fetch(layoutApiEndpoint);
			if (!response.ok) {
				throw new Error('Failed to fetch layout configuration.');
			}
			const layoutConfig = await response.json();
			items = layoutConfig?.data?.map((item) => ({
				...gridHelp.item({
					...item.coordinates,
					fixed: item.fixed
				}),
				id: id(),
				com: componentsMap[item.com],
				canRemove: item.canRemove,
				name: item.name
			}));
			console.log({ items });
		} catch (error) {
			console.error('Error fetching layout configuration:', error);
			alert('Failed to load layout configuration. Check console for details.');
		}
	}

	// Remove an item from the grid
	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);

		if (adjustAfterRemove) {
			items = gridHelp.adjust(items, [[120, 6]]);
		}
	};

	// Initialize default provider and fetch layout on mount
	onMount(() => {
		// defaultEvmStores.setProvider();
		fetchLayout();
	});
</script>

<div>
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
		<svelte:component this={dataItem.com} name={dataItem.name}></svelte:component>
	</Grid>
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
