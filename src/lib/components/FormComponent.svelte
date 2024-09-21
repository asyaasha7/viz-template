<script>
	// @ts-nocheck

	let amount;
	let selectedToken;
</script>

<div class="fom-container">
	<h1>New RFQs</h1>
	<div class="rfq-form flex gap-2">
		<label class="label">
			<span>Amount In</span>
			<input class="input" type="text" placeholder="Input" bind:value={amount} />
		</label>
		<label class="label">
			<span>Token</span>
			<select bind:value={selectedToken} class="select">
				<option value="WETH">WETH</option>
				<option value="WBTC">WBTC</option>
				<option value="DAI">DAI</option>
				<option value="USDC">USDC</option>
			</select>
		</label>
		<button type="submit" class="btn-sm variant-ghost-surface">Submit</button>
	</div>
</div>
