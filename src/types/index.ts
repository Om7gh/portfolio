import type { PropsWithChildren } from 'react';

type WindowKey = number;

type WindowFrameProps = PropsWithChildren<{
    winKey: WindowKey;
    title?: string;
    widthClassName?: string;
    heightClassName?: string;
}>;

type WindowPosition = { x: number; y: number };
type EducationItem = {
    title: string;
    school: string;
    years: string;
    highlights?: string;
};

type WindowSize = { width: number; height: number };

type WindowChild = {
    name: string;
    type: 'video' | 'file';
    videoPath?: string;
    readmePath?: string;
    zIndex: number;
    isOpen: boolean;
    content?: string;
};

type WindowItem = {
    name: string;
    type: 'folder' | 'file' | 'video';
    zIndex: number;
    isOpen: boolean;
    children?: WindowChild[];
    videoPath?: string;
};

export {
    WindowPosition,
    WindowSize,
    WindowFrameProps,
    WindowKey,
    EducationItem,
    WindowChild,
    WindowItem,
};
