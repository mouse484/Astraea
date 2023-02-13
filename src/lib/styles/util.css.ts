import { style } from '@vanilla-extract/css';
import { sprinkles } from './sprinkles.css';

export const flexClass = style([{ display: 'flex' }]);

export const buttonClass = style({
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	outline: 'none',
	padding: 0,
	appearance: 'none'
});
