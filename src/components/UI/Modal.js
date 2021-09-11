import classes from "./Modal.module.css";
import { Fragment } from "react";
import reactDom from "react-dom";

const Backdrop = (props) => {
  return <div onClick={props.onHideCart} className={classes.backdrop}></div>;
};
const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  const backdropElement = document.getElementById("overlay");

  return (
    <Fragment>
      {reactDom.createPortal(
        <Backdrop onHideCart={props.onHideCart}></Backdrop>,
        backdropElement
      )}
      ;
      {reactDom.createPortal(
        <Overlay>{props.children}</Overlay>,
        backdropElement
      )}
      ;
    </Fragment>
  );
};

export default Modal;
