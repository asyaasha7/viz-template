<script>
	import BaseWrapperComponent from './BaseWrapperComponent.svelte';
 	
	/** @type {ConfigType} */
	export let config;

	let DEFAULT_NAME = "";
	let url = '';
	$: inputUrl = url;
</script>

<BaseWrapperComponent {config} name={DEFAULT_NAME}>
	{#if !config.url} 
	<input type="text" placeholder="Enter your grafana url" bind:value={url} />
	{/if}
	<iframe
		title="dashboard"
		src={config.url || inputUrl}
		width="100%"
		height="100%"
		frameborder="0"
	/>

</BaseWrapperComponent>

<style>

	input {
		border-radius: 5px;
		padding: 3px;
		width: 100%;
		background: rgb(17, 17, 20);
		color: white;
		margin-top: 5px;
		border: 0.8px solid #258dc9b7;
	}
</style>
