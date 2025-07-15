import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Capture error and info for logging or debugging
    this.setState({ error, errorInfo });
    // Example: Log to an error reporting service (e.g., Sentry, LogRocket)
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // You can replace console.error with an actual logging service integration
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#d32f2f' }}>
          <h1>Oops! Something went wrong.</h1>
          <p>Please try refreshing the page or contact support if the issue persists.</p>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
