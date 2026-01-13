import {
    createElement,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ComponentType,
} from 'react';
import { usePorfolio } from '@/store/usePortfolio';
import type { WindowFrameProps, WindowPosition, WindowSize } from '@/types';
import { windowMotion, windowPositionCache, windowSizeCache } from '@/constant';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { IoChevronBack } from 'react-icons/io5';

function WindowFrame({
    winKey,
    title,
    widthClassName = 'min-w-[min(1024px,92vw)]',
    heightClassName = 'min-h-[min(720px,90vh)]',
    children,
}: WindowFrameProps) {
    const { windows, closeWindow, focusWindow } = usePorfolio();
    const win = windows[winKey];
    const isMobile = useIsMobile();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const draggingRef = useRef<{
        pointerId: number;
        offsetX: number;
        offsetY: number;
    } | null>(null);

    const resizingRef = useRef<{
        pointerId: number;
        dir: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
        startX: number;
        startY: number;
        startLeft: number;
        startTop: number;
        startRight: number;
        startBottom: number;
        startWidth: number;
        startHeight: number;
    } | null>(null);

    const initialPos = useMemo<WindowPosition>(() => {
        const cached = windowPositionCache.get(winKey);
        if (cached) return cached;

        const width = Math.min(720, window.innerWidth * 0.92);
        const height = Math.min(520, window.innerHeight * 0.7);
        return {
            x: Math.max(0, (window.innerWidth - width) / 2),
            y: Math.max(0, (window.innerHeight - height) / 2),
        };
    }, [winKey]);

    const initialSize = useMemo<WindowSize>(() => {
        const cached = windowSizeCache.get(winKey);
        if (cached) return cached;

        return {
            width: Math.min(720, window.innerWidth * 0.92),
            height: Math.min(520, window.innerHeight * 0.7),
        };
    }, [winKey]);

    const [pos, setPos] = useState<WindowPosition>(initialPos);
    const [size, setSize] = useState<WindowSize>(initialSize);

    useEffect(() => {
        windowPositionCache.set(winKey, pos);
    }, [pos, winKey]);

    useEffect(() => {
        windowSizeCache.set(winKey, size);
    }, [size, winKey]);

    if (!win) return null;

    const clampToViewport = (next: WindowPosition) => {
        const el = containerRef.current;
        const width = el?.offsetWidth ?? 0;
        const height = el?.offsetHeight ?? 0;
        return {
            x: Math.max(0, Math.min(window.innerWidth - width, next.x)),
            y: Math.max(0, Math.min(window.innerHeight - height, next.y)),
        };
    };

    const clampResizeToViewport = (next: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }) => {
        const minWidth = 360;
        const minHeight = 220;

        let left = next.left;
        let top = next.top;
        let right = next.right;
        let bottom = next.bottom;

        if (right - left < minWidth) {
            const width = right - left;
            const missing = minWidth - width;
            left -= missing;
        }

        if (bottom - top < minHeight) {
            const height = bottom - top;
            const missing = minHeight - height;
            top -= missing;
        }

        // Clamp to viewport.
        left = Math.max(0, Math.min(left, window.innerWidth - minWidth));
        top = Math.max(0, Math.min(top, window.innerHeight - minHeight));
        right = Math.max(left + minWidth, Math.min(right, window.innerWidth));
        bottom = Math.max(
            top + minHeight,
            Math.min(bottom, window.innerHeight),
        );

        return {
            pos: { x: left, y: top } satisfies WindowPosition,
            size: {
                width: right - left,
                height: bottom - top,
            } satisfies WindowSize,
        };
    };

    const onPointerDownTitleBar = (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        focusWindow(winKey);

        const el = containerRef.current;
        if (!el) return;

        el.setPointerCapture(e.pointerId);

        const rect = el.getBoundingClientRect();
        draggingRef.current = {
            pointerId: e.pointerId,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
        };
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const resizing = resizingRef.current;
        if (resizing && resizing.pointerId === e.pointerId) {
            const dx = e.clientX - resizing.startX;
            const dy = e.clientY - resizing.startY;

            let nextLeft = resizing.startLeft;
            let nextTop = resizing.startTop;
            let nextRight = resizing.startRight;
            let nextBottom = resizing.startBottom;

            if (resizing.dir.includes('w')) nextLeft = resizing.startLeft + dx;
            if (resizing.dir.includes('e'))
                nextRight = resizing.startRight + dx;
            if (resizing.dir.includes('n')) nextTop = resizing.startTop + dy;
            if (resizing.dir.includes('s'))
                nextBottom = resizing.startBottom + dy;

            const minWidth = 360;
            const minHeight = 220;

            if (nextRight - nextLeft < minWidth) {
                if (resizing.dir.includes('w') && !resizing.dir.includes('e')) {
                    nextLeft = nextRight - minWidth;
                } else {
                    nextRight = nextLeft + minWidth;
                }
            }

            if (nextBottom - nextTop < minHeight) {
                if (resizing.dir.includes('n') && !resizing.dir.includes('s')) {
                    nextTop = nextBottom - minHeight;
                } else {
                    nextBottom = nextTop + minHeight;
                }
            }

            const clamped = clampResizeToViewport({
                left: nextLeft,
                top: nextTop,
                right: nextRight,
                bottom: nextBottom,
            });

            setPos(clamped.pos);
            setSize(clamped.size);
            return;
        }

        const dragging = draggingRef.current;
        if (!dragging || dragging.pointerId !== e.pointerId) return;

        setPos(
            clampToViewport({
                x: e.clientX - dragging.offsetX,
                y: e.clientY - dragging.offsetY,
            }),
        );
    };

    const onPointerUp = (e: React.PointerEvent) => {
        const resizing = resizingRef.current;
        if (resizing && resizing.pointerId === e.pointerId) {
            resizingRef.current = null;
            try {
                containerRef.current?.releasePointerCapture(e.pointerId);
            } catch {
                // no need
            }
            return;
        }

        const dragging = draggingRef.current;
        if (!dragging || dragging.pointerId !== e.pointerId) return;
        draggingRef.current = null;
        try {
            containerRef.current?.releasePointerCapture(e.pointerId);
        } catch {
            // no need
        }
    };

    const onPointerDownResizeHandle =
        (dir: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw') =>
        (e: React.PointerEvent) => {
            if (e.button !== 0) return;
            e.stopPropagation();
            focusWindow(winKey);

            const el = containerRef.current;
            if (!el) return;

            el.setPointerCapture(e.pointerId);

            const left = pos.x;
            const top = pos.y;
            const right = pos.x + size.width;
            const bottom = pos.y + size.height;

            resizingRef.current = {
                pointerId: e.pointerId,
                dir,
                startX: e.clientX,
                startY: e.clientY,
                startLeft: left,
                startTop: top,
                startRight: right,
                startBottom: bottom,
                startWidth: size.width,
                startHeight: size.height,
            };
        };

    // Mobile iPhone-style window
    if (isMobile) {
        return (
            <AnimatePresence>
                {win.isOpen && (
                    <motion.div
                        key={`mobile-${winKey}`}
                        variants={{
                            initial: { x: '100%', opacity: 0 },
                            animate: { x: 0, opacity: 1 },
                            exit: { x: '100%', opacity: 0 },
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed h-full z-10000 top-10 left-0 right-0 bg-slate-950/95 backdrop-blur-xl z-50 flex flex-col"
                    >
                        <div className="h-14 px-4 flex items-center justify-between bg-slate-900/80 border-b border-slate-700/50 safe-area-top">
                            <button
                                type="button"
                                className="flex items-center gap-1 text-blue-400 active:opacity-70"
                                onClick={() => closeWindow(winKey)}
                            >
                                <IoChevronBack className="w-6 h-6" />
                                <span className="text-base">Back</span>
                            </button>
                            <p className="text-slate-50 font-semibold capitalize text-lg">
                                {title ?? win.name}
                            </p>
                            <div className="w-16" />
                        </div>

                        <div className="flex-1 overflow-auto p-4 pb-40">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    // Desktop Mac OS-style window
    return (
        <AnimatePresence>
            {win.isOpen && (
                <motion.div
                    key={winKey}
                    ref={containerRef}
                    variants={windowMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`absolute rounded-2xl overflow-hidden bg-slate-950/60 backdrop-blur-xl shadow-xl shadow-black/30 ${widthClassName} ${heightClassName}`}
                    style={{
                        zIndex: win.zIndex,
                        left: pos.x,
                        top: pos.y,
                        width: size.width,
                        height: size.height,
                    }}
                    onMouseDown={() => focusWindow(winKey)}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    <div
                        className="h-12 px-4 flex items-center justify-between bg-slate-950/60 select-none cursor-move"
                        onPointerDown={onPointerDownTitleBar}
                    >
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Close"
                                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
                                onPointerDown={(e) => {
                                    e.stopPropagation();
                                }}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeWindow(winKey);
                                }}
                            />
                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                            <div className="w-3 h-3 rounded-full bg-slate-600/50" />
                        </div>

                        <p className="text-slate-50 font-semibold capitalize">
                            {title ?? win.name}
                        </p>

                        <div className="w-12" />
                    </div>

                    <div className="p-4 h-[calc(100%-3rem)] overflow-auto">
                        {children}
                    </div>

                    {/* Resize handles (invisible) */}
                    {/* Corners */}
                    <div
                        className="absolute left-0 top-0 w-3 h-3 cursor-nwse-resize"
                        onPointerDown={onPointerDownResizeHandle('nw')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <div
                        className="absolute right-0 top-0 w-3 h-3 cursor-nesw-resize"
                        onPointerDown={onPointerDownResizeHandle('ne')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <div
                        className="absolute left-0 bottom-0 w-3 h-3 cursor-nesw-resize"
                        onPointerDown={onPointerDownResizeHandle('sw')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <div
                        className="absolute right-0 bottom-0 w-3 h-3 cursor-nwse-resize"
                        onPointerDown={onPointerDownResizeHandle('se')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />

                    {/* Edges */}
                    <div
                        className="absolute left-0 top-3 bottom-3 w-2 cursor-ew-resize"
                        onPointerDown={onPointerDownResizeHandle('w')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <div
                        className="absolute right-0 top-3 bottom-3 w-2 cursor-ew-resize"
                        onPointerDown={onPointerDownResizeHandle('e')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <div
                        className="absolute top-0 left-3 right-3 h-2 cursor-ns-resize"
                        onPointerDown={onPointerDownResizeHandle('n')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                    <div
                        className="absolute bottom-0 left-3 right-3 h-2 cursor-ns-resize"
                        onPointerDown={onPointerDownResizeHandle('s')}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function withWindow<P extends object>(
    Component: ComponentType<P>,
    options: Omit<WindowFrameProps, 'children'>,
) {
    function Windowed(props: P) {
        return (
            <WindowFrame {...options}>
                {createElement(Component, props)}
            </WindowFrame>
        );
    }

    Windowed.displayName = `withWindow(${Component.displayName ?? Component.name ?? 'Component'})`;
    return Windowed;
}

export { WindowFrame };
