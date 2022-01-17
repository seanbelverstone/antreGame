import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import API from '../../utils/API';
import { navigate } from 'hookrouter';
import Wrapper from '../../components/Wrapper';
import CharacterBlock from '../../components/CharacterBlock';
import smallLogo from '../../assets/images/Antre.png';
import './style.css';

const mapStateToProps = (state) => {
	return {
		user: state.authenticateUser.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};


const BoundSelectCharacter = (props) => {
	const [characters, updateCharacters] = useState([]);
	const [lessThanFour, setLessThanFour] = useState('none');
	const { user, resetStore } = props;

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
			<div className="topRow">
				<Button variant="outlined" id="logout" onClick={logout}>LOG OUT</Button>
				<div className="title">SELECT A CHARACTER</div>
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
	resetStore: PropTypes.func
};

BoundSelectCharacter.defaultProps = {
	user: {},
	resetStore: () => {}
};

const SelectCharacter = connect(mapStateToProps, mapDispatchToProps)(BoundSelectCharacter);


export default SelectCharacter;