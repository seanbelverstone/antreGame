import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../redux/actions/actionCreators';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@material-ui/icons/Add';
import API from '../../utils/API';
import { navigate } from 'hookrouter';
import Wrapper from '../../components/Wrapper';
import CharacterBlock from '../../components/CharacterBlock';
import smallLogo from '../../assets/images/Antre.png';
import './style.css';
import ProfileModal from '../../components/ProfileModal';

const mapStateToProps = (state) => {
	return {
		user: state.authenticateUser.user,
		authenticateUser: state.authenticateUser,
		resetStore: state.resetStore
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};


const BoundSelectCharacter = (props) => {
	const [characters, updateCharacters] = useState([]);
	const [lessThanFour, setLessThanFour] = useState('none');
	const { user, authenticateUser, resetStore } = props;

	useEffect(() => {
		API.getAllCharacters(user.id, user.jwtToken)
			.then(results => {
				// pushes the data to the characters array
				const newCharacters = results.data;
				updateCharacters(prev => [...prev, ...newCharacters]);
			});
		checkForSpace();
	}, [user.id]);

	useEffect(() => {
		if (characters.length) {
			checkForSpace();
		}
	}, [characters]);

	const renderCharacters = () => {
		return characters.map(character => {
			return <CharacterBlock character={character} key={character.id} />;
		});
	};

	const checkForSpace = () => {
		// Allows the user to have only 4 characters. If they have less than 4, it displays the "create new character" box.
		if (characters.length < 4) {
			setLessThanFour('flex');
		} else {
			setLessThanFour('none');
		}
	};

	const logout = () => {
		resetStore();
		navigate('/');
	};

	return (
		<Wrapper page="selectCharacter">
			<div className="topRow" style={{ marginRight: '0 !important' }}>
				<Button variant="outlined" id="logout" onClick={logout}>LOG OUT</Button>
				<div className="title">SELECT A CHARACTER</div>
				<ProfileModal user={user} authenticateUser={authenticateUser} resetStore={resetStore} />
			</div>

			{/* do a map of the characters array, and render them here. */}
			<section id="allCharacters">
				{renderCharacters()}
			</section>


			<div style={{ display: lessThanFour }} id="creatorWrapper" className="characterWrapper">
				<div id="createNew">Create a new character</div>
				<IconButton variant="contained" color="primary" onClick={() => navigate('/create')}>
					<AddIcon />
				</IconButton>
			</div>

			<img src={smallLogo} alt="a small logo" id="smallLogo" />
		</Wrapper>

	);
};

BoundSelectCharacter.propTypes = {
	user: PropTypes.object,
	authenticateUser: PropTypes.func,
	resetStore: PropTypes.func
};

BoundSelectCharacter.defaultProps = {
	user: {},
	authenticateUser: () => {},
	resetStore: () => {}
};

const SelectCharacter = connect(mapStateToProps, mapDispatchToProps)(BoundSelectCharacter);


export default SelectCharacter;