import { Header, Navbar, Npc } from '@component';
import {
    EducationWindow,
    GallaryWindow,
    ProjectsWindow,
    ResumeWindow,
    SkillsWindow,
} from './pages';
function App() {
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    return (
        <div id="App" className="flex justify-between flex-col">
            <Header />
            <Npc />
            <ProjectsWindow />
            <SkillsWindow />
            <GallaryWindow />
            <EducationWindow />
            <ResumeWindow />
            <Navbar />
        </div>
    );
}

export default App;
