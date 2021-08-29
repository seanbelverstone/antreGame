import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { camelToTitle } from '../../utils/functions';

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

const InventoryPopup = (props) => {
    const { 
        display,
        setDisplay,
        items
    } = props;
    console.log(items);
    const classes = useStyles();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!display) {
            setMessages([]);
        }
    }, [display]);

    useEffect(() => {
        // if (!items[0]?.none) {
            checkItems();
        // }
    }, [items])

    const addIfUnique = (note) => {
        if (messages.indexOf(note) === -1) {
            messages.push(note);
        } else {
            return;
        }

        setTimeout(() => {
            setMessages([]);
            setDisplay(false);
        }, 6000);
    };

    const checkItems = () => {
        if (items !== []) {
            let note;
            items.forEach((item) => {
                const itemName = Object.keys(item);
                const quantity = Object.values(item)[0];
                const armorPiece = Object.values(item)[0];
                if (item.none || item.fight || item.luckCheck || item.torchCheck || item.end || item.death) {
                    // if no modifier is present, just return.
                    setDisplay(false);
                    return;
                } else if (item.length && item.head || item.chest || item.hands || item.legs || item.feet) {
                    note = `You equipped the ${armorPiece}. `
                    return addIfUnique(note);
                } else if (item.torch === 0) {
                    note = `You lost your torch.`;
                    return addIfUnique(note);
                } else if (Math.sign(item.health) === 1) {
                    note = `You restored ${item.health} health.`
                    return addIfUnique(note);
                } else if (quantity >= 1) {
                    // if the modifier returns as positive, user gains an item
                    note = `You gained ${quantity} ${camelToTitle(itemName[0])}. `;
                    if(itemName[0] === 'healthPotion' && quantity > 1) {
                        note = `You gained ${quantity} Health Potions. `;
                    }
                    return addIfUnique(note);
                } else if (item.weapon && Object.values(item.weapon)[1] > 1) {
                    // if the weapon has more than 1 damage (not no weapon)
                    note = `You gained the ${item.weapon.name}, which does ${item.weapon.dmg} damage. `;
                    return addIfUnique(note);
                } else if (Math.sign(quantity) === -1) {
                    // if the modifier is negative, set the note to say you lost an item
                    note = `You lost ${quantity} ${itemName}. `;
                    return addIfUnique(note);
                } else if (Object.values(item.weapon)[1] <= 1) {
                    note = `You lost your weapon. Your damage has been reduced to 1. `;
                    return addIfUnique(note);
                } else {
                    // if the item is neither negative nor positive (0), just say that they lost the item. This relates to things like the torch
                    note = `You lost your ${armorPiece}. `;
                    return addIfUnique(note);
                }
            });
        }
    }

    const handleClose = (event, reason) => {
        setMessages([]);

        // if (reason === "clickaway") {
        //     return;
        // }

        setDisplay(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={display} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "left"}} style={{height: "100%"}}>
                <Alert onClose={handleClose} severity="info">
                    {messages}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default InventoryPopup;