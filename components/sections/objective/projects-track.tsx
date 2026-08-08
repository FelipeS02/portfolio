import ProjectCard from './project-card';
import { PROJECTS } from './projects';

export const PROJECTS_TRACK_ID = 'objective-projects-track';

/**
 * Desktop: an absolutely positioned row of viewport-wide panels that GSAP pans
 * horizontally inside the pinned section. `-left-4` cancels the section's `px-4`
 * so each panel lines up with the viewport instead of the padded content box.
 *
 * Mobile: a plain vertical stack that scrolls with the document.
 */
const ProjectsTrack = () => (
  <div
    id={PROJECTS_TRACK_ID}
    className='flex w-full flex-col gap-18 max-md:mt-20 md:absolute md:top-0 md:bottom-0 md:-left-4 md:w-max md:flex-row md:gap-0 md:will-change-transform'
  >
    {PROJECTS.map((project, index) => (
      <ProjectCard
        key={project.id}
        project={project}
        reverse={index % 2 === 1}
      />
    ))}
  </div>
);

export default ProjectsTrack;
