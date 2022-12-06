import { Component } from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends Component {
  state = {
    renderError: null,
  };

  componentDidCatch(error) {
    this.setState({ renderError: error });
  }

  render() {
    const { renderError } = this.state;
    const { fallbackComponent: FallbackComponent } = this.props;

    if (renderError) {
      return FallbackComponent;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  fallbackComponent: PropTypes.element,
};
