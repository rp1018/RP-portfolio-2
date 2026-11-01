import { ThemeProvider } from '@/lib/theme';
import { SmoothScrollProvider } from '@/lib/lenis';
import { IntroProvider } from '@/lib/introContext';
import { IntroSequence } from '@/components/ui/IntroSequence';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import AboutStack from '@/components/sections/AboutStack';
import TheCard from '@/components/sections/TheCard';
import Work from '@/components/sections/Work';
import Learning from '@/components/sections/Learning';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { TornDivider } from '@/components/collage/TornDivider';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <IntroProvider>
          <IntroSequence />
          <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper-ink)]">
            <ErrorBoundary><Navbar /></ErrorBoundary>
            <main id="main-content">
              <ErrorBoundary><Hero /></ErrorBoundary>
              <ErrorBoundary><Statement /></ErrorBoundary>
              <ErrorBoundary><AboutStack /></ErrorBoundary>
              {/* Subtle torn divider before The Card */}
              <TornDivider />
              <ErrorBoundary><TheCard /></ErrorBoundary>
              {/* Subtle torn divider after The Card */}
              <TornDivider flip={true} />
              <ErrorBoundary><Work /></ErrorBoundary>
              <ErrorBoundary><Learning /></ErrorBoundary>
              <ErrorBoundary><Contact /></ErrorBoundary>
            </main>
            <ErrorBoundary><Footer /></ErrorBoundary>
          </div>
        </IntroProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
