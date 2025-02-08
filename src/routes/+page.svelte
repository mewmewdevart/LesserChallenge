<script lang="ts">
	import { goto } from '$app/navigation';
	import { candidateStore } from '../stores/candidateStore';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Timer from '$components/Timer.svelte';
	import Modal from '$components/Modal.svelte';
	import Header from '$components/header/Header.svelte';

	// Constants
	const INITIAL_COUNTDOWN = 15;

	// State variables
	let name: string = '';
	let phone: string = '';
	let email: string = '';
	let formError: string = '';
	let countdown: number = INITIAL_COUNTDOWN;
	let timer: ReturnType<typeof setInterval> | null = null;
	let challengeStarted: boolean = false;
	let modalMessage: string = '';
	let showModal: boolean = false;
	let buttonText: string = 'Iniciar Desafio';
	let showCandidatePage: boolean = false;
	let sucessModal: boolean = false;

	// Função para formatar o telefone
	function formatPhone(value: string): string {
		value = value.replace(/\D/g, '');
		if (value.length > 10) {
			// Smartphone
			value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
		} else {
			// Telefone fixo
			value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
		}
		return value;
	}

	// Atualiza o texto do botão se o desafio já foi iniciado
	$: if ($candidateStore?.name || $candidateStore?.phone || $candidateStore?.email) {
		buttonText = 'Reiniciar Desafio';
	}

	// Função para formatar o tempo
	function formatTime(seconds: number): { minutes: string; seconds: string } {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return {
			minutes: String(minutes).padStart(2, '0'),
			seconds: String(remainingSeconds).padStart(2, '0')
		};
	}

	// Função para iniciar ou reiniciar o desafio
	function startChallenge() {
		if (
			challengeStarted ||
			$candidateStore?.name ||
			$candidateStore?.phone ||
			$candidateStore?.email
		) {
			resetChallenge();
		} else {
			startNewChallenge();
		}
	}

	// Função para reiniciar o desafio
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

	// Função para iniciar um novo desafio
	function startNewChallenge() {
		console.log('Iniciando novo desafio...');
		challengeStarted = true;
		buttonText = 'Reiniciar Desafio';
		showModal = false;

		timer = setInterval(() => {
			if (countdown > 0) {
				countdown--;
				console.log(`Countdown: ${countdown}`);
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
				console.log('Countdown chegou a zero.');
				endChallenge(false);
			}
		}, 1000);
	}

	// Função para enviar o desafio
	function submitChallenge() {
		if (!challengeStarted) return;

		// Validação dos campos
		if (!name || !validatePhone(phone) || !validateEmail(email)) {
			return;
		}

		clearInterval(timer!);
		if (countdown > 0) {
			endChallenge(true);
		} else {
			endChallenge(false);
		}
	}

	// Função para finalizar o desafio
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

	// Função para fechar o modal
	function closeModal() {
		showModal = false;
		sucessModal = false;
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

	// Função para navegar para a página do candidato
	function goToCandidatePage() {
		goto('/candidate');
	}

	// Função para lidar com o evento de tecla pressionada
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showModal) {
			closeModal();
		}
	}

	// Função para lidar com o clique fora do modal
	function handleClickOutside(event: MouseEvent) {
		const modal = document.querySelector('.modal-box');
		if (modal && !modal.contains(event.target as Node)) {
			closeModal();
		}
	}

	// Adiciona e remove event listeners para o modal
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

	// Remove event listeners quando o componente é destruído
	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('click', handleClickOutside);
		}
	});

	// Função para validar o email
	function validateEmail(email: string): boolean {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	// Função para validar o telefone
	function validatePhone(phone: string): boolean {
		const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
		return re.test(phone);
	}
</script>

<Header {showModal} />

<div class="challenge">
	{#if challengeStarted}
		<p class="challenge__timer-label">Tempo restante:</p>
		<Timer {countdown} />
	{/if}

		<div class="challenge__indicator">
			{#if showCandidatePage}
				<span class="challenge__indicator-badge">Novo</span>
			{/if}
			<button class="challenge__indicator-button" on:click={goToCandidatePage}>Ver Candidato</button>
		</div>

	<h1 class="challenge__title">🚀 Registro de Tripulação Espacial</h1>
	{#if !challengeStarted}
	<div class="mx-auto max-w-7xl mb-4">
		<p>
			Bem-vindo, cadete! Você foi selecionado para integrar a próxima expedição intergaláctica. No
			entanto, antes de embarcar, sua identidade precisa ser registrada no sistema de bordo da nave
			estelar <strong> Orion-X </strong>.
		</p>
		<div
			class="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-gray-800 dark:text-yellow-300"
		>
			<p>
				⏳ <strong>Atenção!</strong> Você tem 15 segundos para preencher todos os campos corretamente
				do formulario e tem apenas uma chance para cada lançamento.
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
		<p class="good-luck">Boa sorte, astronauta! 🌌🚀</p>
	</div>
	{/if}

	<form on:submit|preventDefault={submitChallenge} class="challenge__form">
		{#if challengeStarted}
			<div class="challenge__form-group">
				<div class="challenge__form-icon">
					<img src="/icon-user.svg" alt="Ícone de nome" />
				</div>
				<input
					type="text"
					bind:value={name}
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
					bind:value={phone}
					on:input={(e) => {
						if (e.target) phone = formatPhone((e.target as HTMLInputElement).value);
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
					bind:value={email}
					class="challenge__form-input"
					placeholder="Digite o seu email"
					required
				/>
			</div>
		{/if}
		<div class="challenge__form-actions">
			<button class="challenge__form-button" on:click={startChallenge}>
				{buttonText}
			</button>
			{#if challengeStarted}
				<button type="submit" class="challenge__form-button challenge__form-button--submit">
					Enviar
				</button>
			{/if}
		</div>
	</form>
</div>

<Modal {showModal} {sucessModal} {modalMessage} onClose={closeModal} />