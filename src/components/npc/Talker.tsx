import { useEffect, useRef, useState } from 'react';
import {
    talker1,
    talker2,
    talker3,
    talker4,
    talker5,
    talker6,
    talker7,
    talker8,
} from '@assets';
const frames = [
    talker1,
    talker2,
    talker3,
    talker4,
    talker5,
    talker6,
    talker7,
    talker8,
];

type TalkerProps = {
    alt?: string;
    intervalMs?: number;
    className?: string;
};

function Talker({ alt = 'NPC', intervalMs = 600, className }: TalkerProps) {
    const [frame, setFrame] = useState(0);
    const frameRef = useRef(0)

    useEffect(() => {
        frameRef.current = window.setInterval(() => {
            setFrame((prev) => (prev + 1) % frames.length);
        }, intervalMs);

        return () => window.clearInterval(frameRef.current);
    }, [intervalMs]);
    return (
        <div className={className}>
            <img
                src={frames[frame]}
                alt={alt}
                className="w-full h-auto select-none object-cover"
                style={{ imageRendering: 'pixelated' }}
                draggable={false}
            />
        </div>
    );
}

export default Talker;
