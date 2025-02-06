<script lang="ts">
    import { goto } from '$app/navigation';
    import { candidateStore } from '$stores/candidateStore';

    function goBack() {
        goto('/');
    }
</script>

<div class="flex justify-center flex-col items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
    {#if $candidateStore.showCandidatePage}
        <h1 class="text-2xl font-bold mb-4">Informações do Candidato</h1>
        <div class="card bg-base-100 w-96 shadow-xl flex items-center">
            <div class="mt-10">
                <div class="bg-gray-300 flex justify-center items-center text-center w-[150px] h-[150px] rounded-full">
                    <p class="text-4xl font-bold">{$candidateStore.name?.charAt(0) || '?'}</p>
                </div>
            </div>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{$candidateStore.name || 'Usuário'}</h2>
                <p>{$candidateStore.phone || 'Telefone desconhecido'}</p>
                <p>{$candidateStore.email || 'Email desconhecido'}</p>
                <div class="card-actions">
                    <button class="btn btn-active mt-4" on:click={goBack}>Voltar para o Desafio</button>
                </div>
            </div>
        </div>
    {:else}
        <p class="text-center mt-10 text-xl">Por favor, finalize o desafio com sucesso para visualizar esta página.</p>
        <button class="btn btn-active mt-4" on:click={goBack}>Voltar para o Desafio</button>
    {/if}
</div>