import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'grommet/components/Toast';
import cx from 'classnames';

import './Error.scss';

class ErrorBoundary extends React.Component {
  state = { hasError: false, closed: true };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
      closed: false,
    });
    setTimeout(() => this.closeToast(), 3000);
  }

  closeToast() {
    this.setState({
      closed: true,
    });
  }

  render() {
    const { hasError, closed } = this.state;
    const { children, whiteMode } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <div className={cx('error-boundary', whiteMode && 'white-mode', closed && 'closed')}>
            <h3>Something went wrong :(</h3>
          </div>
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
  whiteMode: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  whiteMode: false,
};
