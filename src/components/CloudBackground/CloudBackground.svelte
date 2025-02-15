<script lang="ts">
	import './CloudBackground.css';

	const clouds = [1, 2, 3, 4, 5];
</script>

<div class="background-wrap">
	{#each clouds as cloud}
		<div class="background-wrap__cloud" style="--cloud-index: {cloud}">
			<p>☁️</p>
		</div>
	{/each}
</div>
