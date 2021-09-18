import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider } from "@material-ui/core";
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
                    <div className={classes.paper} id="inventoryModal">
                        <section id="left">
                            <section id="statsBlock">
                                <div style={{textAlign: 'center'}}>HP</div>
                                <div className="healthArea" id="userHealthArea">
                                    <div className="healthText">
                                        {health}/{maxHealth}
                                    </div>
                                    <div id="userBar" style={{ width: `${userHealthWidth}%` }}></div>
                                </div>
                                <div className="leftStat">
                                    <section id="strength">
                                        <div>Strength: {strength}</div>
                                    </section>
                                    <section id="defense">
                                        <div>Defense: {defense}</div>
                                    </section>
                                </div>
                                <div className="rightStat">
                                    <section id="wisdom">
                                        <div>Wisdom: {wisdom}</div>
                                    </section>
                                    <section id="luck">
                                        <div>Luck: {luck}</div>
                                    </section>
                                </div>
                            </section>
                            <Divider />
                            <section id="misc">
                                <section id="top">
                                    <div id="torch">
                                        <img className="icon" src={invImages.torch} />
                                        <div className="iconText">Torch: {torch}</div>
                                    </div>

                                    <div id="amulet">
                                        <img className="icon" src={invImages.amulet} />
                                        <div className="iconText">Amulet: {amulet}</div>
                                    </div>
                                </section>
                                <section id="bottom">
                                    <div id="healthPotion">
                                        <img className="icon" src={invImages.healthPotion} />
                                        <div className="iconText">Health Potions: {healthPotions}</div>
                                    </div>

                                    <div id="gold">
                                        <img className="icon" src={invImages.gold} />
                                        <div className="iconText">Gold: {gold}</div>
                                    </div>
                                </section>
                            </section>
                        </section>
                        <Divider orientation="vertical" />
                        <section id="right">
                            <div id="weapon">
                                <img className="equipmentIcon" src={invImages.sword} />
                                <div class="invText">
                                    <div className="key">Weapon</div>
                                    <div>{weapon} - {weaponDamage} dmg</div>
                                </div>
                            </div>
                            <div id="head">
                                <img className="equipmentIcon" src={invImages.head} />
                                <div class="invText">
                                    <div className="key">Head</div>
                                    <div>{head}</div>
                                </div>
                            </div>
                            <div id="chest">
                                <img className="equipmentIcon" src={invImages.chest} />
                                <div class="invText">
                                    <div className="key">Chest</div>
                                    <div>{chest}</div>
                                </div>
                            </div>
                            <div id="hands">
                                <img className="equipmentIcon" src={invImages.hands} />
                                <div class="invText">
                                    <div className="key">Hands</div>
                                    <div>{hands}</div>
                                </div>
                            </div>
                            <div id="legs">
                                <img className="equipmentIcon" src={invImages.legs} />
                                <div class="invText">
                                    <div className="key">Legs</div>
                                    <div>{legs}</div>
                                </div>
                            </div>
                            <div id="feet">
                                <img className="equipmentIcon" src={invImages.feet} />
                                <div class="invText">
                                    <div className="key">Feet</div>
                                    <div>{feet}</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Inventory;