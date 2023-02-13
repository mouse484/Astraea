import { style } from '@vanilla-extract/css';
import { sprinkles } from './sprinkles.css';

export const appClass = style([
	{
		maxWidth: '100%'
	},
	sprinkles({ padding: 'small' })
]);
