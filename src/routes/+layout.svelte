<script lang="ts">
    import '../app.css';
    import Header from '$components/Header/Header.svelte';
    import { showSpaceship } from '$stores/spaceshipStore';
</script>

<div class="flex flex-col min-h-screen">
    <Header showSpaceship={$showSpaceship}/>
    
    <main class="flex-1 bg-white">
        <slot />
    </main>
</div>