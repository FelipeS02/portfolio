import { FC } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowButton } from '@/components/common/arrow-button';

import { getReadableForeground } from '@/lib/theme';
import { cn } from '@/lib/utils';

import { PROJECT_ICONS, TECHNOLOGY_LABELS } from './icons';
import { Project, ProjectMedia } from './projects';

/** Hook the animations provider uses to drag the figures against the pan */
export const PROJECT_FIGURE_CLASS = 'project-figure';

const Figure: FC<{ media: ProjectMedia }> = ({ media }) =>
  media.type === 'video' ? (
    <video
      className='size-full object-cover'
      src={media.src}
      poster={media.poster}
      aria-label={media.alt}
      autoPlay
      muted
      loop
      playsInline
      preload='metadata'
    />
  ) : (
    <Image
      className='object-cover'
      src={media.src}
      alt={media.alt}
      sizes='(max-width: 768px) 100vw, 60vw'
      // Panels are translated into view rather than scrolled into it, so the
      // lazy intersection would fire mid-animation
      loading='eager'
      fill
    />
  );

const ProjectCard = async function ProjectCard({
  project,
  reverse = false,
  className = '',
}: {
  project: Project;
  /** Zig-zags the title/CTA sides on mobile, where they'd otherwise all stack
   * flush left and read as a monotonous column */
  reverse?: boolean;
  className?: string;
}) {
  const t = await getTranslations('Objective');

  const { title, roleKey, color, technologies, href, media } = project;

  return (
    <article
      className={cn(
        'project-card flex shrink-0 flex-col justify-center max-md:w-full md:h-full md:w-screen md:px-[6vw]',
        className,
      )}
    >
      <div className='relative w-full md:mx-auto md:max-w-[1400px]'>
        <header className={cn('flex flex-col gap-1', reverse && "max-md:items-end")}>
          <p className='font-archivo text-foreground-secondary text-xs tracking-widest'>
            [{t(`roles.${roleKey}`)}]
          </p>
          <TooltipProvider delayDuration={150}>
            <ul className='z-3 flex items-center gap-2'>
              {technologies.map((key) => {
                const Icon = PROJECT_ICONS[key];
                const label = TECHNOLOGY_LABELS[key];

                return (
                  <li key={`${project.id}-${key}`}>
                    <Tooltip>
                      {/* A span rather than the default button: the icon is a
                          label, not an action, but it still has to be focusable
                          for the tooltip to open without a pointer */}
                      <TooltipTrigger asChild>
                        <span className='flex' tabIndex={0}>
                          <Icon
                            width={20}
                            height={20}
                            aria-hidden
                            className='text-muted-foreground hover:text-foreground'
                          />
                          <span className='sr-only'>{label}</span>
                        </span>
                      </TooltipTrigger>

                      <TooltipContent side='bottom'>{label}</TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </TooltipProvider>
        </header>

        <div className='relative md:-mt-2'>
          <h4
            className={cn(
              'text-foreground z-2 stroke-1 font-bold whitespace-nowrap uppercase max-md:text-[11vw] max-md:leading-none max-md:mt-1 md:absolute md:top-4 md:left-0 md:text-[6vw] md:leading-[0.8]',
              reverse ? 'max-md:text-right' : 'max-md:text-left',
            )}
          >
            {title}
          </h4>

          {/* The CTA lives in the media column so it right-aligns with the
              figure instead of the wider content box. The column starts left of
              where the title ends, which is what puts the title over the image */}
          <div className='md:ml-[25%] md:w-[60%]'>
            <figure
              className={cn(
                PROJECT_FIGURE_CLASS,
                'relative aspect-16/10 w-full overflow-hidden max-md:mt-4',
              )}
            >
              <Figure media={media} />
            </figure>

            {href ? (
              <div
                className={cn(
                  'mt-4 flex md:justify-end max-md:mt-4',
                  reverse ? 'max-md:justify-start' : 'max-md:justify-end',
                )}
              >
                <ArrowButton
                  as='a'
                  href={href}
                  target='_blank'
                  rel='noreferrer'
                  className='border-b-0 px-4 py-2 pr-2 uppercase *:max-md:text-sm'
                  style={{
                    backgroundColor: color,
                    color: getReadableForeground(color),
                  }}
                >
                  {t('viewProject')}
                </ArrowButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
