<script lang="ts">
    import '../app.css';
    import Header from '$components/Header/Header.svelte';
    import { showSpaceship } from '$stores/spaceshipStore';
</script>

<main>
    <div class="flex flex-col min-h-screen">
        <Header showSpaceship={$showSpaceship}/>
        
        <main class="flex-1 bg-white">
            <slot />
        </main>
        <footer class="absolute bottom-0 w-full text-center py-2">Feito com 💙  por <a href="https://linktr.ee/mewmewdevart"  class="text-blue-800" target="_blank">Larissa Cristina Benedito</a></footer>
    </div>
</main>