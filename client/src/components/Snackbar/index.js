import React from 'react';
import Login from "../Login";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


let username = window.sessionStorage.getItem("antreUsername");
console.log(username);
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
  
  export default function CustomizedSnackbars({ changeComponent, display, setDisplay }) {
    const classes = useStyles();
    console.log(display)
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setDisplay(false);
      changeComponent(<Login />)
    };
  
    return (
      <div className={classes.root}>
        <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
             Account created. Welcome, {username}!
          </Alert>
        </Snackbar>
      </div>
    );
  }