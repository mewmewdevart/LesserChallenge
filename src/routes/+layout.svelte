<script lang="ts">
    import '../app.css';
    import Header from '$components/header/Header.svelte';
    export let isModalVisible: boolean = false;
</script>

<div class="flex flex-col min-h-screen">
    <Header showModal={isModalVisible} />
    
    <main class="flex-1 bg-white">
        <slot />
    </main>
</div>