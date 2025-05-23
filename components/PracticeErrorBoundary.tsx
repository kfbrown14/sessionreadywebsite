import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class PracticeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Practice component error:', error, errorInfo);
    // You can log the error to an error reporting service here
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-mist via-lavender-light/30 to-sage-light/20 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-3xl shadow-medium p-10 max-w-md w-full text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-lavender-light rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                className="w-10 h-10 text-lavender-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </motion.div>
            
            <h2 className="font-secondary text-2xl font-bold text-earth-dark mb-3">
              Oops, something went wrong
            </h2>
            <p className="font-primary text-earth mb-6">
              We encountered an error while loading the practice session. Don't worry, this happens sometimes.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer font-primary text-sm text-sage hover:text-sage-dark transition-colors">
                  View error details
                </summary>
                <pre className="mt-3 text-xs text-earth-dark bg-mist p-4 rounded-xl overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            
            <motion.button
              onClick={this.handleReset}
              className="px-8 py-3 bg-sage text-white rounded-full font-primary font-semibold hover:bg-sage-dark transition-colors shadow-soft hover:shadow-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reload Page
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
} 