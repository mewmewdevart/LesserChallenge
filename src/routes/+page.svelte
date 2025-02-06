<script lang="ts">
    import { goto } from '$app/navigation';
    import { candidateStore } from '../stores/candidateStore';
    import { onDestroy } from 'svelte';
    
    import { browser } from '$app/environment';
    import Timer from '$components/Timer.svelte';
    import Modal from '$components/Modal.svelte';

    // Constants
    const INITIAL_COUNTDOWN = 15;

    // State variables
    let name: string = '';
    let phone: string = '';
    let email: string = '';
    let countdown: number = INITIAL_COUNTDOWN;
    let timer: ReturnType<typeof setInterval> | null = null;
    let challengeStarted: boolean = false;
    let modalMessage: string = '';
    let showModal: boolean = false;
    let buttonText: string = 'Iniciar Desafio';
    let showCandidatePage: boolean = false;
    let sucessModal: boolean = false;

    function formatPhone(value: string): string {
        value = value.replace(/\D/g, ''); 
        if (value.length > 10) {
            // Smartphone
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else {
            // Phone
            value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
        }
        return value;
    }

    $: if ($candidateStore?.name || $candidateStore?.phone || $candidateStore?.email) {
        buttonText = 'Reiniciar Desafio';
    }

    function formatTime(seconds: number): { minutes: string, seconds: string } {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(remainingSeconds).padStart(2, '0')
        };
    }

    function startChallenge() {
        if (challengeStarted || ($candidateStore?.name || $candidateStore?.phone || $candidateStore?.email)) {
            resetChallenge();
        } else {
            startNewChallenge();
        }
    }

    function resetChallenge() {
        clearInterval(timer!);
        countdown = INITIAL_COUNTDOWN;
        challengeStarted = false;
        showModal = false;
        name = '';
        phone = '';
        email = '';
        candidateStore.set({
            name: '',
            phone: '',
            email: '',
            countdown: INITIAL_COUNTDOWN,
            challengeStarted: false,
            showCandidatePage: false
        });
        buttonText = 'Iniciar Desafio';
    }

    function startNewChallenge() {
        challengeStarted = true;
        buttonText = 'Reiniciar Desafio';
        showModal = false;

        timer = setInterval(() => {
            if (countdown > 0) {
                countdown--;
                candidateStore.update((state) => {
                    if (state) {
                        return {
                            ...state,
                            countdown,
                            name: state.name || '',
                            phone: state.phone || '',
                            email: state.email || '',
                            challengeStarted: state.challengeStarted || false,
                            showCandidatePage: state.showCandidatePage || false
                        };
                    } else {
                        return {
                            name: '',
                            phone: '',
                            email: '',
                            countdown: INITIAL_COUNTDOWN,
                            challengeStarted: false,
                            showCandidatePage: false
                        };
                    }
                });
            } else {
                endChallenge(false);
            }
        }, 1000);
    }

    function submitChallenge() {
        if (!challengeStarted) return;

        clearInterval(timer!);
        if (countdown > 0) {
            endChallenge(true);
        } else {
            endChallenge(false);
        }
    }

    // Function to end the challenge
    function endChallenge(success: boolean) {
        modalMessage = success ? 'Desafio finalizado com sucesso!' : 'Desafio finalizado com falha!';
        sucessModal = success;

        if (success) {
            candidateStore.set({
                name,
                phone,
                email,
                countdown,
                challengeStarted: false,
                showCandidatePage: true
            });
            showCandidatePage = true;
        }
        showModal = true;
        challengeStarted = false;
    }

    function closeModal() {
        showModal = false;
        if (!challengeStarted) {
            countdown = INITIAL_COUNTDOWN;
            candidateStore.update((state) => {
                if (state) {
                    return {
                        ...state,
                        countdown,
                        name: state.name || '',
                        phone: state.phone || '',
                        email: state.email || '',
                        challengeStarted: state.challengeStarted || false,
                        showCandidatePage: state.showCandidatePage || false
                    };
                } else {
                    return {
                        name: '',
                        phone: '',
                        email: '',
                        countdown: INITIAL_COUNTDOWN,
                        challengeStarted: false,
                        showCandidatePage: false
                    };
                }
            });
        }
    }

    function goToCandidatePage() {
        goto('/candidate');
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && showModal) {
            closeModal();
        }
    }
    function handleClickOutside(event: MouseEvent) {
        const modal = document.querySelector('.modal-box');
        if (modal && !modal.contains(event.target as Node)) {
            closeModal();
        }
    }

    $: if (browser && showModal) {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);
        const closeButton = document.querySelector('.modal-box button');
        if (closeButton) {
            (closeButton as HTMLElement).focus();
        }
    } else if (browser) {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('click', handleClickOutside);
    }

    onDestroy(() => {
        if (browser) {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        }
    });
</script>

<div class="flex items-center flex-col p-4 bg-[#F9FAFB] w-full h-screen">
    <div class="flex flex-col gap-5 items-center justify-center bg-gradient-to-r from-cyan-500 to-[#3198E8] w-full h-60 text-white">
        {#if challengeStarted}
        <p class="text-lg">Tempo restante:</p>
        <Timer {countdown} />
        {/if}
        <div class="indicator mt-4 absolute right-8 top-4">
            {#if showCandidatePage}
                <span class="indicator-item badge badge-primary">Novo</span>
            {/if}
            <button class="btn btn-active" on:click={goToCandidatePage}>Ver Candidato</button>
        </div>
    </div>
    <h1 class="text-2xl font-bold my-4">Desafio de Programação</h1>
    <form on:submit|preventDefault={submitChallenge} class="space-y-4 w-full max-w-md">
        <!-- Input fields for name, phone, and email -->
        <div class="relative mb-4">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img src="/icon-user.svg" alt="Name Icon" class="w-5 h-5" />
            </div>
            <input
                type="name"
                id="name-address-icon"
                bind:value={name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-purple focus:border-custom-purple block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-custom-purple dark:focus:border-custom-purple"
                placeholder="Digite seu nome"
                required
            />
        </div>
        <div class="relative mb-4">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img src="/icon-phone.svg" alt="Telefone Icon" class="w-5 h-5" />
            </div>
            <input
                type="tel"
                id="phone-address-icon"
                bind:value={phone}
                on:input={(e) => { phone = formatPhone(e.target.value); }}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-purple focus:border-custom-purple block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-custom-purple dark:focus:border-custom-purple"
                placeholder="Digite o seu telefone"
                required
            />
        </div>
        <div class="relative mb-4">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img src="/icon-email.svg" alt="Email Icon" class="w-5 h-5" />
            </div>
            <input
                type="email"
                id="email-address-icon"
                bind:value={email}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-purple focus:border-custom-purple block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-custom-purple dark:focus:border-custom-purple"
                placeholder="Digite o seu email"
                required
            />
        </div>
        <div class="flex justify-between gap-4">
            <button class="px-6 py-2 text-center text-white bg-[#3198E8] border border-[#3198E8] rounded-lg active:text-[#3198E8] hover:bg-transparent hover:text-[#3198E8] focus:outline-none focus:ring {!challengeStarted ? 'w-full' : ''}" on:click={startChallenge}>
            {buttonText}
          </button>
            {#if challengeStarted}
                <button type="submit" class="px-6 py-2 w-[210px] text-center text-lue-500 border border-[#3198E8] rounded-lg hover:bg-lue-500 hover:text-black active:bg-[#3198E8] focus:outline-none focus:ring">
                    Enviar
              </button>
            {/if}
        </div>
    </form>
</div>

<Modal {showModal} {sucessModal} {modalMessage} onClose={closeModal} />