<script lang="ts">
	import {
		Editor,
		defaultValueCtx,
		editorViewOptionsCtx,
		rootAttrsCtx,
		rootCtx
	} from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';
	import { plugins } from './plugins';

	let {
		content,
		editable = true,
		editorClassList = ''
	}: {
		content: string;
		editable?: boolean;
		editorClassList?: string;
	} = $props();

	const makeEditor = (dom: HTMLElement) => {
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, content);
				ctx.update(rootAttrsCtx, (prev) => {
					return {
						...prev,
						class: `${prev.class ?? ''} h-full`
					};
				});
				ctx.update(editorViewOptionsCtx, (prev) => ({
					...prev,
					editable: () => editable,
					attributes: {
						...prev.attributes,
						class: [editorClassList, 'h-full outline-none'].join(' ')
					}
				}));
			})
			.use(commonmark)
			.use(gfm)
			.use(plugins)
			.create();
	};
</script>

<div use:makeEditor class="h-full"></div>
