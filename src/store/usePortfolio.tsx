import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { windows, zIndex } from '../data';

interface WindChildren {
    name: string;
    type: string;
    zIndex: number;
    isOpen: boolean;
    children?: any[];
    videoPath?: string;
    content?: string;
}

interface WindowType {
    isOpen: boolean;
    zIndex: number;
    name: string;
    type: string;
    children?: WindChildren[];
}

interface Store {
    windows: WindowType[];
    nextZIndex: number;
    openWindow: (winKey: number) => void;
    closeWindow: (winKey: number) => void;
    focusWindow: (winKey: number) => void;
    openChild: (winKey: number, childKey: number, subChildKey?: number) => void;
    closeChild: (
        winKey: number,
        childKey: number,
        subChildKey?: number,
    ) => void;
    getChild: (winKey: number, childKey: number, subChildKey?: number) => any;
}

const usePorfolio = create<Store>()(
    immer((set, get) => ({
        windows,
        nextZIndex: zIndex + 1,

        openWindow: (winKey: number) =>
            set((state: any) => {
                const win = state.windows[winKey];
                if (win) {
                    win.isOpen = true;
                    win.zIndex = state.nextZIndex;
                    state.nextZIndex++;
                }
            }),

        openChild: (winKey: number, childKey: number, subChildKey?: number) =>
            set((state: any) => {
                const win = state.windows[winKey];
                if (!win || !win.children) return;

                if (subChildKey !== undefined) {
                    // Open sub-child (video or readme inside a folder)
                    const child = win.children[childKey];
                    if (child && child.children) {
                        const subChild = child.children[subChildKey];
                        if (subChild) {
                            subChild.isOpen = true;
                            subChild.zIndex = state.nextZIndex;
                            state.nextZIndex++;
                        }
                    }
                } else {
                    const child = win.children[childKey];
                    if (child) {
                        child.isOpen = true;
                        child.zIndex = state.nextZIndex;
                        state.nextZIndex++;
                    }
                }
            }),

        closeChild: (winKey: number, childKey: number, subChildKey?: number) =>
            set((state: any) => {
                const win = state.windows[winKey];
                if (!win || !win.children) return;

                if (subChildKey !== undefined) {
                    const child = win.children[childKey];
                    if (child && child.children) {
                        const subChild = child.children[subChildKey];
                        if (subChild) {
                            subChild.isOpen = false;
                            subChild.zIndex = zIndex;
                        }
                    }
                } else {
                    const child = win.children[childKey];
                    if (child) {
                        child.isOpen = false;
                        child.zIndex = zIndex;

                        if (child.children) {
                            child.children.forEach((subChild: any) => {
                                subChild.isOpen = false;
                                subChild.zIndex = zIndex;
                            });
                        }
                    }
                }
            }),

        getChild: (winKey: number, childKey: number, subChildKey?: number) => {
            const state = get();
            const win = state.windows[winKey];
            if (!win || !win.children) return null;

            if (subChildKey !== undefined) {
                const child = win.children[childKey];
                if (child && child.children) {
                    return child.children[subChildKey];
                }
            } else {
                return win.children[childKey];
            }
            return null;
        },

        closeWindow: (winKey: number) =>
            set((state: any) => {
                const win = state.windows[winKey];
                if (win) {
                    win.isOpen = false;
                    win.zIndex = zIndex;
                }
            }),

        focusWindow: (winKey: number) =>
            set((state: any) => {
                const win = state.windows[winKey];
                if (win) {
                    win.zIndex = state.nextZIndex++;
                }
            }),
    })),
);

export { usePorfolio };
