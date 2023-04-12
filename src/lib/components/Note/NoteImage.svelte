<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	export let src: string;
	export let alt: string;

	let popup = false;
</script>

<div class="mt-2">
	<button
		on:click={() => (popup = !popup)}
		use:clickoutside
		on:clickoutside={() => (popup = false)}
	>
		<img
			{src}
			{alt}
			class={`border rounded ${popup ? 'fixed inset-0 m-auto max-h-full max-w-[80%]' : 'h-32'}`}
		/>
	</button>
</div>
