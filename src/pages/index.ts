import withWindow from '@/components/HOC';
import Skills from './Skills';
import Gallary from './Gallary';
import Education from './Education';
import Resume from './Resume';
import Projects from './Projects';

export const ProjectsWindow = withWindow(Projects, {
    winKey: 0,
    title: 'projects',
});
export const SkillsWindow = withWindow(Skills, { winKey: 1, title: 'skills' });
export const GallaryWindow = withWindow(Gallary, {
    winKey: 2,
    title: 'About me',
});
export const EducationWindow = withWindow(Education, {
    winKey: 3,
    title: 'education',
});
export const ResumeWindow = withWindow(Resume, { winKey: 4, title: 'resume' });
