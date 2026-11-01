import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary, PageCrashFallback } from '@/components/ui/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<PageCrashFallback />}>
    <App />
  </ErrorBoundary>
)
