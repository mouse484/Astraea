import { sprinkles } from '$lib/styles/sprinkles.css';
import { flexClass, roundedClass } from '$lib/styles/util.css';
import { style } from '@vanilla-extract/css';

const noteClass = style([
	roundedClass,
	{ border: 'solid' },
	sprinkles({
		marginX: 'auto',
		padding: 'tiny',
		width: {
			mobile: '100%',
			desktop: '50%'
		}
	})
]);

export const defaultNoteClass = style([
	noteClass,
	sprinkles({ marginBottom: 'tiny' })
]);

export const withReplayNoteClass = style([
	noteClass,
	style({ borderBottom: 'none' }),
	sprinkles({ marginBottom: 'none' })
]);

export const descriptionClass = style([
	flexClass,
	{ justifyContent: 'space-between' }
]);

export const createdAtClass = sprinkles({ fontSize: 'small' });

export const contentClass = style([
	{
		width: '100%',
		maxHeight: '8rem',
		overflow: 'clip',
		transition: 'max-height 4s linear',
		':hover': {
			maxHeight: '100%',
			transitionDuration: '1s'
		}
	},
	sprinkles({ marginTop: 'tiny' })
]);

export const contentImageClass = style({
	boxSizing: 'border-box',
	width: '100%'
});
