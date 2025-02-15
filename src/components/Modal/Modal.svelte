<script lang="ts">
	export let isModalVisible: boolean;
	export let isSuccessModal: boolean;
	export let modalMessage: string;
	export let onClose: () => void;
</script>

{#if isModalVisible}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div id="canvaModal" class="fixed inset-0 z-20 h-screen w-screen bg-black opacity-40" on:click={onClose}></div>
	<div class="modal modal-open">
		<div id="modalBox" class="modal-box" role="dialog" aria-modal="true">
			<button
				class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
				on:click={onClose}
				aria-label="Fechar modal"
			>
				✕
			</button>

			<div class="text-center text-6xl">
				{isSuccessModal ? '✅' : '🚨'}
			</div>

			<h2 id="modal-title" class="mt-4 text-center text-2xl font-bold">
				{modalMessage}
			</h2>

			<p id="modal-description" class="py-4">
				{#if isSuccessModal}
					Parabéns, cadete! 🏆 Sua identidade foi confirmada no sistema da <strong>Lesser-X</strong
					>, e você agora faz parte da tripulação oficial. O lançamento foi um sucesso, e sua
					jornada pelo cosmos está apenas começando! 🌌🚀
				{:else}
					Infelizmente, o tempo se esgotou e seu registro não foi processado a tempo. A nave <strong
						>Lesser-X</strong
					> decolou sem você! 😞 Mas não se preocupe, cadete: continue treinando suas habilidades e tente
					novamente na próxima missão. O espaço ainda aguarda por você! 🌠
				{/if}
			</p>

			<p class="text-center text-sm text-gray-500">
				Clique no <strong>(X)</strong> ou fora do modal para fechar.
			</p>
		</div>
	</div>
{/if}

<style>
	.modal-open {
		@apply absolute left-1/2 top-1/2 m-0 max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform bg-transparent bg-none p-0 md:h-[300px];
	}

	.modal:not(dialog:not(.modal-open)),
	.modal::backdrop {
		background-color: transparent;
	}
</style>
