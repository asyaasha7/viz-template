<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import axios from 'axios';

	// Writable store for the token
	export const accessToken = writable(null);

	let username = '';
	let password = '';
	let errorMessage = '';

	// Server URL
	const serverUrl = 'http://localhost:5000'; // Replace with your server's URL

	async function login() {
		try {
			const response = await axios.post(`${serverUrl}/login`, {
				username,
				password
			});

			accessToken.set(response.data.access_token);
			errorMessage = '';
			alert('Login successful! Token retrieved.');
		} catch (error) {
			errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
		}
	}
</script>

<div class="container">
	<h2>Token Login</h2>
	<input type="text" placeholder="Username" bind:value={username} />
	<input type="password" placeholder="Password" bind:value={password} />
	<button on:click={login}>Login</button>

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

<style>
	.container {
		max-width: 400px;
		margin: 50px auto;
		padding: 20px;
		border: 1px solid #ddd;
		border-radius: 10px;
		background-color: #f9f9f9;
	}

	h2 {
		text-align: center;
	}

	input,
	button {
		display: block;
		width: 100%;
		margin: 10px 0;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
	}

	button {
		background-color: #333366;
		color: white;
		cursor: pointer;
	}

	button:hover {
		background-color: #5555aa;
	}

	.error {
		color: red;
		font-size: 14px;
	}
</style>
