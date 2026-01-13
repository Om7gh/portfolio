import Talker from '@/components/npc/Talker';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Gallary() {
    const isMobile = useIsMobile();
    return (
        <div className={`h-full w-full grid gap-3 items-center ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            <div className={`bg-slate-800/60 rounded-2xl text-slate-100 ${isMobile ? 'p-4' : 'p-5 md:p-6'}`}>
                <h2 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'}`}>
                    Hi, I’m Omar — Web & Full‑Stack Developer
                </h2>
                <p className={`mt-3 text-slate-200 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
                    I build interactive, responsive web applications and
                    real-time interfaces using React, TypeScript, Node, and
                    modern web tools.
                </p>
                <p className={`mt-3 text-slate-200 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
                    I care about clean UI, solid performance, and scalable code.
                </p>
            </div>
            {!isMobile && (
                <div className="flex items-center justify-center">
                    <div className="w-[min(320px,80vw)]">
                        <Talker />
                    </div>
                </div>
            )}
        </div>
    );
}
