import { sprinkles } from '$lib/styles/sprinkles.css';
import { flex } from '$lib/styles/util.css';
import { style } from '@vanilla-extract/css';

export const descriptionClass = style([
	flex,
	sprinkles({ fontSize: 'small', gap: 'little' }),
	{
		flexWrap: 'wrap',
		alignItems: 'center',
		whiteSpace: 'nowrap'
	}
]);
