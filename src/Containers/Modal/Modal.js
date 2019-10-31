import React, { Component } from "react";
import classes from "./Modal.module.scss";
import Aux from "../../HOC/Auxiliary/Auxiliary";
import Backdrop from "../../Components/UI/Bakdrop/Backdrop";
import PropTypes from "prop-types";

class Modal extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  };

  render() {
    let toShow;
    if (this.props.show) {
      toShow = [classes.Modal, classes.Modal__Show].join(" ");
    } else {
      toShow = [classes.Modal, classes.Modal__Hide].join(" ");
    }
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          closeBackDrop={this.props.closeModal}
        />
        <div className={toShow}>{this.props.children}</div>
      </Aux>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
