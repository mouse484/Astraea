import { sprinkles } from '$lib/styles/sprinkles.css';
import { flexClass } from '$lib/styles/util.css';
import { style } from '@vanilla-extract/css';

export const headerClass = style([flexClass]);

export const itemsClass = style([
	flexClass,
	sprinkles({ gap: 'small' }),
	{ marginLeft: 'auto' }
]);
