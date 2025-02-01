<script>
	// @ts-nocheck
    import BaseDataComponent from './BaseDataComponent.svelte';

	 /** @type {ConfigType} */
    export let config;

    let data = {}; // Store received data here
	let DEFAULT_NAME = "Agent Info";

    function processKey(key) {
        return key?.replace('-', ' ')?.replace('_', ' ');
    }
</script>

<!-- Listen for the "update" event and update `data` -->
<BaseDataComponent {config} on:update={(e) => data = e.detail} name={DEFAULT_NAME}>
    {#if Object.keys(data).length > 0}
        <ul class="list">
            {#each Object.entries(data) as [key, value]}
                <li>
                    <span class="key">{processKey(key)}: </span>
                    <span class="flex-auto value">{value || 'N/A'}</span>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-gray-500 text-center mt-4">No data available</p>
    {/if}
</BaseDataComponent>

<style>
    ul {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 10px;
        height: auto;
    }
    li {
        padding: 10px;
        text-align: left;
        border-bottom: 0.5px solid #00ff4178;
    }
    .key {
        color: #f682aa;
        text-transform: uppercase;
        font-size: 10px;
    }
    .value {
        font-size: 75%;
        width: 80%;
        overflow-wrap: break-word;
    }
</style>