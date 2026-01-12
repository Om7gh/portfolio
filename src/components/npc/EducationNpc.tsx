import { useEffect, useState } from 'react';
import { edu1, edu2, edu3, edu4, edu5, edu6, edu8, edu7 } from '@assets';
const frames = [edu1, edu2, edu3, edu4, edu5, edu6, edu7, edu8];

type EducationNpcProps = {
    alt?: string;
    intervalMs?: number;
    className?: string;
};

function EducationNpc({
    alt = 'NPC',
    intervalMs = 800,
    className,
}: EducationNpcProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            setFrame((prev) => (prev + 1) % frames.length);
        }, intervalMs);

        return () => window.clearInterval(id);
    }, [intervalMs]);

    return (
        <div className={className}>
            <img
                src={frames[frame]}
                alt={alt}
                className="w-full h-auto select-none object-cover"
                style={{ imageRendering: 'pixelated' }}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
            />
        </div>
    );
}

export default EducationNpc;
