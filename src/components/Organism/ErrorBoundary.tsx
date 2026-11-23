import React, { Component, ErrorInfo, ReactNode } from 'react';

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
        <div className='min-h-screen flex items-center justify-center px-4 bg-desk'>
          <div className='text-center max-w-md'>
            <div className='text-6xl mb-4'>⚠️</div>
            <h1 className='text-3xl font-bold text-deep-moss font-primary mb-4'>
              Something went wrong
            </h1>
            <p className='text-olive-char font-ui mb-6'>
              We're sorry, but something unexpected happened. The error has been
              logged and we'll look into it.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mb-6 text-left'>
                <summary className='cursor-pointer text-sm text-sage-gray mb-2'>
                  Error Details (Development only)
                </summary>
                <pre className='p-4 bg-soft-linen border border-hairline rounded-xs text-xs overflow-auto'>
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className='flex gap-4 justify-center'>
              <button
                onClick={this.handleReset}
                className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium font-ui rounded-[4px] text-deep-moss bg-amber-glow hover:bg-dark-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-blue focus-visible:ring-offset-2 transition-colors'
              >
                Go Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className='inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-desk focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
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
