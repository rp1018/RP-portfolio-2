'use client';

import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { Maximize2, X, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/content';
import FlexCarousel from '@/components/react-bits/FlexCarousel/FlexCarousel';
import { Paper } from '@/components/collage/Paper';
import { MaskHeadline } from '@/components/ui/TextReveal';
import { useMediaQuery } from '@/lib/useMediaQuery';

export default function Work() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const carouselItems = PROJECTS.map((p) => ({
    src: `${p.src}?v=5`,
    alt: p.alt || p.title,
    title: p.title,
    subtitle: p.subtitle,
    link: p.link,
  }));

  const activeProject = PROJECTS[selectedIndex] || PROJECTS[0];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

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

          {/* Active project CTA (Desktop only) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="block font-sans text-xs text-[var(--ink-dim)]">
                Active Focus
              </span>
              <span className="font-semibold text-sm text-[var(--ink)]">
                {activeProject.title}
              </span>
            </div>

            {/* View Full Image Lightbox button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full font-sans text-xs font-medium border border-[var(--line)] bg-[var(--bg-elev)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-all cursor-pointer shadow-sm active:scale-95"
              title="Open full uncropped preview"
            >
              <Maximize2 size={13} />
              <span>View Full Image</span>
            </button>

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

        {/* FlexCarousel Stage: fit="natural" keeps exact screenshot aspect ratio with 0 cropping */}
        <div className="relative">
          <div
            className="relative w-full rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--bg-card)] shadow-2xl touch-pan-y"
            style={{ height: isMobile ? '280px' : 'clamp(460px, 60vh, 580px)' }}
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
              preset="ribbon"
              intro="rise"
              fit="natural"
              cardHeight={isMobile ? 0.72 : 0.65}
              lensHeight={1.0}
              lensWidth={1.0}
              gap={isMobile ? 14 : 22}
              radius={14}
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
              <span className="font-mono text-xs text-[#16131C]/60">
                0{selectedIndex + 1} / 0{PROJECTS.length}
              </span>
              <span className="font-sans text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/[0.05] border border-black/10 text-[#16131C]/80">
                {activeProject.subtitle.split('·')[0].trim()}
              </span>
            </div>
            <h3 className="font-sans font-bold text-xl text-[var(--paper-ink)] mb-1">
              {activeProject.title}
            </h3>
            {activeProject.tagline && (
              <p className="font-sans text-xs font-medium text-[#16131C]/85 mb-1.5 italic">
                {activeProject.tagline}
              </p>
            )}
            <p className="font-sans text-xs text-[#16131C]/65 mb-3">
              {activeProject.subtitle}
            </p>
            <p className="text-sm text-[#16131C]/85 leading-relaxed mb-4">
              {activeProject.description}
            </p>

            <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                {/* Mobile Full Preview Button */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans font-medium border border-black/15 bg-black/[0.04] text-[#16131C] hover:bg-black/[0.09] active:scale-95 transition-all cursor-pointer"
                >
                  <Maximize2 size={13} />
                  <span>View Full Image</span>
                </button>

                {activeProject.link && activeProject.link !== '#' && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium bg-[#16131C] text-[#F2F1EE] shadow hover:bg-black active:scale-95 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visit Live</span>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                  </a>
                )}
              </div>

              <span className="font-sans text-[11px] text-[#16131C]/50">
                Swipe carousel to change
              </span>
            </div>
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

        {/* Desktop View: 3 columns grid with quick-expand action */}
        <div className="hidden md:grid mt-10 grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className="relative cursor-pointer group"
            >
              <Paper
                className={`p-6 rounded-xl border transition-all duration-300 h-full flex flex-col justify-between ${
                  selectedIndex === idx
                    ? 'ring-2 ring-[var(--ink)] shadow-xl'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#16131C]/60">
                      0{idx + 1} / 0{PROJECTS.length}
                    </span>
                    <span className="font-sans text-[11px] font-medium px-2 py-0.5 rounded bg-black/[0.05] border border-black/10 text-[#16131C]/80">
                      {project.subtitle.split('·')[0].trim()}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[var(--paper-ink)] mb-1">
                    {project.title}
                  </h3>
                  {project.tagline && (
                    <p className="font-sans text-xs font-medium text-[#16131C]/85 mb-1.5 italic">
                      {project.tagline}
                    </p>
                  )}
                  <p className="font-sans text-xs text-[#16131C]/65 mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-[#16131C]/80 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-sans font-medium text-[#16131C]/80 hover:text-[#16131C] hover:bg-black/[0.06] transition-colors cursor-pointer"
                  >
                    <Maximize2 size={12} />
                    <span>View Full Image</span>
                  </button>

                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#16131C] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Live App</span>
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} />
                    </a>
                  )}
                </div>
              </Paper>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Uncropped Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full flex flex-col items-center bg-[var(--bg-card)] rounded-2xl border border-[var(--line)] shadow-2xl overflow-hidden p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-[var(--line)]">
              <div>
                <span className="font-mono text-xs text-[var(--ink-faint)]">
                  View Full Image
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)]">
                  {activeProject.title}
                </h3>
                {activeProject.tagline && (
                  <p className="text-xs font-medium text-[var(--ink-dim)] mt-0.5">
                    {activeProject.tagline}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {activeProject.link && activeProject.link !== '#' && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--ink)] text-[var(--bg)] hover:opacity-90 transition-opacity"
                  >
                    <span>Visit Repository</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 rounded-full bg-[var(--bg-elev)] hover:bg-[var(--ink)] hover:text-[var(--bg)] text-[var(--ink)] transition-colors cursor-pointer"
                  aria-label="Close uncropped preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Uncropped Image Container */}
            <div className="w-full flex items-center justify-center overflow-auto max-h-[70vh] rounded-xl bg-[var(--bg)] p-2 border border-[var(--line)]">
              <img
                src={activeProject.src}
                alt={activeProject.alt || activeProject.title}
                className="max-h-[66vh] max-w-full object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="w-full pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--ink-dim)]">
              <p className="max-w-3xl leading-relaxed">
                {activeProject.fullDescription || activeProject.description}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                  Press ESC to close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
