import type { MilkdownPlugin } from '@milkdown/ctx';
import { $remark } from '@milkdown/utils';

import remarkBreaks from 'remark-breaks';
import remarkImages from 'remark-images';

export const plugins: MilkdownPlugin[] = [
	$remark('remarkBreaks', () => remarkBreaks),
	$remark('remarkImage', () => remarkImages)
].flat();
