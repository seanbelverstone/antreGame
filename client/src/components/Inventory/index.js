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

export default function Inventory(
    {health,
    maxHealth,
    strength,
    defense,
    wisdom,
    luck,
    weapon,
    weaponDmg,
    head,
    chest,
    legs,
    hands,
    feet,
    torch,
    amulet,
    healthPotions,
    gold}) {
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
            <h2 id="transition-modal-title">Inventory</h2>
            <div id="all">
                <section className="section1">
                    <div id="weapon">
                        <img className="icon" src={invImages.sword} />
                        <div>Weapon: {weapon} - {weaponDmg} dmg</div>
                    </div>

                    <div id="head">
                      <img className="icon" src={invImages.head} />
                      <div>Head: {head}</div>
                    </div>

                    <div id="chest">
                      <img className="icon" src={invImages.chest} />
                      <div>Chest: {chest}</div>
                    </div>

                    <div id="legs">
                      <img className="icon" src={invImages.legs} />
                      <div>Legs: {legs}</div>
                    </div>

                    <div id="hands">
                      <img className="icon" src={invImages.hands} />
                      <div>Hands: {hands}</div>
                    </div>

                    <div id="feet">
                      <img className="icon" src={invImages.feet} />
                      <div>Feet: {feet}</div>
                    </div>

                    <div id="torch">
                      <img className="icon" src={invImages.torch} />
                      <div>Torch: {torch}</div>
                    </div>

                    <div id="amulet">
                      <img className="icon" src={invImages.amulet} />
                      <div>Amulet: {amulet}</div>
                    </div>

                    <div id="healthPotion">
                      <img className="icon" src={invImages.healthPotion} />
                      <div>Health Potions: {healthPotions}</div>
                    </div>

                    <div id="gold">
                      <img className="icon" src={invImages.gold} />
                      <div>Gold: {gold}</div>
                    </div>

                </section>
                <section className="section2">
                    <h2 id="statsTitle">Stats</h2>
                    <div id="health">HP: {health}/{maxHealth}</div>
                    <div id="strength">Strength: {strength}</div>
                    <div id="defense">Defense: {defense}</div>
                    <div id="wisdom">Wisdom: {wisdom}</div>
                    <div id="luck">Luck: {luck}</div>
                </section>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}