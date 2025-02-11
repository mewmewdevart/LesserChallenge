<script lang="ts">
    export let countdown: number | undefined;
    export let previousCountdown: number | undefined;
    export let showPreviousCountdown: boolean;

    function formatTime(seconds: number): { minutes: string; seconds: string } {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(remainingSeconds).padStart(2, '0'),
        };
    }
</script>

<main>
    <div class="flex gap-4 flex-col text-center">
        {#if countdown !== undefined && !showPreviousCountdown}
            <p class="challenge__timer-label">Tempo restante:</p>
            <div class="flex gap-4">
                <div>
                    <span class="font-mono text-6xl">
                        <span id="timerMinutes" class="timer-minutes">{formatTime(countdown).minutes}</span>
                    </span>
                    min
                </div>
                <div>
                    <span class="font-mono text-6xl">
                        <span id="timerSeconds" class="timer-seconds">{formatTime(countdown).seconds}</span>
                    </span>
                    sec
                </div>
            </div>
        {/if}

        {#if previousCountdown !== undefined && showPreviousCountdown}
            <p class="challenge__timer-label">⏱️ Desafio concluído em:</p>
            <div class="flex gap-4">
                <div>
                    <span class="font-mono text-6xl">
                        <span id="timerMinutes" class="timer-minutes">{formatTime(previousCountdown).minutes}</span>
                    </span>
                    min
                </div>
                <div>
                    <span class="font-mono text-6xl">
                        <span id="timerSeconds" class="timer-seconds">{formatTime(previousCountdown).seconds}</span>
                    </span>
                    sec
                </div>
            </div>
        {/if}
    </div>
</main>