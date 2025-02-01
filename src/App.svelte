<script>
    // @ts-nocheck
    export const ssr = false;
    export const prerender = false;

    import './app.postcss';
    import { AppShell, AppBar, initializeStores, Toast } from '@skeletonlabs/skeleton';
    import Grid from 'svelte-grid';
    import gridHelp from 'svelte-grid/build/helper/index.mjs';
    import { storeHighlightJs, storePopup } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { onMount } from 'svelte';
    import { layoutConfig } from './lib/config/layoutConfig';
    import { URLS } from './lib/consts';
    import Logo from './lib/components/Logo.svelte';

    // Highlight.js
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github-dark.css';
    import xml from 'highlight.js/lib/languages/xml';
    import css from 'highlight.js/lib/languages/css';
    import javascript from 'highlight.js/lib/languages/javascript';
    import typescript from 'highlight.js/lib/languages/typescript';

    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    storeHighlightJs.set(hljs);

    // Initialize Floating UI and Stores
    initializeStores();
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    // Components
    import ListInfoKeyValue from './lib/components/ListInfoKeyValue.svelte';
    // import WalletConnectEther from './lib/components/WalletConnectEther.svelte';
    import FormComponent from './lib/components/FormComponent.svelte';
    // import BestPrice from './lib/components/BestPrice.svelte';
    import PingAgent from './lib/components/PingAgent.svelte';
    import WebSocketData from './lib/components/WebSocketData.svelte';
    import GrafanaDashboard from './lib/components/GrafanaDashboard.svelte';

    // Map component names to Svelte components
    const componentsMap = {
        ListInfoKeyValue,
        FormComponent,
        PingAgent,
        GrafanaDashboard,
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
        let currentLayout = layoutConfig; // Default layout fallback
        try {
            const response = await fetch(URLS.LAYOUT);
            if (!response.ok) {
                console.error('Failed to fetch layout configuration. Falling back to default.');
            } else {
                currentLayout = await response.json();
            }
        } catch (error) {
            console.error('Error fetching custom layout configuration:', error);
        }

        items = currentLayout?.data?.map((item) => ({
            6: {
                ...gridHelp.item({ ...item.coordinates, fixed: item.fixed })
            },
            id: id(),
            com: componentsMap[item.com],
            canRemove: item.canRemove,
            config: item.config
        }));
        loading = false;
    }

    // Remove an item from the grid
    function remove(item) {
        items = items.filter((value) => value.id !== item.id);
        if (adjustAfterRemove) {
            items = gridHelp.adjust(items, [[120, 6]]);
        }
    }

    // Fetch layout on mount
    onMount(fetchLayout);
</script>

<Toast />

<!-- App Shell -->
<AppShell>
    <!-- AppBar (Header) -->
    <svelte:fragment slot="header">
        <AppBar>
            <div class="flex items-center">
                <svelte:component this={Logo} />
                <h2>VIZ STATION</h2>
            </div>
        </AppBar>
    </svelte:fragment>

    <!-- Grid Layout -->
    <div>
        {#if loading}
            <p class="text-yellow-400 text-center mt-4">Loading...</p>
        {:else}
            {#if items.length}
                <Grid bind:items rowHeight={100} let:item let:dataItem cols={[[120, 6]]}>
                    {#if dataItem.canRemove}
                        <span on:pointerdown={(e) => e.stopPropagation()} on:click={() => remove(dataItem)} class="remove">✕</span>
                    {/if}
                    <svelte:component this={dataItem.com} config={dataItem.config} />
                </Grid>
            {:else}
                <p class="text-gray-500 text-center mt-4">Oops, no items available.</p>
            {/if}
        {/if}
    </div>
</AppShell>

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