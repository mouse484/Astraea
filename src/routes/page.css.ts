import { sprinkles } from '$lib/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const inputClass = style({ width: '100%' });

export const mainClass = style([sprinkles({ marginTop: 'medium' })]);
