import { Header, Navbar, Npc, IPhoneHeader, IPhoneNavbar } from '@component';
import {
    EducationWindow,
    GallaryWindow,
    ProjectsWindow,
    ResumeWindow,
    SkillsWindow,
} from './pages';
import { useIsMobile } from './hooks/useIsMobile';

function App() {
    const isMobile = useIsMobile();
    
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
