<script lang="ts">
    export let isModalVisible: boolean;
    export let isSuccessModal: boolean;
    export let modalMessage: string;
    export let onClose: () => void;
</script>

{#if isModalVisible}
    <dialog 
        class="modal modal-open" 
        aria-labelledby="modal-title" 
        aria-describedby="modal-description" 
        aria-live="polite"
    >
        <div class="modal-box" role="dialog" aria-modal="true">
            <button 
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                on:click={onClose} 
                aria-label="Fechar modal"
            >
                ✕
            </button>

            <img 
                src={isSuccessModal ? "/icon_success.png" : "/icon_fail.png"} 
                alt={isSuccessModal ? "Ícone de sucesso" : "Ícone de erro"} 
                class="w-20 h-20 mx-auto"
            />

            <h2 id="modal-title" class="font-bold text-center mt-4 text-2xl">
                {modalMessage}
            </h2>

            <p id="modal-description" class="py-4">
                {#if isSuccessModal}
                    Parabéns, cadete! 🏆 Sua identidade foi confirmada no sistema da <strong>Lesser-X</strong>, 
                    e você agora faz parte da tripulação oficial. O lançamento foi um sucesso, 
                    e sua jornada pelo cosmos está apenas começando! 🌌🚀
                {:else}
                    Infelizmente, o tempo se esgotou e seu registro não foi processado a tempo. 
                    A nave <strong>Lesser-X</strong> decolou sem você! 😞 Mas não se preocupe, cadete: 
                    continue treinando suas habilidades e tente novamente na próxima missão. 
                    O espaço ainda aguarda por você! 🌠
                {/if}
            </p>

            <p class="text-center text-sm text-gray-500">
                Pressione <kbd>ESC</kbd>, clique no <strong>(X)</strong> ou fora do modal para fechar.
            </p>
        </div>
    </dialog>
{/if}
