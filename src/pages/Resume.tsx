import { myResume } from '@assets';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Resume() {
    const isMobile = useIsMobile();
    
    return (
        <div className="text-slate-50 h-full flex flex-col">
            {isMobile && (
                <a 
                    href={myResume} 
                    download="Omar_Ghazi_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 bg-blue-500 text-white text-center py-3 px-4 rounded-xl font-semibold active:bg-blue-600"
                >
                    Download Resume (PDF)
                </a>
            )}
            <object
                data={myResume}
                type="application/pdf"
                className="h-full w-full flex-1"
            >
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-4">
                    <p className="text-slate-200">
                        Unable to display PDF. 
                    </p>
                    <a 
                        href={myResume} 
                        download="Omar_Ghazi_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Download Resume
                    </a>
                </div>
            </object>
        </div>
    );
}
