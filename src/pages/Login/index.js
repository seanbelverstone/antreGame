import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actionCreators from '../../redux/actions/actionCreators';
import Wrapper from '../../components/Wrapper';
import Credits from '../../components/Credits';
import API from '../../utils/API';
import logo from '../../assets/images/AntreCrop.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style.css';

const mapStateToProps = (state) => {
	return {
		user: state.authenticateUser.user,
		auth: state.authenticateUser.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};


const BoundLogin = (props) => {
	const history = useNavigate();

	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(false);

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordHelperText, setPasswordHelperText] = useState('');
	const { authenticateUser } = props;


	const onSubmit = async (event) => {
		event.preventDefault();
		API.checkUser(username, password)
			.then(results => {

				// Clears out any errors if there are any
				setUsernameError(false);
				setPasswordError(false);
				setPasswordHelperText('');
				authenticateUser({
					user: {
						id: results.data.user.id,
						username: username,
						jwtToken: results.data.token
					}
				});
			})
			.then(() => {
				history('/select');
			})
			.catch(error => {
				console.log(error);
				setUsernameError(true);
				setPasswordError(true);
				setPasswordHelperText('Username/password doesn\'t exist.');
			});
	};

	return (
		<>
			<Wrapper page="login">
				<Credits />
				<img src={logo} alt="logo" id="antreLogo" />
				<form noValidate autoComplete="off" id="loginForm" onSubmit={onSubmit}>
					<TextField
						className="formInput"
						label="Username"
						variant="outlined"
						onChange={event => setUsername(event.target.value)}
						error={usernameError}
					/>
					<TextField
						className="formInput"
						label="Password"
						variant="outlined"
						type="password"
						onChange={event => setPassword(event.target.value)}
						error={passwordError}
						helperText={passwordHelperText}
					/>
					<Button
						variant="contained"
						type="submit"
						className="primaryButton"
					>
                        Login
					</Button>
					<a id="create" onClick={() => history('/account')}>CREATE AN ACCOUNT</a>
				</form>
			</Wrapper>
			<p id="disclaimer">This game is currently under development. If you discover any bugs, please create an issue on
                the GitHub repository <span id="disclaimerLink" href='https://github.com/seanbelverstone/antreGame/issues' target="_blank">HERE</span>
			</p>
		</>
	);
};

BoundLogin.propTypes = {
	authenticateUser: PropTypes.func
};

BoundLogin.defaultProps = {
	authenticateUser: () => {}
};

const Login = connect(mapStateToProps, mapDispatchToProps)(BoundLogin);

export default Login;