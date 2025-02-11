<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    import { showSpaceship } from '$stores/spaceshipStore';
    import { candidateStore } from '$stores/candidateStore';
    import { INITIAL_COUNTDOWN } from '$stores/candidateStore';

    import Timer from '$components/Timer/Timer.svelte';
    import Modal from '$components/Modal/Modal.svelte';


    let candidateName: string = '';
    let candidatePhone: string = '';
    let candidateEmail: string = '';
    let previousCountdown: number = 0;
    let countdown: number = INITIAL_COUNTDOWN;
    let timer: ReturnType<typeof setInterval> | null = null;
    let isChallengeStarted: boolean = false;
    let modalMessage: string = '';
    let isModalVisible: boolean = false;
    let showPreviousCountdown: boolean = false;
    let buttonText: string = 'Iniciar Desafio';
    let isCandidatePageVisible: boolean = false;
    let isSuccessModal: boolean = false;

    // Restore state when the page loads
    onMount(() => {
        if ($candidateStore.countdown !== undefined) {
            countdown = $candidateStore.countdown;
        }
        if ($candidateStore.previousCountdown !== undefined) {
            previousCountdown = $candidateStore.previousCountdown;
        }
        if ($candidateStore.challengeStarted !== undefined) {
            isChallengeStarted = $candidateStore.challengeStarted;
        }
        if ($candidateStore.showCandidatePage !== undefined) {
            isCandidatePageVisible = $candidateStore.showCandidatePage;
        }
        if ($candidateStore.showPreviousCountdown !== undefined) {
            showPreviousCountdown = $candidateStore.showPreviousCountdown;
        }
        if ($candidateStore.name || $candidateStore.phone || $candidateStore.email) {
            buttonText = 'Reiniciar Desafio';
        }

        if (isChallengeStarted) {
            startTimer();
        }
    });

    function formatPhoneNumber(value: string): string {
        value = value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else {
            value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
        }
        return value;
    }

    function formatTime(seconds: number): { minutes: string; seconds: string } {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(remainingSeconds).padStart(2, '0')
        };
    }

    function startChallenge() {
        resetFormFields();
        showSpaceship.set(false);
        if (isChallengeStarted || $candidateStore?.name || $candidateStore?.phone || $candidateStore?.email) {
            resetChallenge();
        } else {
            initiateNewChallenge();
        }
    }

    function resetChallenge() {
        clearInterval(timer!);
        countdown = INITIAL_COUNTDOWN;
        previousCountdown = 0;
        isChallengeStarted = false;
        isModalVisible = false;
        showSpaceship.set(false);
        resetFormFields();
        showPreviousCountdown = false;
        isCandidatePageVisible = false;
        candidateStore.set({
            name: '',
            phone: '',
            email: '',
            countdown: INITIAL_COUNTDOWN,
            previousCountdown: 0,
            challengeStarted: false,
            showCandidatePage: false,
            showPreviousCountdown: false
        });
        buttonText = 'Iniciar Desafio';
        showPreviousCountdown = false;
    }

    function initiateNewChallenge() {
        isChallengeStarted = true;
        buttonText = 'Reiniciar Desafio';
        isModalVisible = false;
        showSpaceship.set(false);
        startTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            if (countdown > 0) {
                countdown--;
                candidateStore.update((state) => ({
                    ...state,
                    countdown,
                    name: state.name || '',
                    phone: state.phone || '',
                    email: state.email || '',
                    challengeStarted: true,
                    showCandidatePage: state.showCandidatePage || false
                }));
            } else {
                endChallenge(false);
            }
        }, 1000);
    }

    function submitChallenge() {
        if (!isChallengeStarted) return;

        if (!candidateName || !validatePhoneNumber(candidatePhone) || !validateEmail(candidateEmail)) {
            return;
        }

        clearInterval(timer!);
        previousCountdown = countdown;
        candidateStore.update((state) => ({
            ...state,
            previousCountdown
        }));
        endChallenge(countdown > 0);
    }

    function endChallenge(success: boolean) {
        clearInterval(timer!);
        modalMessage = success ? 'Desafio finalizado com sucesso!' : 'Desafio finalizado com falha!';
        isSuccessModal = success;

        if (success) {
            candidateStore.set({
                name: candidateName,
                phone: candidatePhone,
                email: candidateEmail,
                countdown,
                previousCountdown,
                challengeStarted: false,
                showPreviousCountdown: true,
                showCandidatePage: true
            });
            isCandidatePageVisible = true;
            showPreviousCountdown = true;
        }
        isModalVisible = true;
        showSpaceship.set(true);
        isChallengeStarted = false;
    }

    function closeModal() {
        isModalVisible = false;
        isSuccessModal = false;
        if (!isChallengeStarted) {
            countdown = INITIAL_COUNTDOWN;
            candidateStore.update((state) => ({
                ...state,
                countdown,
                name: state.name || '',
                phone: state.phone || '',
                email: state.email || '',
                challengeStarted: state.challengeStarted || false,
                showCandidatePage: state.showCandidatePage || false
            }));
        }
    }

    function navigateToCandidatePage() {
        goto('/candidate');
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && isModalVisible) {
            closeModal();
        }
    }

    function handleClickOutside(event: MouseEvent) {
        const modal = document.querySelector('.modal-box');
        if (modal && !modal.contains(event.target as Node)) {
            closeModal();
        }
    }

    function resetFormFields() {
        candidateName = '';
        candidatePhone = '';
        candidateEmail = '';
    }

    $: if (browser && isModalVisible) {
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

    function validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhoneNumber(phone: string): boolean {
        const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return re.test(phone);
    }

    $: buttonText = isChallengeStarted || $candidateStore?.name || $candidateStore?.phone || $candidateStore?.email ? 'Reiniciar Desafio' : 'Iniciar Desafio';
</script>

<main>
    <div class="challenge">
        {#if isChallengeStarted || showPreviousCountdown}
            <Timer {countdown} {previousCountdown} {showPreviousCountdown}/>
        {/if}

        <div class="challenge__indicator">
            {#if isCandidatePageVisible}
                <span class="challenge__indicator-badge">Novo</span>
            {/if}
            <button 
                class="challenge__indicator-button" 
                on:click={navigateToCandidatePage}
            >
                Ver Candidato
            </button>
        </div>

        <h1 class="challenge__title">🚀 Registro de Tripulação Espacial</h1>
        {#if !isChallengeStarted && buttonText === "Iniciar Desafio"}
            <div class="mx-auto max-w-7xl mb-4">
                <p>
                    Bem-vindo, candidato(cadete)! Você foi selecionado para integrar a próxima expedição intergaláctica. No
                    entanto, antes de embarcar, sua identidade precisa ser registrada no sistema de bordo da nave
                    estelar <strong> Lesser-X </strong>.
                </p>
                <div class="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-gray-800 dark:text-yellow-300">
                    <p>
                        ⏳ <strong>Atenção!</strong> Você tem 15 segundos para preencher todos os campos corretamente
                        do formulário e tem apenas uma chance para cada lançamento.
                    </p>
                </div>
                <div class="instructions">
                    <p>
                        Para garantir sua vaga na tripulação, complete o formulário com seus dados antes que a
                        contagem regressiva chegue a zero. Caso contrário, sua decolagem será abortada e você
                        perderá essa oportunidade única de viajar pelo espaço!
                    </p>
                    <ul class="ml-4">
                        <li>
                            Ao clicar em "Iniciar Desafio", a sequência de lançamento será ativada e o tempo começará
                            a contar.
                        </li>
                        <li>
                            Se enviar os dados a tempo, sua identidade será confirmada e sua missão será um sucesso.
                        </li>
                        <li>
                            Caso contrário, a nave partirá sem você, e você precisará aguardar a próxima oportunidade
                            para ingressar na frota estelar.
                        </li>
                    </ul>
                </div>
                <p class="good-luck">Boa sorte, cadete! 🌌🚀</p>
            </div>
        {/if}

        <form on:submit|preventDefault={submitChallenge} class="challenge__form">
            {#if isChallengeStarted}
                <div class="challenge__form-group">
                    <div class="challenge__form-icon">
                        <img src="/icon-user.svg" alt="Ícone de nome" />
                    </div>
                    <input
                        type="text"
                        bind:value={candidateName}
                        class="challenge__form-input"
                        placeholder="Digite seu nome"
                        required
                        
                    />
                </div>
                <div class="challenge__form-group">
                    <div class="challenge__form-icon">
                        <img src="/icon-phone.svg" alt="Ícone de telefone" />
                    </div>
                    <input
                        type="tel"
                        bind:value={candidatePhone}
                        on:input={(e) => {
                            if (e.target) candidatePhone = formatPhoneNumber((e.target as HTMLInputElement).value);
                        }}
                        class="challenge__form-input"
                        placeholder="Digite o seu telefone"
                        required
                        
                    />
                </div>
                <div class="challenge__form-group">
                    <div class="challenge__form-icon">
                        <img src="/icon-email.svg" alt="Ícone de email" />
                    </div>
                    <input
                        type="email"
                        bind:value={candidateEmail}
                        class="challenge__form-input"
                        placeholder="Digite o seu email"
                        required
                        
                    />
                </div>
            {/if}
            <div class="challenge__form-actions">
                <button class="challenge__form-button--restart" on:click={startChallenge}>
                    {buttonText}
                </button>
                {#if isChallengeStarted}
                    <button type="submit" class="challenge__form-button--submit">
                        Enviar
                    </button>
                {/if}
            </div>
        </form>
    </div>

    <Modal {isModalVisible} {isSuccessModal} {modalMessage} onClose={closeModal} />
</main>