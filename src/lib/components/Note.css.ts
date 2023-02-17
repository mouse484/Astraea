import { sprinkles } from '$lib/styles/sprinkles.css';
import { flexClass, roundedClass } from '$lib/styles/util.css';
import { style } from '@vanilla-extract/css';

export const noteClass = style([
	roundedClass,
	{ border: 'solid', maxWidth: '50%' },
	sprinkles({ marginY: 'tiny', marginX: 'auto', padding: 'tiny' })
]);

export const descriptionClass = style([
	flexClass,
	{ justifyContent: 'space-between' }
]);

export const createdAtClass = sprinkles({ fontSize: 'small' });
