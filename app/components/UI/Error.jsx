import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Alert } from 'grommet-icons';

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
      toast.error(
        <React.Fragment>
          <Alert />
          Something Went Wrong
        </React.Fragment>,
      );
      return <React.Fragment>{children}</React.Fragment>;
    }

    return children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ErrorBoundary.defaultProps = {
  children: [],
};
