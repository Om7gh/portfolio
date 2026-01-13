import {
    Fastify,
    Git,
    Github,
    Javascript,
    MySQL,
    Nextjs,
    Nodejs,
    React,
    SQLite,
    Tailwindcss,
} from '@/components/icons';
import SkillsNpc from '@/components/npc/SkillsNpc';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Skills() {
    const isMobile = useIsMobile();
    
    return (
        <div className="flex items-center justify-center">
            <div className={`flex w-full max-w-5xl flex-col items-center justify-center gap-6 ${isMobile ? '' : 'md:flex-row md:items-start md:gap-10'}`}>
                <div className={`text-slate-50 flex flex-wrap items-center justify-center gap-3 ${isMobile ? 'gap-2' : 'gap-5'}`}>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <Javascript size={isMobile ? '40' : '55'} />
                    </div>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <React size={isMobile ? '40' : '55'} />
                    </div>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <Tailwindcss size={isMobile ? '40' : '55'} />
                    </div>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <Nodejs size={isMobile ? '40' : '55'} />
                    </div>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <Fastify size={isMobile ? '40' : '55'} />
                    </div>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <Nextjs size={isMobile ? '40' : '55'} />
                    </div>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <Git size={isMobile ? '40' : '55'} />
                    </div>
                    <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <Github size={isMobile ? '40' : '55'} />
                    </div>
                     <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <MySQL size={isMobile ? '40' : '55'} />
                    </div> <div className={`bg-slate-800/60 p-3 rounded-xl shadow-xl shadow-black/20 ${isMobile ? 'p-2' : ''}`}>
                        <SQLite size={isMobile ? '40' : '55'} />
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-4">
                    {
                        !isMobile &&
                        <p className={`bg-slate-800/60 rounded-2xl p-5 text-slate-100 ${isMobile ? 'text-base p-4' : 'md:p-6 text-xl'}`}>
                        I can build anything using this stack
                    </p>
                    }

                    {!isMobile && (
                        <div className="flex items-start justify-center w-full">
                            <div className="w-[min(320px,80vw)]">
                                <SkillsNpc />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
