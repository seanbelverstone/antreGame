import React, { useState } from 'react';
import { Button } from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import mysql from '../../assets/images/companyIcons/mysql.png';
import react from '../../assets/images/companyIcons/react.png';
import express from '../../assets/images/companyIcons/express.png';
import node from '../../assets/images/companyIcons/nodejs.png';
import materialUi from '../../assets/images/companyIcons/materialUi.png';
import { makeStyles } from '@mui/styles';
import './style.css';
import DonateButton from '../DonateButton';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: '#f7f7f7',
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: '40vw',
		borderRadius: '10px'
	},
}));

const Credits = () => {

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
					<div className={`${classes.paper} creditModal`} style={{overflowY: 'scroll', maxHeight: '80vh', padding: '40px'}}>
						<h1 id="transition-modal-title" className="title" style={{margin: '0 30px'}}>CREDITS</h1>  
						<section className="section" id="created">
							<h2>Created by</h2>
							<span>Sean Belverstone</span>
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
						<section className="section" id="logoCredit">
							<h2>Logo Design</h2>
							<span>Logo design created on Canva.</span>
							<span>All other images were used from free websites across the internet.</span>
						</section>
						<section className="section" id="testers">
							<h2>Testers</h2>
							<span>Alex Anderson</span>
							<span>Ben Murray</span>
							<span>Jack Pickard</span>
							<span>Lewie Cox</span>
							<span>Mark Hobbs</span>
						</section>
						<section className="section">
							<h2>With special thanks to</h2>
							<span>Olivia Yeargain, for putting up with my long nights and constant styling advice.</span>
							<span>Full Stack Coding Bootcamp @ UT Austin, for teaching me the skills I needed to get started.</span>
						</section>
						<section className="section" style={{marginTop: '40px'}}>
							<span>If you would like to buy me a coffee or donate to help me continue to develop this one man-show, it would mean so much to me! :)</span>
							<DonateButton />
						</section>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default Credits;