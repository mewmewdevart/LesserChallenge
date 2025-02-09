<script lang="ts">
	import CloudBackground from '$components/CloudBackground/CloudBackground.svelte';
    import './Header.css';
    export let showModal: boolean = false;
</script>

<header class="header">
    <div class="header__container">
        <CloudBackground />
        {#if showModal}
            <img class="header__spaceship" src="./spaceship.png" alt="Rocket flying animation" />
        {/if}
    </div>
</header>
