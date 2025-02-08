<script lang="ts">
    import { goto } from '$app/navigation';
    import { candidateStore } from '$stores/candidateStore';
    import './candidate.css';

    function goBack() {
        goto('/');
    }
</script>

<div class="candidate">
    {#if $candidateStore.showCandidatePage}
        <h1 class="candidate__title">Informações do Candidato</h1>
        <div class="candidate__card">
            <div class="candidate__avatar">
                <div class="candidate__avatar-icon">
                    <p class="candidate__avatar-text">{$candidateStore.name?.charAt(0) || '?'}</p>
                </div>
            </div>
            <div class="candidate__info">
                <h2 class="candidate__name">{$candidateStore.name || 'Usuário'}</h2>
                <p class="candidate__phone">{$candidateStore.phone || 'Telefone desconhecido'}</p>
                <p class="candidate__email">{$candidateStore.email || 'Email desconhecido'}</p>
                <div class="candidate__actions">
                    <button class="candidate__button" on:click={goBack}>Voltar para o Desafio</button>
                </div>
            </div>
        </div>
    {:else}
        <p class="candidate__message">Por favor, finalize o desafio com sucesso para visualizar esta página.</p>
        <button class="candidate__button" on:click={goBack}>Voltar para o Desafio</button>
    {/if}
</div>