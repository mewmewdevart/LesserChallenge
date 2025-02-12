<script lang="ts">
    import CloudBackground from '$components/CloudBackground/CloudBackground.svelte';
    export let showSpaceship: boolean;

    import './Header.css';
</script>

<header class="header">
    <div class="header__container">
        <CloudBackground />
        {#if showSpaceship}
            <img class="header__spaceship" src="./spaceship.png" alt="Rocket flying animation" />
        {/if}
    </div>
</header>
