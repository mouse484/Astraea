<script lang="ts">
	export let src: string;
	export let alt: string;

	let modal: { showModal(): void };
</script>

<button class="w-4/5 md:w-full md:max-w-md" on:click={() => modal.showModal()}>
	<img {src} {alt} />
</button>
<dialog bind:this={modal} class="modal">
	<form method="dialog" class="modal-box">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
		<img class="pt-4" {src} {alt} />
	</form>
</dialog>

<!-- <div class="mt-2">
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
</div> -->
