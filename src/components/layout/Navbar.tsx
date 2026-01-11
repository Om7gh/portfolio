import {
    finder,
    gallary,
    idle1,
    linkedIn,
    resume,
    Skills,
    github,
} from '@/assets';
import { usePorfolio } from '@/store/usePortfolio';
import { Tooltip } from 'react-tooltip';
const menu = [
    { id: 0, name: 'Projects', icon: finder },
    { id: 2, name: 'about me', icon: idle1 },
    { id: 1, name: 'skills', icon: gallary },
    { id: 3, name: 'education', icon: Skills },
    { id: 4, name: 'resume', icon: resume },
    {
        id: 5,
        name: 'linkedin',
        icon: linkedIn,
        link: 'https://www.linkedin.com/in/omar-ghazi0/',
    },
    {
        id: 5,
        name: 'github',
        icon: github,
        link: 'https://github.com/Om7gh',
    },
];

function Navbar() {
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
        <ul className="flex mx-auto mb-12 items-center justify-center gap-5 bg-slate-950/40 rounded-3xl px-6 py-2  shadow-xl shadow-black/20 backdrop-blur-xl">
            {menu.map((data, i) => (
                <div key={data.id} className="flex items-center">
                    {i === 4 && (
                        <div
                            className="h-10 mx-2 w-[0.3px] bg-slate-100/50"
                            aria-hidden="true"
                        />
                    )}
                    <li
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={data.name}
                        data-tooltip-place="top-start"
                        className="group cursor-pointer"
                        onClick={() => handleClick(data)}
                    >
                        <img
                            src={data.icon}
                            alt={data.name}
                            className="w-22 h-22 group-hover:scale-[1.4] group-hover:-translate-y-10 ease-in-out duration-150 object-contain"
                        />
                    </li>
                    <Tooltip id="my-tooltip" />
                </div>
            ))}
        </ul>
    );
}

export default Navbar;
