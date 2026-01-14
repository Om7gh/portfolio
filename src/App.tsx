import { Header, Navbar, Npc, IPhoneHeader, IPhoneNavbar } from '@component';
import {
    EducationWindow,
    GallaryWindow,
    ProjectsWindow,
    ResumeWindow,
    SkillsWindow,
} from './pages';
import { useIsMobile } from './hooks/useIsMobile';
import { useEffect } from 'react';

function App() {
    const isMobile = useIsMobile();

    useEffect(() => {
        document.title = "omar ghazi -- Portfolio";
    }, []);
    
    return (
        <div id="App" className={`flex justify-between flex-col ${isMobile ? 'iphone-frame' : ''}`}>
            {isMobile ? <IPhoneHeader /> : <Header />}
            {!isMobile && <Npc />}
            <ProjectsWindow />
            <SkillsWindow />
            <GallaryWindow />
            <EducationWindow />
            <ResumeWindow />
            {isMobile ? <IPhoneNavbar /> : <Navbar />}
        </div>
    );
}

export default App;
