import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button } from '@mui/material/Button';
import { navigate } from 'hookrouter';
import DeleteButton from '../DeleteButton';
import { isBlacklistedChoice } from '../../utils/functions';
import './style.css';
import API from '../../utils/API';

const mapStateToProps = (state) => {
	return {
		inventory: state.updateCharacter.inventory,
		stats: state.updateCharacter.stats,
		levels: state.updateCharacter.levels,
		time: state.updateCharacter.time,
		user: state.authenticateUser.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};

const BoundCharacterBlock = (props) => {
	const { updateCharacter, character, user } = props;
	const [timePlayed, setTimePlayed] = useState('');
	useEffect(() => {
		calculateTime();
	}, []);
    
	const playThisCharacter = (selectedCharacter) => {
		updateCharacter({
			inventory: {
				weapon: selectedCharacter.weapon,
				weaponDamage: selectedCharacter.weaponDamage,
				head: selectedCharacter.head,
				chest: selectedCharacter.chest,
				legs: selectedCharacter.legs,
				hands: selectedCharacter.hands,
				feet: selectedCharacter.feet,
				torch: selectedCharacter.torch,
				amulet: selectedCharacter.amulet,
				healthPotions: selectedCharacter.healthPotions,
				gold: selectedCharacter.gold
			}
		});
		updateCharacter({
			stats: {
				id: selectedCharacter.id,
				name: selectedCharacter.name,
				race: selectedCharacter.race,
				charClass: selectedCharacter.charClass,
				health: selectedCharacter.health,
				strength: selectedCharacter.strength,
				defense: selectedCharacter.defense,
				wisdom: selectedCharacter.wisdom,
				luck: selectedCharacter.luck
			}

		});
		updateCharacter({
			levels: {
				visited: [
					isBlacklistedChoice(selectedCharacter.level) ? '01-Start' : selectedCharacter.level
				],
				current: selectedCharacter.level
			}
		});
		updateCharacter({
			time: {
				value: selectedCharacter.time
			}
		});
		navigate('/play');
	};

	const calculateTime = () => {
		const minutes = Math.floor(character.time / 60);
		const seconds = character.time - minutes * 60;
		const prettySeconds = seconds < 10 ? `0${seconds}` : seconds;
		setTimePlayed(`${minutes}:${prettySeconds}`);
	};

	const handleDelete = (value) => {
		if (value) {
			API.deleteCharacter(character.id.toString(), user.jwtToken)
				.then(() => 
					location.reload());
		}
	};

	return(
		<div className="characterBlock">
			<div className="characterWrapper">

				<section className="identity">
					<div className="name">{character.name}</div>
					<section className="raceAndClass">
						<div className="race">{character.race}</div>
						<div className="charClass">  {character.charClass}</div>
					</section>
				</section>

				<section className="stats">
					<section className="health">
						<div className="subHeadings">HP</div>
						<div>{character.health}</div>
					</section>
					<section className="strength">
						<div className="subHeadings">Str</div>
						<div>{character.strength}</div>
					</section>
					<section className="defense">
						<div className="subHeadings">Def</div>
						<div>{character.defense}</div>
					</section>
					<section className="wisdom">
						<div className="subHeadings">Wis</div>
						<div>{character.wisdom}</div>
					</section>
					<section className="luck">
						<div className="subHeadings">Luck</div>
						<div>{character.luck}</div>
					</section>                 
				</section>

				<section className="levelAndTime">
					<section className="level">
						<div className="subHeadings">Level</div>   
						<div>{character.level}</div>
					</section>
					<section  className="time">
						<div className="subHeadings">Time</div>
						<div>{timePlayed}</div>
					</section>                    
				</section>
			</div>
			<section className="charButtons">
				<Button variant="contained" color="primary" id="play" onClick={() => playThisCharacter(character)}>
                    PLAY
				</Button>

				<DeleteButton
					id={character.id.toString()}
					jwtToken={user.jwtToken}
					customText="Are you sure you want to delete this character?"
					callback={handleDelete}
				/>
			</section>
		</div>
	);
};

BoundCharacterBlock.propTypes = {
	updateCharacter: PropTypes.func,
	character: PropTypes.object,
	inventory: PropTypes.object,
	stats: PropTypes.object,
	levels: PropTypes.object,
	time: PropTypes.object,
	user: PropTypes.object
};

BoundCharacterBlock.defaultProps = {
	updateCharacter: () => {},
	inventory: {},
	stats: {},
	levels: {},
	time: {},
	user: {}
};

const CharacterBlock = connect(mapStateToProps, mapDispatchToProps)(BoundCharacterBlock);

export default CharacterBlock;