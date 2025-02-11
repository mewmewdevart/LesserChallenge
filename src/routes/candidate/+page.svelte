<script lang="ts">
    import { goto } from '$app/navigation';
    import { candidateStore } from '$stores/candidateStore';
    import Timer from '$components/Timer/Timer.svelte';
    import './candidate.css';

    function goBack() {
        goto('/');
    }

    function capitalizeFirstLetter(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
</script>

<main>
    <div class="candidate">
        {#if $candidateStore.showCandidatePage}
            <h1 class="candidate__title">Informações do Candidato(Cadete)</h1>
            <div class="candidate__card">
                <div>
                    <div class="candidate__avatar-icon">
                        <p class="candidate__avatar-text">{capitalizeFirstLetter($candidateStore.name?.charAt(0)) || '?'}</p>
                    </div>
                </div>
                <div class="candidate__info">
                    <h2 class="candidate__name" id="candidate-name">{capitalizeFirstLetter($candidateStore.name) || 'Usuário'}</h2>
                    <p class="candidate__phone">{$candidateStore.phone || 'Telefone desconhecido'}</p>
                    <p class="candidate__email">{$candidateStore.email || 'Email desconhecido'}</p>
                    <div class="candidate__actions">
                        <button class="candidate__button" on:click={goBack}>Voltar para o Desafio</button>
                    </div>
                </div>
            </div>
            {#if $candidateStore.challengeStarted}
                <Timer countdown={$candidateStore.countdown} previousCountdown={$candidateStore.previousCountdown} showPreviousCountdown={false} />
            {/if}
        {:else}
            <div class="candidate__message-container">
                <p class="candidate__message">Por favor, finalize o desafio com sucesso para visualizar esta página.</p>
                <button class="candidate__button" on:click={goBack}>Voltar para o Desafio</button>
            </div>
        {/if}
    </div>
</main>