<script lang="ts">
    export let showModal: boolean;
    export let sucessModal: boolean;
    export let modalMessage: string;
    export let onClose: () => void;
</script>

{#if showModal}
<dialog class="modal modal-open" aria-labelledby="modal-title" aria-describedby="modal-description">
    <div class="modal-box" role="dialog" aria-modal="true">
        {#if sucessModal}
            <img src="/icon_sucess.png" alt="Ícone de sucesso" class="w-20 h-20 mx-auto" />
        {:else}
            <img src="/icon_fail.png" alt="Ícone de erro" class="w-20 h-20 mx-auto" />
        {/if}
        <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            on:click={onClose}
            aria-label="Fechar modal"
        >
            ✕
        </button>
        <h2 id="modal-title" class="font-bold text-center mt-4 text-2xl">{modalMessage}</h2>
        <p id="modal-description" class="py-4">Pressione [ESC], clique no (X) ou fora do modal para fechar!</p>
    </div>
</dialog>
{/if}