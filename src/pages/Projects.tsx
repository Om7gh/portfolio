import { folder, videoIcon, violetFolder } from '@assets';
import { usePorfolio } from '@/store/usePortfolio';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsArrowLeftSquareFill } from 'react-icons/bs';

const projectFolders = [
    {
        name: 'WorldWise App',
        icon: violetFolder,
        childIndex: 0,
    },
    {
        name: 'Pong-Chess App',
        icon: folder,
        childIndex: 1,
    },
];

export default function Projects() {
    const { windows } = usePorfolio();
    const projectWindow = windows[0];
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<
        number | null
    >(null);

    const handleFolderClick = (childIndex: number) => {
        setSelectedProjectIndex(childIndex);
    };

    const handleBack = () => {
        setSelectedProjectIndex(null);
    };

    if (
        selectedProjectIndex !== null &&
        projectWindow?.children?.[selectedProjectIndex]
    ) {
        const selectedProject = projectWindow.children[selectedProjectIndex];
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full"
            >
                <button
                    onClick={handleBack}
                    className="text-4xl text-slate-900 bg-slate-100 rounded-xl"
                >
                    <BsArrowLeftSquareFill />
                </button>

                <h3 className="text-center text-2xl font-semibold text-slate-950 bg-slate-200/40 shadow-xl shadow-slate-950/40 w-fit m-auto mb-10 px-4 py-2 rounded-xl">
                    {selectedProject.name}
                </h3>

                <div className=" flex flex-col items-center justify-center gap-6 w-full">
                    {selectedProject.children?.map(
                        (item: any, index: number) => (
                            <div key={index} className="">
                                {item.type === 'video' ? (
                                    <div className="">
                                        <h2 className="text-slate-200 text-2xl p-2 font-semibold bg-slate-950 rounded-t-2xl  flex items-center gap-2 justify-center">
                                            <img
                                                src={videoIcon}
                                                alt="icon"
                                                className="w-8 h-8"
                                            />
                                            {item.name}
                                        </h2>
                                        <div className="">
                                            <video
                                                controls
                                                autoPlay
                                                loop
                                                className="w-full h-full"
                                                src={item.videoPath}
                                            >
                                                Your browser does not support
                                                the video tag.
                                            </video>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-fit flex justify-center flex-col bg-slate-950/50 text-slate-100 rounded-xl">
                                        <h2 className="bg-slate-950/80 mb-5 p-4 text-center text-lg">
                                            {item.name}
                                        </h2>
                                        <div className="text-left mb-5 p-4  text-lg">
                                            <pre className="">
                                                {item.content}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ),
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <div className="relative h-full w-full p-6 overflow-hidden">
            <div className="flex flex-wrap gap-10 mx-6">
                {projectFolders.map((folder) => (
                    <div
                        key={folder.name}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                        onClick={() => handleFolderClick(folder.childIndex)}
                    >
                        <div className="w-20 h-20 flex items-center justify-center transition-transform group-hover:scale-110">
                            <img
                                src={folder.icon}
                                alt={folder.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-slate-100 text-sm text-center group-hover:text-blue-400 transition-colors">
                            {folder.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
