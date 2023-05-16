<script lang="ts">
	export let token: { type: 'emoji'; raw: string; name: string; emoji: string };
</script>

<img src={token.emoji} alt={token.name} class="inline-block w-[1em] h-[1em]" />
