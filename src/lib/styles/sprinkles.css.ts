import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
	),
	auto: 'auto'
} as typeof spaceBase & {
	[P in keyof typeof spaceBase as `-${P}`]: (typeof spaceBase)[P];
} & { auto: 'auto' };

const spaces = defineProperties({
	properties: {
		gap: space,
		margin: space,
		marginTop: space,
		marginBottom: space,
		marginLeft: space,
		marginRight: space,
		padding: space
	},
	shorthands: {
		marginY: ['marginTop', 'marginBottom'],
		marginX: ['marginLeft', 'marginRight']
	}
});

const responsive = defineProperties({
	conditions: {
		mobile: {},
		desktop: { '@media': 'screen and (min-width: 768px)' }
	},
	defaultCondition: 'mobile',
	properties: {
		width: ['none', '100%', '50%']
	}
});
export const sprinkles = createSprinkles(
	spaces,
	responsive,
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
