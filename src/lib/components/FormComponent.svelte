<script>
	// @ts-nocheck
	import { signerAddress, chainId } from 'ethers-svelte';
	import { postData } from '../actions';
	import { PATH } from '../consts';

	let amount;
	let selectedToken;

	async function onSubmit() {
		console.log(amount);
		console.log(selectedToken);

		const payload = {
			amount_in: amount,
			token_id: selectedToken,
			chain_id: $chainId,
			wallet_address: $signerAddress
		};
		try {
			const resp = await postData(PATH.RFQ);
			console.log(resp);
		} catch (e) {
			console.log(e);
		}
	}
</script>

<section>
	<h1>New RFQs</h1>
	<div class="rfq-form flex gap-2">
		<label class="label">
			<input class="input" type="text" placeholder="Amount In" bind:value={amount} />
		</label>
		<label class="label">
			<select bind:value={selectedToken} class="select">
				<option value="WETH">WETH</option>
				<option value="WBTC">WBTC</option>
				<option value="DAI">DAI</option>
				<option value="USDC">USDC</option>
			</select>
		</label>
		<button type="submit" class="btn-sm variant-ghost-surface" on:click={onSubmit}>Submit</button>
	</div>
</section>
