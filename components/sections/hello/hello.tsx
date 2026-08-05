'use client';

import { CSSProperties, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { useGSAP } from '@gsap/react';
import { ReactQRCode } from '@lglab/react-qr-code';
import gsap from 'gsap';
import tinycolor from 'tinycolor2';

import { Button } from '@/components/ui/button';
import { LOADING_SCREEN_HIDDEN } from '@/components/common/loading-screen/loading-screen';
import PaperTexture from '@/public/assets/images/paper.webp';

import { isLoadingScreenHidden, mediaQueryMatches } from '@/lib/dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/theme';

import { Link } from '@/i18n/navigation';

const PHONE = '+54 11 3926 9165';
const EMAIL = 'FELIPESARACHO02@GMAIL.COM';

// Easter egg: this is the on-screen QR only. The printed card's QR is what
// points at /hello?theme=, and "Agregar contacto" is the real contact path.
const QR_VALUE = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// Coordinate space for the QR svg and its embedded logo. The svg scales to the
// card via CSS, so these are ratios in practice: logo stays at 25% of the code.
const QR_SIZE = 192;
const QR_LOGO_SIZE = 48;

// Real card stock is ~0.3mm, which lands under a pixel here, so the edge is
// exaggerated enough to survive the tilt.
const CARD_THICKNESS = 6;

// The four side faces of the card, each hinged on its own border and folded
// back so the box closes behind the front face. Both sides of a strip look the
// same, so depth sorting alone decides which one shows — that keeps this
// correct for whatever angles CARD_POSE ends up using.
const CARD_EDGES = [
  // Left and right run the full height, so they carry the same vertical gradient
  {
    className: 'from-(--hex) top-0 right-0 h-full bg-linear-to-b',
    style: {
      width: CARD_THICKNESS,
      transformOrigin: '100% 50%',
      transform: 'rotateY(-90deg)',
    },
  },
  {
    className: 'from-(--hex) top-0 left-0 h-full bg-linear-to-b',
    style: {
      width: CARD_THICKNESS,
      transformOrigin: '0% 50%',
      transform: 'rotateY(90deg)',
    },
  },
  // Top and bottom are thin strips: a solid colour taken from their end of the
  // gradient, since a vertical gradient squeezed into 3px reads as a smear
  {
    className: 'bg-(--hex) top-0 left-0 w-full',
    style: {
      height: CARD_THICKNESS,
      transformOrigin: '50% 0%',
      transform: 'rotateX(-90deg)',
    },
  },
  {
    className: 'bottom-0 left-0 w-full bg-white',
    style: {
      height: CARD_THICKNESS,
      transformOrigin: '50% 100%',
      transform: 'rotateX(90deg)',
    },
  },
];

// Resting attitude: a card caught mid-float, per the reference photo.
// Keep every angle within -180..180: the tween starts from 0, so 319 would
// spin the long way round instead of tilting 41deg back.
const CARD_POSE = {
  opacity: 1,
  rotateX: 13,
  rotateY: -25,
  rotate: 13,
  scale: 1,
  y: -16,
  transformPerspective: 900,
};

const Hello = () => {
  const container = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const t = useTranslations('Hello');
  const { hexCode } = useTheme();

  const themeHex = `#${hexCode || '000000'}`;

  useGSAP(
    () => {
      gsap.set(card.current, { opacity: 0, y: 0 });
      gsap.set(content.current, { opacity: 0, y: 0 });

      const reveal = () =>
        gsap
          .timeline()
          .to(content.current, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          })
          .to(
            card.current,
            {
              ...CARD_POSE,
              duration: 1.2,
              ease: 'power3.out',
            },
            '>-0.3',
          )
          // Idle levitation, oscillating around the pose it just landed on.
          // Two loops on deliberately mismatched periods so they keep drifting
          // out of phase instead of settling into a mechanical bob.
          .to(card.current, {
            y: CARD_POSE.y - 10,
            duration: 2.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          .to(
            card.current,
            {
              rotateY: CARD_POSE.rotateY + 5,
              duration: 3.7,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            },
            '<',
          );

      if (mediaQueryMatches('(prefers-reduced-motion: reduce)')) {
        gsap.set(card.current, CARD_POSE);
        gsap.set(content.current, { opacity: 1, y: 0 });
        return;
      }

      // Already gone (client-side nav back to this route): reveal now
      if (isLoadingScreenHidden()) {
        reveal();
        return;
      }

      window.addEventListener(LOADING_SCREEN_HIDDEN, reveal, { once: true });
      return () => window.removeEventListener(LOADING_SCREEN_HIDDEN, reveal);
    },
    { scope: container },
  );

  return (
    <main
      className='flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6 py-16'
      style={
        {
          '--hex': `#${hexCode}`,
        } as CSSProperties
      }
      ref={container}
    >
      {/* @container so every measure below scales from the card's own width,
          keeping the printed 192x336 proportions at any rendered size.
          Nothing here may use cqw itself: an element's container units resolve
          against its nearest *ancestor* container, so they would fall back to
          the viewport. Everything sized in cqw lives in the wrapper below. */}
      {/* preserve-3d, and deliberately no filter here: a filter would flatten
          the 3D context and collapse the edges back into the face */}
      <div
        className='relative aspect-192/336 w-[min(58vw,200px)] transform-3d'
        ref={card}
      >
        {CARD_EDGES.map(({ className, style }) => (
          <div
            className={cn('absolute brightness-90', className)}
            key={className}
            style={style}
          />
        ))}

        <div
          className='@container absolute inset-0 overflow-hidden bg-linear-to-b from-(--hex)'
          style={{
            // drop-shadow tracks the element's real silhouette, so the tilt
            // needs no projection math.
            // ponytail: the shadow tilts with the card instead of landing on
            // the floor. If that reads wrong, swap for an unrotated sibling
            // with a compressed scaleY + blur.
            filter: 'drop-shadow(0 48px 30px hsl(var(--palette-900) / 0.28))',
          }}
        >
          <Image
            src={PaperTexture}
            alt='Paper'
            fill
            className='object-cover opacity-80 mix-blend-multiply brightness-110'
          />

          <div className='font-neue flex size-full flex-col p-[5.2cqw] text-black'>
            <ReactQRCode
              value={QR_VALUE}
              size={QR_SIZE}
              // H because the embedded logo excavates modules
              level='H'
              marginSize={0}
              background='transparent'
              dataModulesSettings={{ style: 'circle' }}
              imageSettings={{
                src: '/assets/images/qr-logo.webp',
                width: QR_LOGO_SIZE,
                height: QR_LOGO_SIZE,
                excavate: true,
              }}
              svgProps={{ className: 'h-auto w-full' }}
            />

            {/* Not <p>: globals.css restyles every p to font-archivo uppercase */}
            <div className='mt-[4cqw] flex flex-col leading-tight'>
              <span className='text-[8.33cqw] font-bold uppercase'>
                Felipe Saracho
              </span>
              <span className='text-[5.21cqw] tracking-widest uppercase'>
                {t('role')}
              </span>
            </div>

            <div className='mt-auto flex flex-col text-right text-[5.21cqw] tracking-wide'>
              <span className='tabular-nums'>{PHONE}</span>
              <span>{EMAIL}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center gap-6' ref={content}>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='font-neue text-2xl font-semibold md:text-4xl'>
            {t('heading')}
          </h1>
          <p className='text-foreground-secondary text-lg normal-case md:text-xl'>
            {t('subheadingLine1')}
            <br />
            {t('subheadingLine2')}
          </p>
        </div>

        <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
          <Button asChild variant='outline' size='lg'>
            <Link replace href={`/?theme=${hexCode}`}>
              {t('browsePortfolio')}
            </Link>
          </Button>

          <Button
            asChild
            size='lg'
            className='bg-(--_theme) text-(--_theme-fg) hover:bg-(--_theme) hover:contrast-125'
            style={
              {
                '--_theme': themeHex,
                '--_theme-fg': tinycolor(themeHex).isLight()
                  ? 'black'
                  : 'white',
              } as React.CSSProperties
            }
          >
            <a href='/felipe-saracho.vcf' download>
              {t('addContact')}
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Hello;
