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
        <div className='min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900'>
          <div className='text-center max-w-md'>
            <div className='text-6xl mb-4'>⚠️</div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
              Something went wrong
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              We're sorry, but something unexpected happened. The error has been
              logged and we'll look into it.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mb-6 text-left'>
                <summary className='cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2'>
                  Error Details (Development only)
                </summary>
                <pre className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs overflow-auto'>
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className='flex gap-4 justify-center'>
              <button
                onClick={this.handleReset}
                className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
              >
                Go Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className='inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
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
