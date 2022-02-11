import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../redux/actions/actionCreators';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TextField, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import DefaultPopup from '../../components/DefaultPopup';
import API from '../../utils/API';
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

const BoundCreateCharacter = (props) => {
	let history = useNavigate();
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [nameHelperText, setNameHelperText] = useState('');
	const [race, setRace] = useState('');
	const [charClass, setCharClass] = useState('');
	const [health, setHealth] = useState(0);
	const [strength, setStrength] = useState(0);
	const [defense, setDefense] = useState(0);
	const [wisdom, setWisdom] = useState(0);
	const [luck, setLuck] = useState(0);
	const [description, setDescription] = useState('');
	const [descriptonDisplay, setDescriptionDisplay] = useState(0);
	const [skill, setSkill] = useState('');
	const [snackbarDisplay, setSnackbarDisplay] = useState(false);

	const { user, resetStore } = props;

	// By passing in charClass, setStats runs whenever the selected class is selected
	useEffect(() => {
		setStats();
	}, [charClass]);

	// sets the stats of the corresponding class
	const setStats = () => {
		switch (charClass) {
		case 'Warrior':
			setHealth(80);
			setStrength(5);
			setDefense(4);
			setWisdom(1);
			setLuck(2);
			setDescription('Strong and fierce, the warrior is a reliable combatant.');
			setSkill('Stalwart Defense: Massive increase to defense for 3 turns.');
			setDescriptionDisplay(1);
			break;
		case 'Rogue':
			setHealth(60);
			setStrength(4);
			setDefense(2);
			setWisdom(2);
			setLuck(4);
			setDescription('As deadly as they are cunning, the rogue utilizes their luck to end fights quickly.');
			setSkill('Gambler\'s Strike: Massive increase to critical hit chance on the next turn.');
			setDescriptionDisplay(1);
			break;
		case 'Paladin':
			setHealth(70);
			setStrength(3);
			setDefense(3);
			setWisdom(4);
			setLuck(2);
			setDescription('Using other worldly powers to surpass their foes, the paladin is the wisest of them all.');
			setSkill('Holy Remedy: Fully restores all health.');
			setDescriptionDisplay(1);
			break;
		default:
			setHealth(0);
			setStrength(0);
			setDefense(0);
			setWisdom(0);
			setLuck(0);
			setDescription('');
			setSkill('');
		}
	};

	const handleRaceChange = (event) => {
		setRace(event.target.value);
	};

	const handleClassChange = (event) => {
		setCharClass(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		checkName();
	};

	const checkName = () => {
		if (name.length > 20 || name.length < 1) {
			setNameError(true);
			setNameHelperText('Please use a name that is less than 20 characters');
			return;
		} else {
			setNameError(false);
			setNameHelperText('');
			createNewCharacter();
		}
	};

	const createNewCharacter = () => {
		API.createNewCharacter(name, race, charClass, health, strength, defense, wisdom, luck, user.id, user.jwtToken)
			.then(() => {
				setSnackbarDisplay(true);
			});
	};

	const logout = () => {
		resetStore();
		history('/');
	};

	return (
		<Wrapper page="createCharacter">
			<div className="topRow">
				<Button
					variant="outlined"
					id="logout"
					onClick={logout}
					className="primaryOutlinedButton"
				>LOG OUT</Button>
				<div className="title">CREATE A CHARACTER</div>
				<a id="back" onClick={() => history('/select')}>&#x2190; BACK</a>
			</div>

			<form id="formWrapper" onSubmit={handleSubmit}>
				<FormControl>
					<TextField
						className="formInput"
						label="Name"
						variant="standard"
						onChange={event => setName(event.target.value)}
						error={nameError}
						helperText={nameHelperText}
					/>
				</FormControl>
				<FormControl>
					<InputLabel id="raceLabel">Race</InputLabel>
					<Select
						labelId="raceLabel"
						id="raceSelect"
						value={race}
						onChange={handleRaceChange}
					>
						<MenuItem value={'Human'} id="human">Human</MenuItem>
						<MenuItem value={'Elf'} id="elf">Elf</MenuItem>
						<MenuItem value={'Dwarf'} id="dwarf">Dwarf</MenuItem>
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel id="classLabel">Class</InputLabel>
					<Select
						labelId="classLabel"
						id="classSelect"
						value={charClass}
						onChange={handleClassChange}
					>
						<MenuItem value={'Warrior'} id="warrior">Warrior</MenuItem>
						<MenuItem value={'Rogue'} id="rogue">Rogue</MenuItem>
						<MenuItem value={'Paladin'} id="paladin">Paladin</MenuItem>
					</Select>
				</FormControl>
				<div id="classDescription" style={{ opacity: descriptonDisplay }}>
					<div id="stats">
						<div className="health">HP: {health}</div>
						<div className="strength">Strength: {strength}</div>
						<div className="defense">Defense: {defense}</div>
						<div className="wisdom">Wisdom: {wisdom}</div>
						<div className="luck">Luck: {luck}</div>
					</div>
					<div id="desAndSkill">
						<div id="description">{description}</div>
						<h3 id="skillName">Skill</h3>
						<div id="skill">{skill}</div>
					</div>
				</div>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					disabled={race === '' || charClass === ''}
				>
                    Create
				</Button>
			</form>
			<DefaultPopup customClass="createSuccess" display={snackbarDisplay} setDisplay={setSnackbarDisplay} message={'Character created!'} destination="/select" snackbarColor="success" />
			<img src={smallLogo} alt="a small logo" id="smallLogo" />
		</Wrapper>

	);
};

BoundCreateCharacter.propTypes = {
	user: PropTypes.object,
	resetStore: PropTypes.func
};

BoundCreateCharacter.defaultProps = {
	user: {},
	resetStore: () => {}
};

const CreateCharacter = connect(mapStateToProps, mapDispatchToProps)(BoundCreateCharacter);

export default CreateCharacter;