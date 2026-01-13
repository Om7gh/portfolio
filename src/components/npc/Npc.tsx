import { useState, useEffect, useRef } from 'react';
import { frame1, frame2, frame3, frame4, frame5, frame6 } from '@assets';

const frames = [frame6, frame5, frame4, frame3, frame2, frame1];

const randomQuotation = [
    'tla9 mni awld l3abd',
    'wa ta tla9 a sahbi',
    'ghankhroj lk mn screen',
    'tla9ani f dora',
];

export default function Npc() {
    const [frame, setFrame] = useState(0);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [flipped, setFlipped] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [alert, setAlert] = useState('');
    const frameRef = useRef(0)
    const moveInterval = useRef(0)
    const targetInterval = useRef(0)


    const velocity = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const dragOffset = useRef({ x: 0, y: 0 });
    const npcSize = { width: 32, height: 64 };

    const maxSpeed = 2;
    const acceleration = 0.05;
    const friction = 0.98;

    const pickNewTarget = () => {
        targetRef.current = {
            x: Math.random() * (window.innerWidth - npcSize.width),
            y: Math.random() * (window.innerHeight - npcSize.height - 100),
        };
    };

    useEffect(() => {
        pickNewTarget();
        frameRef.current = setInterval(() => {
            setFrame((prev) => (prev + 1) % frames.length);
        }, 100);

        moveInterval.current = setInterval(() => {
            if (isPaused || isDragging) return;
            setPosition((prev) => {
                const target = targetRef.current;
                const dx = target.x - prev.x;
                const dy = target.y - prev.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 30) {
                    pickNewTarget();
                }

                if (distance > 0) {
                    velocity.current.x += (dx / distance) * acceleration;
                    velocity.current.y += (dy / distance) * acceleration;
                }

                const currentSpeed = Math.sqrt(
                    velocity.current.x ** 2 + velocity.current.y ** 2,
                );
                if (currentSpeed > maxSpeed) {
                    velocity.current.x =
                        (velocity.current.x / currentSpeed) * maxSpeed;
                    velocity.current.y =
                        (velocity.current.y / currentSpeed) * maxSpeed;
                }

                velocity.current.x *= friction;
                velocity.current.y *= friction;

                if (Math.abs(velocity.current.x) > 0.1) {
                    setFlipped(velocity.current.x < 0);
                }

                const newX = prev.x + velocity.current.x;
                const newY = prev.y + velocity.current.y;

                return {
                    x: Math.max(
                        0,
                        Math.min(window.innerWidth - npcSize.width, newX),
                    ),
                    y: Math.max(
                        0,
                        Math.min(
                            window.innerHeight - npcSize.height - 100,
                            newY,
                        ),
                    ),
                };
            });
        }, 16);

        targetInterval.current = setInterval(
            () => {
                pickNewTarget();
            },
            3000 + Math.random() * 4000,
        );

        return () => {
            clearInterval(frameRef.current);
            clearInterval(moveInterval.current);
            clearInterval(targetInterval.current);
        };
    }, [isPaused, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setAlert('');
        setIsDragging(true);
        setIsPaused(true);
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        velocity.current = { x: 0, y: 0 };
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            setPosition({
                x: Math.max(
                    0,
                    Math.min(
                        window.innerWidth - npcSize.width,
                        e.clientX - dragOffset.current.x,
                    ),
                ),
                y: Math.max(
                    0,
                    Math.min(
                        window.innerHeight - npcSize.height - 100,
                        e.clientY - dragOffset.current.y,
                    ),
                ),
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setTimeout(() => {
                setIsPaused(false);
                pickNewTarget();
            }, 500);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseEnter = () => {
        setIsPaused(true);
        velocity.current = { x: 0, y: 0 };
        setAlert(
            randomQuotation[Math.floor(Math.random() * randomQuotation.length)],
        );
    };

    const handleMouseLeave = () => {
        if (!isDragging) {
            setIsPaused(false);
            setAlert('');
        }
    };

    return (
        <>
            {alert.length > 0 && (
                <p
                    className="bg-slate-950/80 text-slate-200 p-3 rounded-xl text-center max-w-[min(360px,80vw)] whitespace-normal"
                    style={{
                        position: 'fixed',
                        left: position.x + npcSize.width / 2,
                        top: position.y - 50,
                        transform: 'translateX(-50%)',
                        zIndex: 51,
                    }}
                >
                    {alert}
                </p>
            )}
            <img
                src={frames[frame]}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                alt="NPC"
                className="object-cover"
                style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    width: npcSize.width,
                    height: npcSize.height,
                    imageRendering: 'pixelated',
                    transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
                    transition: 'transform 0.1s',
                    zIndex: 50,
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
            />
        </>
    );
}
