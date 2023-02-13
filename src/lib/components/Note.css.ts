import { sprinkles } from '$lib/styles/sprinkles.css';
import { flexClass } from '$lib/styles/util.css';
import { style } from '@vanilla-extract/css';

export const descriptionClass = style([
	flexClass,
	sprinkles({ gap: 'tiny', fontSize: 'small' }),
	{
		flexWrap: 'wrap',
		alignItems: 'center',
		whiteSpace: 'nowrap'
	}
]);
