import EducationNpc from '@/components/npc/EducationNpc';
import { EducationItem } from '@/types';

const educationItems: EducationItem[] = [
    {
        title: 'Licence Degree — Physics / Electronics',
        school: 'Faculty of Science, Rabat (UM5)',
        years: '2018 — 2022',
    },
    {
        title: 'Computer Science',
        school: '1337 Coding School (UM6P)',
        years: '2022 — Present',
        highlights: 'Algorithms • C / C++ • Linux And More...',
    },
];

export default function Education() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 md:flex-row md:items-start md:gap-10">
                <div className="text-slate-50 flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        {educationItems.map((item) => (
                            <div
                                key={`${item.title}-${item.years}`}
                                className="bg-slate-800/60 p-4 rounded-xl  shadow-xl shadow-black/40"
                            >
                                <p className="text-slate-50 font-semibold">
                                    {item.title}
                                </p>
                                <p className="text-slate-200 mt-1">
                                    {item.school}
                                </p>
                                <p className="text-slate-300 text-sm mt-1">
                                    {item.years}
                                </p>
                                {item.highlights ? (
                                    <p className="text-slate-200 mt-3">
                                        {item.highlights}
                                    </p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-start justify-center w-full">
                    <div className="w-[min(320px,80vw)]">
                        <EducationNpc />
                    </div>
                </div>
            </div>
        </div>
    );
}
