import { useEffect, useState } from 'react';
import { FaApple } from 'react-icons/fa6';
import { RiVolumeUpFill } from 'react-icons/ri';

function Menu() {
    return (
        <div className="flex items-center gap-4">
            <div>
                <FaApple className="w-6 h-6 text-slate-50" />
            </div>

            <ul className="capitalize flex items-center gap-4">
                <li className="cursor-pointer font-bold text-slate-50">
                    Omar ghazi
                </li>
                <li className="cursor-pointer text-slate-50">file</li>
                <li className="cursor-pointer text-slate-50">edit</li>
                <li className="cursor-pointer text-slate-50">view</li>
                <li className="cursor-pointer text-slate-50">go</li>
                <li className="cursor-pointer text-slate-50">window</li>
                <li className="cursor-pointer text-slate-50">help</li>
            </ul>
        </div>
    );
}

function LeftHeader() {
    const [openSound, setOpenSound] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const date = new Date();
    const days = ['Mon', 'thu', 'wed', 'thus', 'fri', 'sat', 'sun'];
    const day = days[date.getDay() - 1];
    const hour = date.getHours();
    const minute =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentTime(`${day} ${hour}:${minute}`);
        }, 1000);
        return () => clearInterval(id);
    }, [date]);

    return (
        <div className="flex items-center gap-5">
            <div className="relative">
                <RiVolumeUpFill
                    className="w-6 h-6 text-slate-50 cursor-pointer"
                    onClick={() => setOpenSound(!openSound)}
                />
                {openSound && (
                    <input
                        type="range"
                        className="absolute -left-5 border-none h-10"
                    />
                )}
            </div>
            <p className="text-slate-50 font-bold text-md cursor-pointer">
                {currentTime}
            </p>
        </div>
    );
}

function Header() {
    return (
        <div className="w-full h-12 bg-slate-950/60 backdrop-blur-xl flex items-center justify-between px-6 py-3 shadow-xl shadow-black/10">
            <Menu />
            <LeftHeader />
        </div>
    );
}

export default Header;
