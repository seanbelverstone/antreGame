import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import DeleteButton from '../DeleteButton';
import './style.css';
import API from '../../utils/API';
import DefaultPopup from '../DefaultPopup';

// PSUEDOCODE
// When modal is open, if the prop `formInProgress` = true then disable clickout
// modal closure.
// if nothing edited, disable submit button.
// api call to change username/password/email/delete account?

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
		minWidth: '40vh'
	},
}));
const ProfileModal = (props) => {
	const { user, authenticateUser/*, resetStore */} = props;
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [displayUsername, setDisplayUsername] = useState('none');
	const [displayPassword, setDisplayPassword] = useState('none');
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [usernameHelperText, setUsernameHelperText] = useState('');

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordHelperText, setPasswordHelperText] = useState('');

	const [formInProgress, setFormInProgress] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		!formInProgress && setOpen(false);
	};

	const [snackbarDisplay, setSnackbarDisplay] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarColor, setSnackbarColor] = useState('');

	const handleField = (value, type) => {
		if (type === 'username') {
			setUsername(value);
		} else {
			setPassword(value);
		}
		if (value.length > 1) {
			setFormInProgress(true);
		} else {
			setFormInProgress(false);
		}
	};

	const handleUserDelete = (value) => {
		const { id, jwtToken } = user;
		console.log(value);
		console.log(id, jwtToken);
		handleClose();
		// resetStore
		// navigate to login page, resetting the store as we go.
	};

	const displayEditBlock = (type) => {
		// add transition to edit button, where it rotates and turns into an x.
		if (type === 'username') {
			setDisplayUsername(displayUsername === 'none' ? 'flex' : 'none');
		} else {
			setDisplayPassword(displayPassword === 'none' ? 'flex' : 'none');
		}
	};

	const checkUsername = () => {
		if (username.length < 1 || username.length > 12) {
			setUsernameError(true);
			setUsernameHelperText('Please choose a username between 1 - 12 letters');
			return;
		} else {
			setUsernameError(false);
			setUsernameHelperText('');
			setFormInProgress(false);
			editField('username');
		}
	};

	const checkPasswords = () => {
		if (password !== confirmPassword) {
			setPasswordError(true);
			setPasswordHelperText('Passwords don\'t match');
		} else if (password.length === 0 || confirmPassword.length === 0) {
			setPasswordError(true);
			setPasswordHelperText('Please enter a password');
		} else {
			setPasswordError(false);
			setPasswordHelperText('');
			setFormInProgress(false);
			editField('password');
		}
	};

	const editField = (type) => {
		// should return an error if the username already exists.
		const { id, jwtToken } = user;
		const value = type === 'username' ? username : password;
		API.editUser(type, value, id, jwtToken)
			.then((res) => {
				console.log(res);
				setSnackbarColor('success');
				setSnackbarMessage(`Successfully updated ${type}.`);
				setSnackbarDisplay(true);
				type === 'password' ? setPassword('') : setUsername('');
				type === 'username' && authenticateUser({
					user: {
						username: value
					}
				});
				displayEditBlock(type);
			})
			.catch(() => {
				setSnackbarColor('error');
				setSnackbarMessage('Sorry, that username already exists.');
				setSnackbarDisplay(true);
			});
	};

	return (
		<div>
			<IconButton variant="contained" color="primary" onClick={handleOpen} style={{ float: 'right' }}>
				<ManageAccountsIcon />
			</IconButton>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				className={classes.modal}
			>
				<Fade in={open}>
					<div className={classes.paper} id="profileModal">
						<h2 className="title">Edit Account</h2>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							Username: {user.username}
							<a style={{ color: 'var(--wisdom)' }} onClick={() => displayEditBlock('username')}>
								{displayUsername === 'none' ? 'Edit' : 'Hide'}
							</a>
						</div>
						<form noValidate autoComplete="off" className="editAccountForm fadeIn" style={{ display: displayUsername }}>
							<TextField
								className="formInput"
								label="Username"
								variant="outlined"
								onChange={event => handleField(event.target.value, 'username')}
								error={usernameError}
								helperText={usernameHelperText}
								value={username}
							/>
							<Button variant="contained" color="primary" onClick={checkUsername}>
								Submit
							</Button>
						</form>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em', marginBottom: '1em' }}>
							Password: *******
							<a style={{ color: 'var(--wisdom)' }} onClick={() => displayEditBlock('password')}>
								{displayPassword === 'none' ? 'Edit' : 'Hide'}
							</a>
						</div>
						<form noValidate autoComplete="off" className="editAccountForm fadeIn" style={{ display: displayPassword }}>
							<TextField
								label="Password"
								variant="outlined"
								type="password"
								onChange={event => handleField(event.target.value, 'password')}
								error={passwordError}
								value={password}
							/>
							<TextField
								className="formInput"
								label="Confirm Password"
								variant="outlined"
								type="password"
								onChange={event => setConfirmPassword(event.target.value)}
								error={passwordError}
								helperText={passwordHelperText}
								password={confirmPassword}
							/>
							<Button variant="contained" color="primary" onClick={checkPasswords}>
								Submit
							</Button>
						</form>
						<div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1em' }}>
							<DeleteButton
								text="DELETE ACCOUNT"
								customText="Are you sure you want to delete your account?"
								callback={handleUserDelete} />
						</div>
						<DefaultPopup
							customClass="createPopup"
							display={snackbarDisplay}
							setDisplay={setSnackbarDisplay}
							message={snackbarMessage}
							// destination="/"
							snackbarColor={snackbarColor}
						/>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

ProfileModal.propTypes = {
	user: PropTypes.object,
	authenticateUser: PropTypes.func,
	resetStore: PropTypes.func
};

ProfileModal.defaultProps = {
	user: {},
	authenticateUser: () => {},
	resetStore: () => {}
};

export default ProfileModal;