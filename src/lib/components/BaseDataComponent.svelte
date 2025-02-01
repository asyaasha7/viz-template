<script>
    // @ts-nocheck
    import { onMount, createEventDispatcher } from 'svelte';
    import BaseWrapperComponent from './BaseWrapperComponent.svelte';

    /** @type {ConfigType} */
    export let config;

    export let name = '';
    export let url = config.url || null;
    export let refreshInterval = config.refreshInterval || null;

    // Create an event dispatcher for passing data
    const dispatch = createEventDispatcher();
    
    let loading = true;
    let error = '';

    async function fetchData() {
        if (!url) {
            error = "No URL provided.";
            loading = false;
            return;
        }

        try {
            loading = true;
            const response = await fetch(url);
            if (!response.ok) {
                throw console.error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            // Dispatch event with new data
            dispatch("update", data);
            error = '';
        } catch (err) {
            console.error("Fetch Error:", err);
            error = err?.message || "Unknown Error";
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchData();
        let interval = refreshInterval ? setInterval(fetchData, refreshInterval) : null;

        return () => {
            if (interval) clearInterval(interval);
        };
    });
</script>

<BaseWrapperComponent {config} {name}>
    {#if loading}
        <p class="text-gray-200 text-center mt-4">Loading...</p>
    {:else if error}
        <p class="text-red-500 text-center mt-4">Error: {error}</p>
    {/if}
    
    <!-- Pass data through event dispatchers -->
    <slot />
</BaseWrapperComponent>
