import Talker from '@/components/npc/Talker';

export default function Gallary() {
    return (
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            <div className="bg-slate-800/60 rounded-2xl p-5 md:p-6 text-slate-100">
                <h2 className="text-xl md:text-2xl font-bold">
                    Hi, I’m Omar — Web & Full‑Stack Developer
                </h2>
                <p className="mt-3 text-slate-200 leading-relaxed">
                    I build interactive, responsive web applications and
                    real-time interfaces using React, TypeScript, Node, and
                    modern web tools.
                </p>
                <p className="mt-3 text-slate-200 leading-relaxed">
                    I care about clean UI, solid performance, and scalable code.
                </p>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-[min(320px,80vw)]">
                    <Talker />
                </div>
            </div>
        </div>
    );
}
