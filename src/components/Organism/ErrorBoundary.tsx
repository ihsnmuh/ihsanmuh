import React, { Component, ErrorInfo, ReactNode } from 'react';

import SanMascotLazy from '@/components/Atoms/svg/SanMascotLazy';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex min-h-screen items-center justify-center bg-canvas px-4'>
          <div className='max-w-md text-center'>
            <SanMascotLazy
              immediate
              mood='dizzy'
              size={132}
              animated
              className='mx-auto mb-6'
              ariaLabel='San feeling dizzy'
            />
            <p className='mb-3 font-mono text-xs uppercase tracking-widest text-danger'>
              Unexpected error
            </p>
            <h1 className='font-primary text-3xl font-bold tracking-tight text-ink sm:text-4xl'>
              Something went wrong
            </h1>
            <p className='mx-auto mt-4 mb-6 leading-relaxed text-body'>
              We&apos;re sorry, but something unexpected happened. The error has
              been logged and we&apos;ll look into it.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mb-6 text-left'>
                <summary className='mb-2 cursor-pointer text-sm text-muted'>
                  Error Details (Development only)
                </summary>
                <pre className='overflow-auto rounded-md border border-hairline bg-subtle p-4 text-xs text-body'>
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <button
                type='button'
                onClick={this.handleReset}
                className='inline-flex select-none items-center rounded-md bg-cta px-5 py-2.5 text-sm font-medium text-cta-fg transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-cta-hover active:scale-[0.98]'
              >
                Back to Home
              </button>
              <button
                type='button'
                onClick={() => window.location.reload()}
                className='inline-flex select-none items-center rounded-md border border-hairline-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-subtle active:scale-[0.98]'
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
