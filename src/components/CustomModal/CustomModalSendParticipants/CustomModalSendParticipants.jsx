import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import styles from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

import SendParticipantsSelector from "../../../views/Transactions/Contracts/components/SendParticipantsSelector/SendParticipantsSelector"

import "./CustomModalSendParticipants.css"


const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CustomModalSendParticipants(props) {
  const [modal, setModal] = React.useState(false);
  const classes = useStyles();
  const getData = data => {
      props.sendData(data)
      setModal(false)
  }
  return (
    <div>
      {
      !props.isButton ? (
          <Icon color="action" onClick={() => setModal(true)}>send</Icon>
      ) : (
        <button
            className="buttonSendPDF"
            onClick={() => setModal(true)}
        >
            Enviar
        </button>
      )}
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        transition={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>{props.modalTitle}</h4>
        </DialogTitle>
        <SendParticipantsSelector 
            participants={[]}
            sendSelected={getData} />
      </Dialog>
    </div>
  );
}