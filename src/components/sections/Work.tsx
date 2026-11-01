'use client';

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { PROJECTS } from '@/data/content';
import FlexCarousel from '@/components/react-bits/FlexCarousel/FlexCarousel';
import { Paper } from '@/components/collage/Paper';
import { MaskHeadline } from '@/components/ui/TextReveal';
import { useMediaQuery } from '@/lib/useMediaQuery';

export default function Work() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const carouselItems = PROJECTS.map((p) => ({
    src: `${p.src}?v=3`,
    alt: p.alt || p.title,
    title: p.title,
    subtitle: p.subtitle,
    link: p.link,
  }));

  const activeProject = PROJECTS[selectedIndex] || PROJECTS[0];

  return (
    <section
      id="work"
      className="relative section-rhythm bg-[var(--bg)]"
      aria-label="Selected Projects"
    >
      <div className="shell">
        {/* Hairline ABOVE eyebrow with 32px gap */}
        <div className="w-full h-px bg-[var(--line)] mb-8" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-14">
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--ink-faint)] mb-4">
              03 / Selected Work
            </span>
            <MaskHeadline
              lines={['Engineered Software & AI Systems']}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.035em] text-[var(--ink)]"
            />
            <p className="text-base sm:text-lg text-[var(--ink-dim)] max-w-[56ch] leading-relaxed mt-3">
              Production-focused applications emphasizing performance, real-time sync, and intelligent workflows.
            </p>
          </div>

          {/* Active project CTA (Desktop only — on mobile CTA sits cleanly inside project cards) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="block font-sans text-xs text-[var(--ink-dim)]">
                Active Focus
              </span>
              <span className="font-semibold text-sm text-[var(--ink)]">
                {activeProject.title}
              </span>
            </div>
            {activeProject.link && activeProject.link !== '#' ? (
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 h-10 px-5 rounded-full font-sans text-xs font-medium bg-[var(--ink)] text-[var(--bg)] shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Visit Live App</span>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 h-10 px-5 rounded-full font-sans text-xs text-[var(--ink-faint)] bg-[var(--bg-elev)] border border-[var(--line)]">
                Local / In Review
              </span>
            )}
          </div>
        </div>

        {/* FlexCarousel Stage: on mobile height is 280px, card fills the container with 0 tilt */}
        <div className="relative">
          <div
            className="relative w-full rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--bg-card)] shadow-2xl touch-pan-y"
            style={{ height: isMobile ? '280px' : 'clamp(460px, 60vh, 600px)' }}
          >
            {/* Paper grain backdrop texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden="true"
            />

            <FlexCarousel
              items={carouselItems}
              preset={isMobile ? 'ribbon' : 'liquid'}
              intro="rise"
              fit="landscape"
              cardHeight={isMobile ? 0.88 : 0.52}
              lensHeight={isMobile ? 1.0 : undefined}
              lensWidth={isMobile ? 1.0 : undefined}
              gap={isMobile ? 12 : 16}
              radius={16}
              squeeze={0}
              focusOnClick={true}
              captions={!isMobile}
              autoplay={false}
              captureWheel={false}
              onChange={(index: number) => setSelectedIndex(index)}
              onSelect={(_item: unknown, index: number) => setSelectedIndex(index)}
            />
          </div>
        </div>

        {/* Mobile View: Clean single focused project card right below carousel */}
        <div className="block md:hidden mt-6">
          <Paper className="p-6 rounded-2xl border border-[var(--line)] shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[var(--ink-faint)]">
                0{selectedIndex + 1} / 0{PROJECTS.length}
              </span>
              <span className="font-sans text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[var(--bg-elev)] border border-[var(--line)] text-[var(--ink-dim)]">
                {activeProject.subtitle.split('·')[0].trim()}
              </span>
            </div>
            <h3 className="font-sans font-bold text-xl text-[var(--paper-ink)] mb-1">
              {activeProject.title}
            </h3>
            <p className="font-sans text-xs text-[var(--ink-dim)] mb-3">
              {activeProject.subtitle}
            </p>
            <p className="text-sm text-[var(--paper-ink)]/80 leading-relaxed mb-4">
              {activeProject.description}
            </p>

            {activeProject.link && activeProject.link !== '#' && (
              <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium bg-[var(--paper-ink)] text-[var(--paper)] shadow hover:opacity-90 active:scale-95 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Visit Live App</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                </a>
                <span className="font-sans text-[11px] text-[var(--ink-faint)]">
                  Swipe carousel to change
                </span>
              </div>
            )}
          </Paper>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  selectedIndex === idx
                    ? 'w-6 bg-[var(--ink)]'
                    : 'w-2 bg-[var(--ink-faint)]/40 hover:bg-[var(--ink-faint)]'
                }`}
                aria-label={`Jump to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: 3 columns grid */}
        <div className="hidden md:grid mt-10 grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className="relative cursor-pointer group"
            >
              <Paper
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  selectedIndex === idx
                    ? 'ring-2 ring-[var(--ink)] shadow-xl'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[var(--ink-faint)]">
                    0{idx + 1} / 0{PROJECTS.length}
                  </span>
                  <span className="font-sans text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--bg-elev)] border border-[var(--line)]">
                    {project.subtitle.split('·')[0].trim()}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-[var(--paper-ink)] mb-1">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-[var(--ink-dim)] mb-3">
                  {project.subtitle}
                </p>
                <p className="text-xs text-[var(--paper-ink)]/80 leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.link && project.link !== '#' && (
                  <div className="pt-3 border-t border-[var(--line)]">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[var(--paper-ink)] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Visit Live App</span>
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} />
                    </a>
                  </div>
                )}
              </Paper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
