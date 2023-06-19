import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../redux/actions/actionCreators';
import { stringToCamel } from '../../utils/functions';
import Info from '../Info';
import Button from '@mui/material/Button';
import './style.css';

const mapStateToProps = (state) => {
	return {
		inventory: state.updateCharacter.inventory,
		stats: state.updateCharacter.stats
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};

const BoundChoiceBlock = (props) => {
	const {
		inventory,
		stats,
		modifier,
		optionFade,
		options,
		buttonDisabled,
		handleFight,
		handleClick,
		enemyDefense,
		visitedLevels,
		tempDefense,
		tempLuck,
		roundsTilCooldown
	} = props;
	const { weaponDamage } = inventory;
	const { charClass, strength, wisdom } = stats;

	const normalMinDamage = Math.ceil(((weaponDamage * 1) + (strength * 2)) / enemyDefense);
	const normalMaxDamage = Math.ceil(((weaponDamage * 6) + (strength * 2)) / enemyDefense);
	const specialMinDamage = Math.ceil((((3 * weaponDamage) * 1) + (strength * 3)) / enemyDefense);
	const specialMaxDamage = Math.ceil((((3 * weaponDamage) * 6) + (strength * 3)) / enemyDefense);
	const minHealthIncrease = (1 * 1) + 15;
	const maxHealthIncrease = (6 * 6) + 15;
	let currentSkill;
	let skillText;
	let cooldownLength;

	if (wisdom <= 2) {
		cooldownLength = 5;
	} else if (wisdom > 2 && wisdom <= 4) {
		cooldownLength = 4;
	} else if (wisdom > 4 && wisdom <= 6) {
		cooldownLength = 3;
	} else if (wisdom > 6 && wisdom <= 8) {
		cooldownLength = 2;
	} else if (wisdom > 8 && wisdom <= 10) {
		cooldownLength = 1;
	} else {
		cooldownLength = 0;
	}

	switch (charClass) {
	case 'Warrior':
		currentSkill = 'Stalwart Defense';
		skillText = 'The warrior\'s skill grants a temporary increase to defense, making it more difficult for enemies to inflict damage upon you.';
		break;
	case 'Rogue':
		currentSkill = 'Gambler\'s Strike';
		skillText = 'The rogue\'s skill grants a temporary increase to luck, providing a much higher chance to perform a critical hit on the next turn.';
		break;
	case 'Paladin':
		currentSkill = 'Holy Remedy';
		skillText = 'The paladin\'s skill fully restores health.';
		break;
	default: return;
	}

	const renderSkillText = (label) => {
		if (roundsTilCooldown > 0 && tempDefense > 0) {
			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<p className="extraText" style={{ color: 'var(--defense)' }}>Defense +20</p>
					<p className="extraText">Cooldown: {roundsTilCooldown}</p>
				</div>
			);
		}
		if (roundsTilCooldown > 0 && tempLuck > 0) {
			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<p style={{ color: 'var(--luck)', height: 'min-content', margin: 0 }}>Luck +20</p>
					<p style={{ height: 'min-content', margin: 0 }}>Cooldown: {roundsTilCooldown}</p>
				</div>
			);
		}
		return label;
	};

	const renderEffectivenessValues = (type) => {
		if (type === 'normalAttack') {
			return <p className="extraText">{`(${normalMinDamage}-${normalMaxDamage})`}</p>;
		}
		if (type === 'specialAttack') {
			return <p className="extraText">{`(${specialMinDamage}-${specialMaxDamage})`}</p>;
		}
		if (type === 'useHealthPotion') {
			return <p className="extraText">{`(${minHealthIncrease}-${maxHealthIncrease})`}</p>;
		}
	};

	const fightInfo = {
		title: 'Combat',
		main: [
			{
				header: 'Normal Attack',
				subheading: `${normalMinDamage} - ${normalMaxDamage} dmg`,
				body: 'The most reliable of choices, a normal attack never misses.'
			},
			{
				header: 'Special Attack',
				subheading: `${specialMinDamage} - ${specialMaxDamage} dmg`,
				body: 'Powerful but with a chance to miss, a special attack can sometimes be a risky choice but can take down enemies quickly. There is also a reduced chance for a critical hit when performing a special attack.'
			},
			{
				header: 'Critical Hits',
				subheading: 'Hit them where it hurts.',
				body: 'A critical hit strikes an enemy in a weak spot and does 3x regular damage. High luck stats increase your chance of hitting one, but be warned - enemies can get lucky too.'
			},
			{
				header: 'Use Health Potion',
				subheading: `Restores ${minHealthIncrease} - ${maxHealthIncrease} hp`,
				body: 'Use one of the potions in your inventory to restore some health. But be warned, you\'ll lose a turn if you don\'t have any left!'
			},
			{
				header: 'Use Skill',
				subheading: `${currentSkill}\n ${cooldownLength} round cooldown.`,
				body: skillText
			}
		]
	};
	if (modifier[0] !== undefined && modifier[0].death) {
		return (
			<div>
				<p className={`options ${optionFade} title`}>You died.</p>
			</div>
		);
	} else if (modifier[0] != undefined && modifier[0].fight) {
		// If fight: true appears in the decision block, render the fight screen instead.
		return <>
			{options.map(fightOption => {
				return (
					<div className={`options ${optionFade}`} key={fightOption.label}>
						<Button
							className="optionText choiceButton"
							variant="contained"
							color="secondary"
							id={stringToCamel(fightOption.label)}
							onClick={() => handleFight(fightOption)}
							disabled={buttonDisabled}
						>
							{stringToCamel(fightOption.label) === 'useSkill' ? renderSkillText(fightOption.label) : fightOption.label}
							{renderEffectivenessValues(stringToCamel(fightOption.label))}
						</Button>
					</div>
				);
			})}
			<Info infoProps={fightInfo} optionFade={optionFade} />
		</>;
	} else {
		// Otherwise, show the option page
		return options.map(option => {
			return (
				<div className={`options ${optionFade}`} key={option.label}>
					<Button
						className="optionText primaryButton"
						variant="contained"
						id={stringToCamel(option.label)}
						onClick={() => handleClick(option)}
						disabled={visitedLevels.includes(option.target)}>
						{option.label}
					</Button>
				</div>
			);
		});
	}
};

BoundChoiceBlock.propTypes = {
	inventory: PropTypes.object,
	stats: PropTypes.object,
	modifier: PropTypes.oneOfType([PropTypes.array]),
	optionFade: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.array]),
	buttonDisabled: PropTypes.bool,
	handleFight: PropTypes.func,
	handleClick: PropTypes.func,
	enemyDefense: PropTypes.number,
	visitedLevels: PropTypes.oneOfType([PropTypes.array]),
	tempDefense: PropTypes.number,
	tempLuck: PropTypes.number,
	roundsTilCooldown: PropTypes.number
};

BoundChoiceBlock.defaultProps = {
	inventory: {},
	stats: {},
	modifier: [],
	optionFade: '',
	options: [],
	buttonDisabled: false,
	handleFight: () => {},
	handleClick: () => {},
	enemyDefense: 0,
	visitedLevels: [],
	tempDefense: 0,
	tempLuck: 0,
	roundsTilCooldown: 0
};

const ChoiceBlock = connect(mapStateToProps, mapDispatchToProps)(BoundChoiceBlock);

export default ChoiceBlock;