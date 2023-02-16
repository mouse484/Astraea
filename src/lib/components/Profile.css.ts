import { sprinkles } from '$lib/styles/sprinkles.css';
import { flexClass } from '$lib/styles/util.css';
import { style } from '@vanilla-extract/css';

export const profileClass = style([flexClass]);

export const iconClass = style([
	{
		width: '3rem',
		height: '3rem',
		borderRadius: '50%'
	},
	sprinkles({ marginRight: 'tiny' })
]);

export const userNameClass = style({ fontWeight: 'bold' });

export const nip05Class = sprinkles({ fontSize: 'small' });
