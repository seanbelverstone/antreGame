import React, { useState, useEffect } from "react";
import { navigate } from "hookrouter";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(!display) {
            setMessages([]);
        }
    }, [display])

    const addToArray = (note) => {
        if (messages.indexOf(note) === -1) {
            messages.push(note)
        } else {
            return;
        }

        setTimeout(() => {
            setMessages([])
        }, 6000)
    }

    // alert types "error" and "info", based on if the modifier is positive or negative
    if(items !== []) {
        let note;

        items.forEach((item) => {
            console.log(item)
            if(item.none) {
                // if no modifier is present, just return.
                return;
            } else if (Math.sign(Object.values(item)) === 1 || Object.values(item.weapon.dmg > 1)) {
                // if the value returns as positive, or it's relating to a weapon that deals more damage than (no weapon)
                // set the message to a positive one.
                if (item.weapon) {
                    note = `You gained the ${item.weapon.name}, which does ${item.weapon.dmg} damage. `;
                    addToArray(note)
                } else {
                    note = `You gained ${Object.values(item)} ${Object.keys(item)}. `;
                    addToArray(note);
                }
            } else if (Math.sign(Object.values(item)) === -1 || Object.values(item.weapon.dmg = 1)) {
                if (item.weapon) {
                    note = `You lost your weapon. Your damage has been reduced to 1 `;
                    addToArray(note)
                } else {
                    note = `You lost ${Object.values(item)} ${Object.keys(item)} `
                    addToArray(note)
                }
                console.log(messages)
            } else {
                // if the item is neither negative nor positive (0), just say that they lost the item. This relates to things like the torch
                note = `You lost ${Object.keys(item)} `;
                addToArray(note)
            }

            console.log(Math.sign(Object.values(item)))
        })
    }    

    const handleClose = (event, reason) => {
        setMessages([])

        if (reason === "clickaway") {
            return;
        }

        setDisplay(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    {messages}
                </Alert>
            </Snackbar>
        </div>
    );
}
