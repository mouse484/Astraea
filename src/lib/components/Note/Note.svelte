<script lang="ts">
	let { content }: { content: string } = $props();
</script>

<div class="m-2 p-2 border-solid border-blueGray rounded-md grid grid-cols-5">
	<div class="rounded-md size-16 bg-amber grid place-items-center">icon</div>
	<div class="col-span-4">
		<div>
			<div>Name <span class="text-sm">@id</span></div>
			<div class="text-sm">npub</div>
		</div>
		<div class="mt-4 break-all overflow-hidden hover:max-h-full max-h-8ch">{content}</div>
	</div>
</div>
