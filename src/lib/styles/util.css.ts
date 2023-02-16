import { style } from '@vanilla-extract/css';

export const flexClass = style([{ display: 'flex' }]);

export const buttonClass = style({
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	outline: 'none',
	padding: 0,
	appearance: 'none'
});

export const aTagResetClass = style({
	textDecoration: 'none',
	color: 'inherit'
});
