<script>
	import { signerAddress } from 'ethers-svelte';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';

	export let data;
	export let allowActions = false;

	const tableSimple = {
		// A list of heading labels.
		head: ['AMOUNT IN', 'ASK', 'BID', 'BUYER', 'CHAIN', 'EXPIRATION'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data, [
			'amount_in',
			'ask_token_id',
			'bid_token_id',
			'buyer_wallet_address',
			'chain_id',
			'expiration_time'
		])
	};

	console.log($signerAddress);
</script>

<Table source={tableSimple} />
