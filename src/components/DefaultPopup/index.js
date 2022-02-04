import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function Alert(props) {

	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DefaultPopup = (props) => {
	let history = useNavigate();
	const {
		display,
		setDisplay,
		message,
		destination,
		snackbarColor,
		customClass
	} = props;

	const handleClose = () => {
		if (destination !== '' && snackbarColor !== 'error') {
			history(destination);
		}
		setDisplay(false);
	};

	return (
		<div>
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