import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

	display && setTimeout(() => {
		handleClose();
	}, 6000);

	const handleClose = () => {
		if (destination !== '' && snackbarColor !== 'error') {
			history(destination);
		}
		setDisplay(false);
	};
	return (
		<Collapse in={display}>
			<Alert
				className={customClass}
				severity={snackbarColor}
				variant="filled"
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							handleClose(false);
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				{message}
			</Alert>
		</Collapse>
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