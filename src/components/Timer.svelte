<script lang="ts">
    export let countdown: number;

    function formatTime(seconds: number): { minutes: string; seconds: string } {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(remainingSeconds).padStart(2, '0'),
        };
    }
</script>

<div class="flex gap-4">
    <div>
        <span class="countdown font-mono text-6xl">
            <span style="--value:{formatTime(countdown).minutes};"></span>
        </span>
        min
    </div>
    <div>
        <span class="countdown font-mono text-6xl">
            <span style="--value:{formatTime(countdown).seconds};"></span>
        </span>
        sec
    </div>
</div>