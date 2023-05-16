<script lang="ts">
	export let disabled = false;
</script>

<button on:click class="btn btn-info" {disabled}>
	<slot />
</button>
