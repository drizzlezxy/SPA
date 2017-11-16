import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const modalRoot = document.getElementById('modal');

class Modal extends Component {
  constructor (props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount () {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.el);
  }

  render () {
    console.log(this.props.children);
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};
export default Modal;
