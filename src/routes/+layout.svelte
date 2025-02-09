<script lang="ts">
    import '../app.css';
    import Header from '$components/Header/Header.svelte';
</script>

<div class="flex flex-col min-h-screen">
    <Header />
    
    <main class="flex-1 bg-white">
        <slot />
    </main>
</div>