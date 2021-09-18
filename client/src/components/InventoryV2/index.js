import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import invImages from "../../assets/images/invIcons";
import "./style.css";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "40vh"
    },
}));

const Inventory = (props) => {

    const {
        health,
        maxHealth,
        userHealthWidth,
        strength,
        defense,
        wisdom,
        luck,
        weapon,
        weaponDamage,
        head,
        chest,
        legs,
        hands,
        feet,
        torch,
        amulet,
        healthPotions,
        gold,
        name,
        race,
        charClass
    } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="button" variant="contained" id="inventory" onClick={handleOpen}>
                Inventory
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <section id="left">
                            <section id="statsBlock">
                                <div>HP:</div>
                                <div className="healthArea" id="userHealthArea">
                                    <div className="healthText">
                                        {health}/{maxHealth}
                                    </div>
                                    <div id="userBar" style={{ width: `${userHealthWidth}%` }}></div>
                                </div>
                                <div className="leftStat">
                                    <section id="strength">
                                        <div>Strength:</div>
                                        <div className="value">{strength}</div>
                                    </section>
                                    <section id="defense">
                                        <div>Defense:</div>
                                        <div className="value">{defense}</div>
                                    </section>
                                </div>
                                <div className="rightStat">
                                    <section id="wisdom">
                                        <div>Wisdom:</div>
                                        <div className="value">{wisdom}</div>
                                    </section>
                                    <section id="luck">
                                        <div>Luck:</div>
                                        <div className="value">{luck}</div>
                                    </section>
                                </div>

                            </section>
                        </section>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Inventory;