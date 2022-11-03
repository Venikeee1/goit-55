import { Component } from 'react';
import PropTypes from 'prop-types';

export class ApiRequest extends Component {
  state = {
    data: null,
    error: null,
    loading: false,
  };

  async componentDidMount() {
    const { request } = this.props;
    this.setState({ loading: true });

    try {
      const data = await request();
      this.setState({ error: null, data });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { data, error, loading } = this.state;
    console.log(typeof this.props.children === 'function');
    if (typeof this.props.children === 'function') {
      return this.props.children({ data: data?.data, error, loading });
    }

    return this.props.children;
  }
}

ApiRequest.propTypes = {
  request: PropTypes.func.isRequired,
};

// <Header>{() => {}}</Header>;
