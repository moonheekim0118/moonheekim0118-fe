import { Component, ReactNode } from 'react';
import RuntimeError from './RuntimeError';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  fallback: () => ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  public state: State = {
    hasError: false,
    fallback: RuntimeError,
  };

  public static getDerivedStateFromError(error: { fallback: () => ReactNode }): State {
    return { hasError: true, fallback: error.fallback };
  }

  public render() {
    if (this.state.hasError) return this.state.fallback();

    return this.props.children;
  }
}

export default ErrorBoundary;
