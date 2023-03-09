<script lang="ts">
	import type { PageData } from './$types';
	import type { response } from './+page';

	export let data: PageData;

	let { hexId } = data as response;
</script>

{hexId}
