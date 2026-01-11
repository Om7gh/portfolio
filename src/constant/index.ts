import type { WindowKey, WindowPosition, WindowSize } from '@/types';

const windowPositionCache = new Map<WindowKey, WindowPosition>();
const windowSizeCache = new Map<WindowKey, WindowSize>();
const windowMotion = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
};

export { windowPositionCache, windowSizeCache, windowMotion };
