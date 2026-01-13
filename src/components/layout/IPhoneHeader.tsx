import { useEffect, useState } from 'react';
import { FaWifi, FaSignal, FaBatteryFull } from 'react-icons/fa6';

function IPhoneHeader() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime();
        const id = setInterval(updateTime, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="iphone-status-bar bg-slate-950/50 w-full h-12 flex items-center justify-between px-6 py-2">
            <div className="flex items-center">
                <span className="text-white font-semibold text-sm">
                    {currentTime}
                </span>
            </div>

            <div className="dynamic-island bg-black rounded-full w-28 h-7 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            <div className="flex items-center gap-1">
                <FaSignal className="w-4 h-4 text-white" />
                <FaWifi className="w-4 h-4 text-white" />
                <FaBatteryFull className="w-5 h-5 text-white" />
            </div>
        </div>
    );
}

export default IPhoneHeader;
