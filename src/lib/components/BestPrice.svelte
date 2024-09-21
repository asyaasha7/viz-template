<script>
	let price = '123';
	const PRICE_URL = 'http://localhost:5556';

	function getPrice() {}
</script>

<main>
	<div class="flex">
		<input type="text" bind:value={price} placeholder="Best Price" style="width: 100%;" disabled />
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
