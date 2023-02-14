import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

const strictEntries = <T extends Record<string, any>>(
	object: T
): [keyof T, T[keyof T]][] => {
	return Object.entries(object);
};

const spaceBase = {
	none: 0,
	tiny: '1rem',
	small: '2rem',
	medium: '4rem',
	large: '8rem'
};

const space = {
	...spaceBase,
	...Object.fromEntries(
		strictEntries(spaceBase).map(([key, value]) => [`-${key}`, `-${value}`])
	)
} as typeof spaceBase & {
	[P in keyof typeof spaceBase as `-${P}`]: (typeof spaceBase)[P];
};

export const sprinkles = createSprinkles(
	defineProperties({
		properties: {
			gap: space,
			margin: space,
			marginLeft: space,
			marginRight: space,
			padding: space
		},
		shorthands: {
			marginX: ['marginLeft', 'marginRight']
		}
	}),
	defineProperties({
		properties: {
			fontSize: {
				small: '0.7rem',
				medium: '1rem',
				large: '1.3rem'
			}
		}
	})
);
