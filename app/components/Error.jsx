import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'grommet/components/Toast';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <Toast>
            <h1>Something went wrong.</h1>
          </Toast>
          {children}
        </React.Fragment>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
};
