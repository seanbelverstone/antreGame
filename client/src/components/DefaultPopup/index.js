import React from 'react';
import { navigate } from "hookrouter";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {

  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const DefaultPopup = (props) => {
  const {
    display,
    setDisplay,
    message,
    destination,
    snackbarColor
  } = props;

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (destination !== "") {
      navigate(destination);
    }
    setDisplay(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={display} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}} style={{height: "100%"}}>
        <Alert onClose={handleClose} severity={snackbarColor}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DefaultPopup;