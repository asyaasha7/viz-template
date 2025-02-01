<script>
	let userMsg = 'Ping!';
	 /**
	 * @type {{ url: string | URL; }}
	 */
	  export let config;

	function handlePing() {
		const ws = new WebSocket(config.url);

		ws.onopen = () => {
			ws.send(userMsg);
		};

		ws.onmessage = (event) => {
			ws.close(); // Close only after receiving a response
		};

		ws.onerror = (error) => {
			console.error('WebSocket Error:', error);
		};

		ws.onclose = () => {
			console.log('WebSocket disconnected');
		};
	}
</script>

<main>
	<div class="flex">
		<input type="text" bind:value={userMsg} placeholder="Ping agent..." style="width: 100%;" />
		<button type="button" class="btn-sm variant-ghost-surface" on:click={handlePing}>Ping</button>
	</div>
</main>

<style>
	input {
		margin-bottom: 10px;
		padding: 5px;
		background-color: black;
		border-radius: 4px;
	}
	button {
		padding: 5px 10px;
		cursor: pointer;
		height: 35px;
	}
</style>
