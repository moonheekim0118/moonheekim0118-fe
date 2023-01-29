import { Component, ReactNode, PropsWithChildren } from 'react';
import RuntimeError from './RuntimeError';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  fallback: () => ReactNode;
}

class ErrorBoundary extends Component<Props> {
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
