import {
    finder,
    skill_icon,
    idle1,
    linkedIn,
    resume,
    github,
    education_icon
} from '@/assets';
import { usePorfolio } from '@/store/usePortfolio';

const menu = [
    { id: 0, name: 'Projects', icon: finder },
    { id: 2, name: 'About', icon: idle1 },
    { id: 1, name: 'Skills', icon: skill_icon },
    { id: 3, name: 'Education', icon: education_icon },
    { id: 4, name: 'Resume', icon: resume },
    {
        id: 5,
        name: 'LinkedIn',
        icon: linkedIn,
        link: 'https://www.linkedin.com/in/omar-ghazi0/',
    },
    {
        id: 5,
        name: 'GitHub',
        icon: github,
        link: 'https://github.com/Om7gh',
    },
];

function IPhoneNavbar() {
    const { openWindow, focusWindow, windows } = usePorfolio();

    const handleClick = (item: (typeof menu)[number]) => {
        if (item.link) {
            window.open(item.link, '_blank');
            return;
        }

        const win = windows[item.id];
        if (!win) return;

        if (win.isOpen) {
            focusWindow(item.id);
        } else {
            openWindow(item.id);
        }
    };

    return (
        <div className="iphone-dock fixed bottom-0 left-0 right-0 z-40 px-3 pb-2 pt-1">
            {/* Home indicator */}
            <div className="grid grid-cols-4 gap-3 bg-slate-950/50 backdrop-blur-xl rounded-3xl p-3">
                {menu.slice(0, 4).map((data) => (
                    <button
                        key={`${data.id}-${data.name}`}
                        className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
                        onClick={() => handleClick(data)}
                    >
                        <div className="w-14 h-14 rounded-xl bg-slate-800/60 flex items-center justify-center shadow-lg">
                            <img
                                src={data.icon}
                                alt={data.name}
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                        <span className="text-white text-[10px] font-medium">
                            {data.name}
                        </span>
                    </button>
                ))}
            </div>
            
            {/* Second row for additional items */}
            <div className="grid grid-cols-4 gap-3 bg-slate-950/50 backdrop-blur-xl rounded-3xl p-3 mt-2">
                {menu.slice(4).map((data, index) => (
                    <button
                        key={`${data.id}-${data.name}-${index}`}
                        className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
                        onClick={() => handleClick(data)}
                    >
                        <div className="w-14 h-14 rounded-xl bg-slate-800/60 flex items-center justify-center shadow-lg">
                            <img
                                src={data.icon}
                                alt={data.name}
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                        <span className="text-white text-[10px] font-medium">
                            {data.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Home indicator bar */}
            <div className="flex justify-center mt-2 pb-1">
                <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
        </div>
    );
}

export default IPhoneNavbar;
