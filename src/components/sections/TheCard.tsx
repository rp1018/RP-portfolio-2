'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SITE } from '@/data/content';
import { getCardTextures } from '@/lib/cardTextures';
import Lanyard from '@/components/react-bits/Lanyard/Lanyard';
import FlipCard from '@/components/react-bits/FlipCard/FlipCard';
import { useThemeTokens } from '@/lib/theme';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { MaskHeadline } from '@/components/ui/TextReveal';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function TheCard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tokens = useThemeTokens();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [textures, setTextures] = useState<{
    frontImage: string;
    backImage: string;
    strapImage: string;
  } | null>(null);

  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    // Check WebGL2 support & reduced motion
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        return !!gl;
      } catch {
        return false;
      }
    };

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!checkWebGL() || prefersReducedMotion) {
      setUseFallback(true);
    }

    // Load textures (force fresh evaluation)
    getCardTextures(true)
      .then(setTextures)
      .catch((err) => {
        console.error(err);
        setUseFallback(true);
      });

    // Lazy load when at least 15% visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePointerInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <section
      id="card"
      ref={sectionRef}
      className="relative section-rhythm min-h-[100svh] bg-[var(--bg)] overflow-hidden"
      aria-label="The Interactive Credential"
      onPointerDown={handlePointerInteraction}
    >
      <div className="shell flex flex-col items-center">
        {/* Hairline ABOVE eyebrow with 32px gap */}
        <div className="w-full h-px bg-[var(--line)] mb-8" />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 z-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--ink-faint)] mb-4">
            02 / The Credential
          </span>
          <MaskHeadline
            lines={['The Interactive Credential']}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.035em] text-[var(--ink)] mb-4"
          />
          <p className="text-base text-[var(--ink-dim)] max-w-[56ch] leading-relaxed mb-6">
            Physics-driven 3D ID badge with interactive tension strap and verification matrix.
          </p>

          {/* Hint chip */}
          <div
            className={`transition-opacity duration-700 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-elev)] border border-[var(--line)] font-sans text-xs text-[var(--ink-dim)] ${
              hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <span>Drag badge to inspect. Tension physics enabled.</span>
          </div>
        </div>

        {/* Card Stage: height min(86svh, 820px) */}
        <div
          className="w-full relative flex items-center justify-center"
          style={{ height: 'min(86svh, 820px)' }}
        >
          {useFallback ? (
            /* Fallback FlipCard */
            <div className="flex items-center justify-center my-auto">
              <FlipCard
                width={340}
                height={500}
                radius={24}
                axis="y"
                trigger="click"
                theme={tokens.theme}
                frontContent={
                  textures ? (
                    <img
                      src={textures.frontImage}
                      alt="Rithick Prasath ID Badge Front"
                      className="w-full h-full object-cover rounded-[24px]"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F2F1EE] text-[#16131C] p-6 rounded-[24px] flex flex-col justify-between">
                      <div className="font-sans text-xs font-semibold">RP / ID</div>
                      <div className="font-bold text-xl">Rithick Prasath</div>
                      <div className="font-sans text-xs text-stone-500">B.Tech CSE '28</div>
                    </div>
                  )
                }
                backContent={
                  textures ? (
                    <img
                      src={textures.backImage}
                      alt="Rithick Prasath ID Badge Back"
                      className="w-full h-full object-cover rounded-[24px]"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F2F1EE] text-[#16131C] p-6 rounded-[24px] flex flex-col justify-between">
                      <div className="font-sans text-xs uppercase font-bold">Contact Matrix</div>
                      <div className="space-y-1 font-sans text-xs">
                        <div>Email: {SITE.email}</div>
                        <div>GitHub: {SITE.github}</div>
                        <div>LinkedIn: {SITE.linkedin}</div>
                      </div>
                      <div className="font-sans text-[11px] text-stone-500">Tamil Nadu, India</div>
                    </div>
                  )
                }
              />
            </div>
          ) : isVisible && textures ? (
            /* Interactive Three.js Physics Lanyard with resolved token colors */
            <ErrorBoundary onError={() => setUseFallback(true)}>
            <Lanyard
              frontImage={textures.frontImage}
              backImage={textures.backImage}
              strapImage={textures.strapImage}
              size={isMobile ? 0.52 : 0.62}
              strapLength={isMobile ? 0.28 : 0.24}
              transparent={true}
              theme={tokens.lanyard.theme}
              cardColor={tokens.lanyard.cardColor}
              strapColor={tokens.lanyard.strapColor}
              imageFit="cover"
              fov={isMobile ? 32 : 24}
              friction={0.96}
              stiffness={0.06}
              damping={0.88}
              mass={1.4}
              tension={0.7}
              throwPower={4}
              restitution={0.2}
              enableTurn={true}
              enableTilt={true}
              dragMode="physics"
              className="w-full h-full"
            />
            </ErrorBoundary>
          ) : (
            /* Skeleton while loading */
            <div className="w-[340px] h-[500px] rounded-[24px] bg-[var(--bg-elev)] border border-[var(--line)] animate-pulse flex items-center justify-center">
              <span className="font-sans text-xs text-[var(--ink-faint)]">
                Loading Credential...
              </span>
            </div>
          )}
        </div>

        {/* Accessible HTML Contact List */}
        <div className="w-full max-w-xl mx-auto pt-16 pb-8">
          <details className="text-center font-sans text-xs text-[var(--ink-faint)]">
            <summary className="cursor-pointer hover:text-[var(--ink)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ink)] px-3 py-1.5 rounded-full border border-[var(--line)] inline-block">
              Accessible Card Data (Screen Readers)
            </summary>
            <div className="mt-4 p-6 rounded-2xl bg-[var(--bg-elev)] border border-[var(--line)] text-left space-y-2 text-[var(--ink-dim)]">
              <p className="font-bold text-[var(--ink)]">Rithick Prasath — Student ID Credential</p>
              <p>Program: B.Tech Computer Science & Engineering (Class of 2028)</p>
              <p>Institution: Bharath University, Tamil Nadu, India</p>
              <p>Email: {SITE.email}</p>
              <p>LinkedIn: {SITE.linkedin}</p>
              <p>GitHub: {SITE.github}</p>
              <p>Location: {SITE.location}</p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
