<script lang="ts">
    import { goto } from '$app/navigation';
    import { candidateStore } from '$stores/candidateStore';
    import { showSpaceship } from '$stores/spaceshipStore';
    import { INITIAL_COUNTDOWN } from '$stores/candidateStore';
    
    import Modal from '$components/Modal/Modal.svelte';
    
    import './candidate.css';

    let isModalVisible = false;
    let modalMessage = '';
    let isSuccessModal = false;

    function goBack() {
        goto('/');
    }

    function capitalizeFirstLetter(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    $: if ($candidateStore.countdown === 0 && $candidateStore.challengeStarted && !isModalVisible) {
        endChallenge(false);
    }

    function endChallenge(success: boolean) {
        modalMessage = success ? 'Desafio finalizado com sucesso!' : 'Desafio finalizado com falha!';
        isSuccessModal = success;
        isModalVisible = true;
        candidateStore.update((state: any) => ({
            ...state,
            challengeStarted: false,
            showCandidatePage: false,
            countdown: INITIAL_COUNTDOWN,
            previousCountdown: 0,
            showPreviousCountdown: false,
            name: '',
            phone: '',
            email: ''
        }));
        showSpaceship.set(true);
    }
    function closeModal() {
        isModalVisible = false;
        goto('/');
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
        {:else}
            <div class="candidate__message-container">
                <p class="candidate__message">Por favor, finalize o desafio com sucesso para visualizar esta página.</p>
                <button class="candidate__button" on:click={goBack}>Voltar para o Desafio</button>
            </div>
        {/if}
    </div>

    <Modal {isModalVisible} {isSuccessModal} {modalMessage} onClose={closeModal} />
</main>