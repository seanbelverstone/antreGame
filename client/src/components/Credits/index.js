import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import mysql from "../../assets/images/companyIcons/mysql.png";
import react from "../../assets/images/companyIcons/react.png";
import express from "../../assets/images/companyIcons/express.png";
import node from "../../assets/images/companyIcons/nodejs.png";
import materialUi from "../../assets/images/companyIcons/materialUi.png";
import "./style.css";
import DonateButton from '../DonateButton';

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
    minWidth: "40vh",
    maxWidth: "60vw"
  },
}));

const Credits = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" variant="contained" id="inventory" onClick={handleOpen}>
        Credits
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
          <div className={classes.paper} style={{overflowY: "scroll", maxHeight: "80vh", padding: "40px"}}>
            <h1 id="transition-modal-title">Credits</h1>  
            <section className="section">
              <span>If you would like to buy me a coffee or donate to help me continue to develop this one man-show, I'd really appreciate it :)</span>
              <DonateButton />
            </section>
            <section className="section" id="created">
              <h2>Created by</h2>
              <p>Sean Belverstone</p>
            </section>
            <section className="section" id="logoCredit">
              <h2>Logo Design</h2>
              <p>Logo design created on Canva.</p>
              <p>All other images were used from free websites across the internet.</p>
            </section>
            <section className="section" id="testers">
              <h2>Testers</h2>
              <p>Alex Anderson</p>
              <p>Mark Hobbs</p>
              <p>Ben Murray</p>
              <p>Jack Pickard</p>
            </section>
            <section className="section" id="built">
              <h2>Built with: </h2>
              <div className="imageSection">
                <img className='images' href="https://reactjs.org/" target="_blank" src={react} />
                <img className='images' href="https://reactjs.org/" target="_blank" src={materialUi} />
                <img className='images' href="https://reactjs.org/" target="_blank" src={express} />
                <img className='images' href="https://reactjs.org/" target="_blank" src={node} />
                <img className='images' href="https://reactjs.org/" target="_blank" src={mysql} />
              </div>
            </section>
            <section className="section" id="testers">
              <h2>With special thanks to</h2>
              <p>Olivia Yeargain, for putting up with my long nights and constant styling advice.</p>
              <p>Full Stack Coding Bootcamp @ UT Austin, for teaching me the skills I needed to get started.</p>
            </section>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Credits;