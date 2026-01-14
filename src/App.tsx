import { Header, Navbar, Npc, IPhoneHeader, IPhoneNavbar } from '@component';
import {
    EducationWindow,
    GallaryWindow,
    ProjectsWindow,
    ResumeWindow,
    SkillsWindow,
    Loading,
} from './pages';
import { useIsMobile } from './hooks/useIsMobile';
import { useEffect, useState } from 'react';
import { usePorfolio } from './store/usePortfolio';

function App() {
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(true);
    const {isVisited} = usePorfolio()

    useEffect(() => {
        document.title = "omar ghazi -- Portfolio";
    }, []);

    if (isLoading && !isVisited) {
        return <Loading onLoadingComplete={() => setIsLoading(false)} />
    }
    
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
