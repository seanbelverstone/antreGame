import React from 'react';
import { navigate } from 'hookrouter';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

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

const DefaultPopup = (props) => {
	const {
		display,
		setDisplay,
		message,
		destination,
		snackbarColor,
		customClass
	} = props;

	const classes = useStyles();

	const handleClose = () => {
		if (destination !== '' && snackbarColor !== 'error') {
			navigate(destination);
		}
		setDisplay(false);
	};

	return (
		<div className={`${classes.root}`}>
			<Snackbar
				className={customClass}
				open={display}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
				style={{height: '20%', top: '40vh', width: '23vw'}}>
				<Alert  onClose={handleClose} severity={snackbarColor}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};

DefaultPopup.propTypes = {
	display: PropTypes.bool,
	setDisplay: PropTypes.func,
	message: PropTypes.string,
	destination: PropTypes.string,
	snackbarColor: PropTypes.string,
	customClass: PropTypes.string
};

DefaultPopup.defaultProps = {
	display: false,
	setDisplay: () => {},
	message: '',
	destination: '',
	snackbarColor: '',
	customClass: ''
};

export default DefaultPopup;