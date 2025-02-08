<script lang="ts">
    import './header.css';
    export let showModal: boolean = false;
</script>

<header class="header">
    <div class="header__container">
        {#if showModal}
            <img class="header__spaceship" src="./spaceship.png" alt="Rocket flying animation" />
        {/if}
    </div>
</header>