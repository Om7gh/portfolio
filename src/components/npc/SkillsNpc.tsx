import { useEffect, useState } from 'react';
import { hacker1, hacker2, hacker3, hacker4, hacker5, hacker6 } from '@assets';
const frames = [hacker1, hacker2, hacker3, hacker4, hacker5, hacker6];

type TalkerProps = {
    alt?: string;
    intervalMs?: number;
    className?: string;
};

function SkillsNpc({ alt = 'NPC', intervalMs = 800, className }: TalkerProps) {
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
            />
        </div>
    );
}

export default SkillsNpc;
