import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** What to show if the children crash. Defaults to nothing (section is skipped). */
  fallback?: ReactNode;
  /** Optional hook, e.g. to switch to a simpler version of the UI. */
  onError?: (error: Error) => void;
};

type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

/** Last-resort full-page fallback so the site never shows a blank screen. */
export function PageCrashFallback() {
  return (
    <div
      role="alert"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
        textAlign: 'center',
        background: 'var(--bg)',
        color: 'var(--ink)',
      }}
    >
      <p style={{ fontSize: 18, fontWeight: 600 }}>Something went wrong.</p>
      <button
        onClick={() => window.location.reload()}
        style={{
          height: 44,
          padding: '0 24px',
          borderRadius: 999,
          border: '1px solid var(--line)',
          background: 'transparent',
          color: 'var(--ink)',
          cursor: 'pointer',
        }}
      >
        Reload page
      </button>
    </div>
  );
}
