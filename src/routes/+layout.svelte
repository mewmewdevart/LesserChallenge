<script lang="ts">
	import '../app.css';
	import Header from '$components/Header/Header.svelte';
	import { showSpaceship } from '$stores/candidateStore';
</script>

<main>
	<div class="flex min-h-screen flex-col">
		<Header showSpaceship={$showSpaceship} />
		<main class="flex-1 bg-white">
			<slot />
		</main>
		<footer class=" bottom-0 w-full py-2 text-center">
			Feito com 💙 por <a
				href="https://linktr.ee/mewmewdevart"
				class="text-blue-800"
				target="_blank">Larissa Cristina Benedito</a
			>
		</footer>
	</div>
</main>
