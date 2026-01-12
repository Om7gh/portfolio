import { myResume } from '@assets';

export default function Resume() {
    return (
        <div className="text-slate-50 h-full">
            <object
                data={myResume}
                type="application/pdf"
                className="h-full w-full"
            ></object>
        </div>
    );
}
