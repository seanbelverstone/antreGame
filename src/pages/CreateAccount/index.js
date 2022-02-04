import React, { useState } from 'react';
import { navigate } from 'hookrouter';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Wrapper from '../../components/Wrapper';
import DefaultPopup from '../../components/DefaultPopup';
import API from '../../utils/API';
import smallLogo from '../../assets/images/Antre.png';
import './style.css';

const CreateAccount = () => {

	// State for username section
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [usernameHelperText, setUsernameHelperText] = useState('');

	// Email state handlers
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailHelperText, setEmailHelperText] = useState('');

	// Password state handlers
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordHelperText, setPasswordHelperText] = useState('');

	const [snackbarDisplay, setSnackbarDisplay] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarColor, setSnackbarColor] = useState('');

	// Email validation check with regex
	const validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Staggering the checks, both to retain the styling of the site, and also to enable the button when all is complete
		checkUsername();
	};

	// Username validation
	const checkUsername = () => {
		if (username.length < 1 || username.length > 12) {
			setUsernameError(true);
			setUsernameHelperText('Please choose a username between 1 - 12 letters');
			return;
		} else {
			setUsernameError(false);
			setUsernameHelperText('');
			checkEmail();
		}
	};

	// Email validation
	const checkEmail = () => {
		if (!validateEmail(email)) {
			setEmailError(true);
			setEmailHelperText('Please enter a valid email');
		} else {
			setEmailError(false);
			setEmailHelperText('');
			checkPasswords();
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

			createNewUser();
		}
	};

	const createNewUser = () => {
		API.createUser(username, email, password)
			.then(() => {
				setSnackbarColor('success');
				setSnackbarMessage(`Account created. Welcome, ${username}!`);
				setSnackbarDisplay(true);
			})
			.catch(() => {
				setSnackbarColor('error');
				setSnackbarMessage(`Sorry, the username ${username} already exists.`);
				setSnackbarDisplay(true);
			});
	};

	return (
		<Wrapper page="createAccount">
			<div className="topRow">
				<div className="title">CREATE ACCOUNT</div>
				<a id="back" onClick={() => navigate('/')}>&#x2190; BACK</a>
			</div>
			<form noValidate autoComplete="off" id="createAccountForm" onSubmit={handleSubmit}>

				<TextField
					className="formInput"
					label="Username"
					variant="outlined"
					onChange={event => setUsername(event.target.value)}
					error={usernameError}
					helperText={usernameHelperText}
				/>

				<TextField
					className="formInput"
					label="Email"
					variant="outlined"
					onChange={event => setEmail(event.target.value)}
					error={emailError}
					helperText={emailHelperText}
				/>

				<TextField
					className="formInput"
					label="Password"
					variant="outlined"
					type="password"
					onChange={event => setPassword(event.target.value)}
					error={passwordError}
				/>

				<TextField
					className="formInput"
					label="Confirm Password"
					variant="outlined"
					type="password"
					onChange={event => setConfirmPassword(event.target.value)}
					error={passwordError}
					helperText={passwordHelperText}
				/>

				<Button
					variant="contained"
					color="primary"
					id="submit"
					type="submit"
				>
                    Submit
				</Button>
				<img src={smallLogo} alt="a small logo" id="smallLogo" />
			</form>
			<DefaultPopup
				customClass="createPopup"
				display={snackbarDisplay}
				setDisplay={setSnackbarDisplay}
				message={snackbarMessage}
				destination="/"
				snackbarColor={snackbarColor}
			/>
		</Wrapper>
	);
};

export default CreateAccount;