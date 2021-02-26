import React from 'react';
import { navigate } from "hookrouter";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


let username = window.sessionStorage.getItem("antreUsername");
if (!username) {
    username = "player"
}

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
  
  export default function CreationPopup({ display, setDisplay, message, destination }) {
    const classes = useStyles();
    console.log(display)
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      navigate(destination);
      setDisplay(false);
    };
  
    return (
      <div className={classes.root}>
        <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }