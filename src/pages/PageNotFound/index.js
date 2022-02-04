import React from 'react';
import Wrapper from '../../components/Wrapper';
import logo from '../../assets/images/Antre.png';
import Button from '@mui/material/Button';
import './style.css';
import store from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
	const { jwtToken } = store.getState().authenticateUser.user;
	let history = useNavigate();

	const goToLogin = () => {
		history('/');
	};

	return (
		<Wrapper>
			<div id="notFound">
				{jwtToken === '' ? (
					<>
						<h1>Oops! You need to be signed in to access this page.</h1>
						<Button variant="contained" color="primary" onClick={goToLogin} style={{ width: '25%' }}>
                            GO TO HOMEPAGE
						</Button>
					</>
				) : (
					<h1>Page Not Found</h1>
				)
				}
				<img src={logo} alt="logo" id="antreLogo" />

			</div>
		</Wrapper>

	);
};

export default PageNotFound;