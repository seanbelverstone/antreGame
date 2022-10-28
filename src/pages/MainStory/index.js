/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import PropTypes from 'prop-types';
import Typewriter from 'typewriter-effect';
import { useMachine } from '@xstate/react';
//MaterialUi
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//Component Imports
import Wrapper from '../../components/Wrapper';
import Inventory from '../../components/Inventory';
import SuccessScreen from '../../components/SuccessScreen';
import DefaultPopup from '../../components/DefaultPopup';
import ChoiceBlock from '../../components/ChoiceBlock';
import Enemy from '../../components/Enemy';
//Utils
import API from '../../utils/API';
import { stringToCamel, isBlacklistedChoice } from '../../utils/functions';
import storylines from '../../utils/storylines.json';
import attacks from '../../utils/attacks.js';
import createFightMachine from '../../utils/fightMachine';
//Assets
import smallLogo from '../../assets/images/Antre.png';
import './style.css';

const mapStateToProps = (state) => {
	return {
		updateCharacter: state.updateCharacter,
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

const BoundMainStory = (props) => {
	let history = useNavigate();
	const { updateCharacter, inventory, stats, levels, time, user, resetStore } = props;

	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [snackbarDisplay, setSnackbarDisplay] = useState(true);

	const [initalLevel, setInitalLevel] = useState('');
	const [storyText, setStoryText] = useState('');
	const [attackText, setAttackText] = useState('');
	const [modifier, setModifier] = useState([]);
	const [options, setOptions] = useState([]);
	const [currentEnemy, setCurrentEnemy] = useState({});
	const [enemyName, setEnemyName] = useState('');
	const [victoryTarget, setVictoryTarget] = useState({});
	const [enemyImage, setEnemyImage] = useState('');
	const [imageDisplay, setImageDisplay] = useState('none');
	const [optionFade, setOptionFade] = useState('hidden');
	const [enemyBlockFade, setEnemyBlockFade] = useState('hidden');
	const [attackDisplay, setAttackDisplay] = useState('none');
	const [saveGameDisplay, setSaveGameDisplay] = useState(false);
	const [typewriterDelay, setTypewriterDelay] = useState(20);
	const [anchorEl, setAnchorEl] = useState(null);
	const [roundCount, setRoundCount] = useState(1);

	// this determines the width of the healthbar. Will change based on damage done
	const [enemyHealth, setEnemyHealth] = useState({
		width: '100%',
		current: 1,
		max: 100
	});
	const [userHealth, setUserHealth] = useState({
		width: '100%',
		current: stats.health,
		max: stats.maxHealth
	});

	// stats that will change and be passed to save function
	const [skillUsed, setSkillUsed] = useState(false);
	const [cooldownRound, setCooldownRound] = useState(0);
	const [tempDefense, setTempDefense] = useState(0);
	const [tempLuck, setTempLuck] = useState(0);
	const [timer, setTimer] = useState(0);
	const [state, send] = useMachine(() => createFightMachine(props, setAttackText));

	useEffect(() => {
		// sets the current level if visited has just been set, or if the user reloads.
		// Aids the check in checkModifier to prevent users from reloading for unlimited buffs
		if (levels.visited.length <= 1 || window.performance.getEntriesByType('navigation')[0].type === 'reload') {
			setInitalLevel(levels.current);
		}
		window.onbeforeunload = () => {
			setInitalLevel(levels.current);
		};
		startTimer();

		// prevents scrollIntoView error
		return () => {
			setEnemyBlockFade('hidden');
			clearInterval(startTimer);
		};
	}, []);

	useEffect(() => {
		handleText(levels.current);
	}, [levels]);

	useEffect(() => {
		disableIfClicked();
		checkModifier();
	}, [storyText]);

	useEffect(() => {
		setButtonTimes();
		return () => {
			clearTimeout(setButtonTimes);
		};
	}, [typewriterDelay, storyText]);

	// useEffect(() => {
	// 	// Health bars now update based on the enemy and user's health
	// 	setHealthWidth();
	// }, [currentEnemyHealth, currentUserHealth]);
    
	const handleLevel = (choice) => {
		// If the choice selected is one that repeats, don't add it to the visited array.
		if (isBlacklistedChoice(choice)) {
			updateCharacter({
				level: {
					current: choice
				}
			});
			handleText(choice);
		} else {
			updateCharacter({
				levels: {
					visited: [
						...levels.visited,
						choice
					],
					current: choice
				}
			});
			handleText(choice);
		}
	};

	const handleText = (choice) => {
		// When a player dies, it puts them on 00-Death. This means that if they select this character
		// again, they'll remain dead.
		if (choice === '00-Death') {
			// handlePlayerDeath();
			return;
		}
		// loops through the storylines array, and matches the character's level with the corresponding object
		for (let i = 0; i < storylines.length; i++) {
			if (storylines[i].level === choice) {
				setStoryText(storylines[i].text);
				setModifier(storylines[i].modifier);
				setOptions(storylines[i].options);
				if (storylines[i].enemy) {
					setCurrentEnemy(storylines[i].enemy);
					// if the enemy has two words in its name, it replaces the space with an underscore for importing
					setEnemyName(storylines[i].enemy.name.replace(' ', '_'));
					setVictoryTarget(storylines[i].victory);
					setCooldownRound(0);
					setSkillUsed(false);
				}
			}
		}
	};

	// This function renders the decision buttons based on how long it takes to write the story text.
	// number of letters
	const setButtonTimes = () => {
		let speedMultiplier;
		clearTimeout();
		if (storyText.length === 0) {
			return;
		}
		switch (typewriterDelay) {
		case 1:
			speedMultiplier = 11;
			break;
		case 20:
			speedMultiplier = 30;
			break;
		case 40:
			speedMultiplier = 44;
			break;
		}
		setTimeout(() => {
			setOptionFade('fadeIn');
			if (currentEnemy !== {} && enemyHealth.current !== currentEnemy.health) {
				displayEnemy();
			}
		}, (storyText.split('').length * speedMultiplier + 2000));

	};

	const startTimer = () => {
		let currentTime = time.value;
		setInterval(() => setTimer(currentTime++), 1000);
	};

	const stopTimer = () => {
		clearInterval(startTimer);
	};

	const checkModifier = () => {
		// checks if there are any modifiers present in this level, and if so sets the applicable one when the buttons render
		// If it's their saved level, they can't get the buff again.
		// Needed to add in an extra check for torchCheck only, as it wasn't playing nice
		if ((modifier.length && levels.current !== initalLevel) || modifier[0]?.torchCheck) {
			setSnackbarDisplay(true);
			modifier.forEach(mod => {
				const currentMod = Object.keys(mod)[0];
				if (mod.weapon) {
					updateCharacter({
						inventory: {
							weapon: mod.weapon.name,
							weaponDamage: mod.weapon.dmg
						}
					});
					state.context.weaponDamage = mod.weapon.dmg;
				} else if (mod.health) {
					updateCharacter({
						stats: {
							health: stats.health + mod.health > userHealth?.max ? userHealth.max : stats.health + mod.health
						}
					});
				} else if (currentMod === 'strength' ||
                    currentMod === 'defense' ||
                    currentMod === 'wisdom' ||
                    currentMod === 'luck') {
					updateCharacter({
						stats: {
							[currentMod]: stats[currentMod] + mod[currentMod]
						}
					});
					state.context[currentMod] = stats[currentMod] + mod[currentMod];
				} else if (currentMod === 'head' ||
                    currentMod === 'chest' ||
                    currentMod === 'legs' ||
                    currentMod === 'hands' ||
                    currentMod === 'feet' ||
                    currentMod === 'torch' ||
                    currentMod === 'amulet') {
					updateCharacter({
						inventory: {
							[currentMod]: mod[currentMod]
						}
					});
				} else if (currentMod === 'healthPotions' || currentMod === 'gold') {
					updateCharacter({
						inventory: {
							[currentMod]: inventory[currentMod] + mod[currentMod] < 0 ? 0 : inventory[currentMod] + mod[currentMod]
						}
					});
					currentMod === 'healthPotions' && (state.context.healthPotions += mod.healthPotions);
				} else if (mod.luckCheck) {
					setSnackbarDisplay(false);
					const checkingLuck = async () => {
						return attacks.campaignLuckCheck(stats.luck, mod.event);
					};
					checkingLuck().then((results) => {
						setOptions([
							{
								'label': results[0].label,
								'target': results[0].target
							}
						]);
					});
				} else if (mod.torchCheck) {
					setSnackbarDisplay(false);
					const checkingTorch = async () => {
						return attacks.torchCheck(inventory.torch);
					};
					checkingTorch().then((results) => {
						setOptions([
							{
								'label': results.label,
								'target': results.target
							}
						]);
					});
				} else {
					setSnackbarDisplay(false);
				}
			});
		}
	};

	// Checks that we're in a fight sequence, then displays the enemy based on what its name is. 
	const displayEnemy = async () => {
		console.log(currentEnemy);
		if (modifier[0].fight && modifier.length < 2) {
			setUserHealth({ current: stats.health, max: stats.maxHealth, width: `${(100 * stats.health) / stats.maxHealth}%` });
			setEnemyHealth({ current: currentEnemy.health, max: currentEnemy.health, width: '100%' });
			setEnemyImage(enemyName);
			setAttackDisplay('flex');
			setImageDisplay('block');
			setEnemyBlockFade('fadeIn');
			setTimeout(() => {
				if (enemyBlockFade === 'fadeIn') {
					const enemyBlock = document.getElementById('enemyBlock');
					enemyBlock.scrollIntoView({ behavior: 'smooth' });
				}
			}, 1000);
		}
		return;
	};

	// This takes the value from the option, and sets the level and text based on its target
	const handleClick = (option) => {
		// updateClickedArray(option);
		handleLevel(option.target);
		setOptionFade('none');
		setImageDisplay('none');
		if (option.target === 'Main Menu') {
			saveGame().then(() => history('/select'));

		}
	};

	const disableIfClicked = () => {
		if (!options) {
			return;
		}
		for (let item of options) {
			if (levels.visited.includes(item.target)) {
				let disabledElement = document.getElementById(stringToCamel(item.label));
				disabledElement.classList.add('Mui-disabled');
			}
		}
	};

	const handleFight = (option) => {
		const camelOption = stringToCamel(option.label);
		const res = send({ type: camelOption });
		const skillButton = document.getElementById('useSkill');
		// resets buffs if the round is same as the specified cooldown one.
		if (res.roundCount === cooldownRound) {
			resetBuffs();
			skillButton.removeAttribute('style');
		}
		setButtonDisabled(true);
		if (camelOption === 'normalAttack' || camelOption === 'specialAttack') {
			setEnemyHealth({
				...enemyHealth,
				current: res.context.enemyHealth,
				width: `${(100 * res.context.enemyHealth) / enemyHealth.max}%`
			});
			console.log(enemyHealth.current);
			res.context.enemyHealth <= 0 ? nextPhase() : enemyTurn(userHealth.current);
			// TODO: Add an "enemy defeated!" popup, maybe show rewards there too with an advance button
		} else if (camelOption === 'useSkill') {
			const { charClass, defense, luck } = stats;
			console.log('cooldownRound', res.context.cooldownRound);
			setCooldownRound(res.context.cooldownRound);
			// sets a style to the skill button to make it the only one that continues being disabled.
			skillButton.setAttribute('style', 'pointer-events: none; color: rgba(0, 0, 0, 0.26) !important; box-shadow: none; background-color: rgba(0, 0, 0, 0.12) !important;');
			switch (charClass) {
			case 'Warrior':
				setTempDefense(defense);
				updateCharacter({
					stats: {
						defense: defense + res.context.skillResult
					}
				});
				state.context.defense = defense + res.context.skillResult;
				enemyTurn(userHealth.current);
				break;
			case 'Rogue':
				setTempLuck(luck);
				updateCharacter({
					stats: {
						luck: luck + res.context.skillResult
					}
				});
				state.context.luck = luck + res.context.skillResult;
				enemyTurn(userHealth.current);
				break;
			default:
				setUserHealth({
					...userHealth,
					current: userHealth.max
				});
				enemyTurn(userHealth.max);
			}
			
		} else {
		// if the user's health with the increase added is MORE than their max, just set it to max.
			console.log(res.context.healthIncrease);
			const finalHealth = userHealth.current + res.context.healthIncrease > userHealth.max ?
				userHealth.max : userHealth.current + res.context.healthIncrease;
			setUserHealth({
				...userHealth,
				current: finalHealth,
				width: `${(100 * finalHealth) / userHealth.max}%`
			});
			enemyTurn(finalHealth);
		}
		
	};

	const enemyTurn = (currentHealth) => {
		setTimeout(() => {
			const res = send({ type: 'enemyNormalAttack' });
			const damagedHealth = currentHealth - res.context.damage;
			setUserHealth({
				...userHealth,
				current: damagedHealth,
				width: `${(100 * damagedHealth) / userHealth.max}%`
			});
			setRoundCount(current => current + 1);
			setButtonDisabled(false);
		}, 3000);
		userHealth.current <= 0 && handlePlayerDeath();
	};

	// Sets the buffed status back to their original values
	const resetBuffs = () => {
		if (tempDefense !== 0) {
			updateCharacter({
				stats: {
					defense: tempDefense
				}
			});
		} else if (tempLuck !== 0) {
			updateCharacter({
				stats: {
					luck: tempLuck
				}
			});
		}
	};

	const nextPhase = async () => {
		// set enemy health to 0, and reset buffs
		setEnemyHealth({
			...enemyHealth,
			width: '0%',
			current: 0
		});
		resetBuffs();
		updateCharacter({
			stats: {
				health: userHealth.current
			}
		});
		setButtonDisabled(false);
		// Fade the image out after a second, so it's not jarringly quick.
		setTimeout(() => {
			setAttackDisplay('none');
			setEnemyBlockFade('fadeOut');
		}, 1000);
		// Once it's faded, wait another second and hide the image. Clear out the current enemy object and the image, and change the level.
		setTimeout(() => {
			setEnemyBlockFade('hidden');
			setImageDisplay('none');
			setCurrentEnemy({});
			setAttackText('');
			setEnemyImage('');
			setRoundCount(1);
			handleLevel(victoryTarget.target);
		}, 2000);
		checkModifier();
	};

	const handlePlayerDeath = async () => {
		setEnemyBlockFade('hidden');
		setImageDisplay('none');
		setCurrentEnemy({});
		setStoryText('After fighting valliantly, you succumb to your wounds.');
		setAttackDisplay('none');
		setModifier([
			{
				'death': true
			}
		]);
		updateCharacter({
			stats: {
				health: 0
			}
		});
		updateCharacter({
			levels: {
				current: '00-Death',
				visited: []
			}
		});
		saveGame();
	};

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = (speed, reason) => {
		if (reason !== 'backdropClick') {
			setTypewriterDelay(speed);
		}
		setAnchorEl(null);
	};

	const saveGame = () => {
		updateCharacter({
			time: {
				value: timer
			}
		});
		console.log(levels.current);
		API.saveCharacter(
			stats,
			inventory,
			levels.current,
			timer,
			user.jwtToken
		).then(() => {
			setSaveGameDisplay(true);
		});
	};

	const logout = () => {
		stopTimer();
		resetStore();
		history('/');
	};

	return (
		<Wrapper page="main">
			<div className="topRow">
				<Button
					className="primaryOutlinedButton"
					variant="outlined"
					id="logout"
					onClick={logout}
					disabled={buttonDisabled}
				>LOG OUT</Button>
				<img src={smallLogo} alt="a small logo" id="smallLogo" />
				<a id="back" onClick={() => history('/select')}>QUIT TO<br />MAIN MENU</a>
			</div>
			<section className="textArea">
				<Button aria-controls="simple-menu" aria-haspopup="true" id="speedButton" onClick={handleMenuClick}>
					{'Text Speed >>'}
				</Button>
				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					elevation={0}
				>
					<MenuItem onClick={() => handleMenuClose(40)}>Slow</MenuItem>
					<MenuItem onClick={() => handleMenuClose(20)}>Medium</MenuItem>
					<MenuItem onClick={() => handleMenuClose(1)}>Fast</MenuItem>
				</Menu>
				<Typewriter
					options={{
						strings: storyText,
						autoStart: true,
						loop: false,
						delay: typewriterDelay,
						wrapperClassName: 'text'
					}}
				/>
			</section>
			<Enemy
				imageDisplay={imageDisplay}
				enemyBlockFade={enemyBlockFade}
				currentEnemy={currentEnemy}
				currentEnemyHealth={enemyHealth.current}
				enemyHealthWidth={enemyHealth.width}
				enemyImage={enemyImage}
				characterName={stats.name}
				currentUserHealth={userHealth.current === 1 ? stats.health : userHealth.current}
				maxHealth={userHealth.max}
				userHealthWidth={userHealth.width}
				optionFade={optionFade}
				attackDisplay={attackDisplay}
				attackText={attackText}
			/>
			<div id="optionArea" className={optionFade}>
				<ChoiceBlock
					modifier={modifier}
					optionFade={optionFade}
					options={options}
					buttonDisabled={buttonDisabled}
					handleFight={handleFight}
					handleClick={handleClick}
					enemyDefense={currentEnemy.defense}
				/>
			</div>
			<footer id="footer">
				<Inventory
					health={userHealth.current === 1 ? stats.health : userHealth.current}
					maxHealth={userHealth.max}
					userHealthWidth={(100 * (userHealth.current === 1 ? stats.health : userHealth.current)) / userHealth.max}
				/>
				<div>
					<Button
						className="primaryButton"
						type="button"
						id="save"
						variant="contained"
						disabled={buttonDisabled}
						onClick={() => saveGame()}
					>Save Game</Button>
				</div>
			</footer>
			<DefaultPopup customClass="saveSuccess" display={saveGameDisplay} setDisplay={setSaveGameDisplay} message={'Game saved!'} destination="" snackbarColor="success" />
			<SuccessScreen display={snackbarDisplay} setDisplay={setSnackbarDisplay} items={modifier} enemyName={enemyName} />
		</Wrapper>

	);
};

BoundMainStory.propTypes = {
	updateCharacter: PropTypes.func,
	inventory: PropTypes.object,
	stats: PropTypes.object,
	levels: PropTypes.object,
	time: PropTypes.object,
	user: PropTypes.object,
	resetStore: PropTypes.func
};

BoundMainStory.defaultProps = {
	updateCharacter: () => {},
	inventory: {},
	stats: {},
	levels: {},
	time: {},
	user: {},
	resetStore: () => {}
};

const MainStory = connect(mapStateToProps, mapDispatchToProps)(BoundMainStory);

export default MainStory;