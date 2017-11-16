import { Component } from 'react';
import PropTypes from 'prop-types';

class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
  }

  componentDidMount () {
    this.load(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load (props) {
    this.setState({
      mod: null,
    });
    props.load().then((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod,
      });
    }).catch(error => {
      console.log('error:', error);
      return 'An error occurred while loading the component';
    });
  }

  render () {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

Bundle.propTypes = {
  children: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
};

export default Bundle;
