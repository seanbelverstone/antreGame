import React, { useState, useEffect } from "react";
import { navigate } from "hookrouter";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

let message;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function InventoryPopup({ display, setDisplay, items }) {
    const classes = useStyles();

    const [alertType, setAlertType] = useState();
    const [currentModifiers, setCurrentModifiers] = useState([]);

    
    useEffect(() => {
        if (items === []) {
            return;
        }
        setCurrentModifiers(items)
    }, [])

    console.log(currentModifiers)

    // alert types "error" and "info", based on if the modifier is positive or negative
    if(items !== []) {
        items.forEach((item) => {
            if(item.none) {
                return;
            } else if (!Object.values(item)) {
                message = `You lost ${Object.values(item)} ${Object.keys(item)}`
                // setAlertType("error")
            } else {
                message = `${Object.values(item)} ${Object.keys(item)}`
                // setAlertType("info")
                console.log(message)
            }
            
        })
    }    

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setDisplay(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
