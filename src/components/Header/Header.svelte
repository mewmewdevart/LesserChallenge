<script lang="ts">
	import CloudBackground from '$components/CloudBackground/CloudBackground.svelte';
	export let showSpaceship: boolean;

	import './Header.css';
</script>

<header class="header">
	<div class="header__container">
		<CloudBackground />
		{#if showSpaceship}
			<p class="header__spaceship">🚀</p>
		{/if}
	</div>
</header>
