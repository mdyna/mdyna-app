import React from 'react';
import PropTypes from 'prop-types';
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
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <div className={cx('error-boundary', closed && 'closed')}>
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ErrorBoundary.defaultProps = {
  children: [],
};
