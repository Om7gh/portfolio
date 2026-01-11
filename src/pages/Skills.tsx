import {
    Fastify,
    Git,
    Github,
    Javascript,
    Nextjs,
    Nodejs,
    React,
    Tailwindcss,
} from '@/components/icons';
import SkillsNpc from '@/components/npc/SkillsNpc';

export default function Skills() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:items-start md:gap-10">
                <div className="text-slate-50 flex flex-wrap items-center justify-center gap-5">
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <Javascript size={'55'} />
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <React size={'55'} />
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <Tailwindcss size={'55'} />
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <Nodejs size={'55'} />
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <Fastify size={'55'} />
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <Nextjs size={'55'} />
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <Git size={'55'} />
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20">
                        <Github size={'55'} />
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <p className="bg-slate-800/60 rounded-2xl p-5 md:p-6 text-xl text-slate-100">
                        I can build anything using this stack
                    </p>

                    <div className="flex items-start justify-center w-full">
                        <div className="w-[min(320px,80vw)]">
                            <SkillsNpc />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
