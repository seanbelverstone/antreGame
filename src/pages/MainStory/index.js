import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import PropTypes from 'prop-types';
import Typewriter from 'typewriter-effect';
import { interpret, assign } from 'xstate';
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
import { stringToCamel, isBlacklistedChoice, isEmpty } from '../../utils/functions';
import storylines from '../../utils/storylines.json';
import attacks from '../../utils/attacks.js';
import createFightMachine from '../../utils/fightMachine';
//Assets
import smallLogo from '../../assets/images/Antre.png';
import './style.css';
import { withRouter } from '../../components/withRouter/withRouter';

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

class BoundMainStory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonDisabled: false,
			snackbarDisplay: false,
			initialLevel: '',
			currentLevel: '',
			storyText: '',
			attackText: '',
			modifier: [],
			options: [],
			visitedLevels: [],
			currentEnemy: {},
			enemyName: '',
			victoryTarget: '',
			enemyImage: '',
			imageDisplay: 'none',
			optionFade: 'hidden',
			enemyBlockFade: '',
			saveGameDisplay: false,
			typewriterDelay: 20,
			anchorEl: null,
			roundCount: 1,
			// this determines the width of the healthbar. Will change based on damage done
			enemyHealth: {
				width: '100%',
				current: 1,
				max: 100
			},
			userHealth: {
				width: '100%',
				current: 1,
				max: 100
			},
			// stats that will change and be passed to save function
			skillUsed: false,
			cooldownRound: 0,
			tempDefense: 0,
			tempLuck: 0,
			timer: 0,
			machineState: null
		};
	}

	service = interpret(createFightMachine(this.props)).onTransition(async (current) =>
		this.setState({ machineState: current })
	);

	componentDidMount() {
		this.mounted = true;
		this.initialize();
		this.service.start();
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
		this.mounted = false;
		this.service.stop();
	}

	updateState = (state, callback) => {
		this.mounted && this.setState(state, callback);
	}

	initialize = () => {
		const { stats, levels } = this.props;
		const { userHealth } = this.state;
		this.updateState({
			userHealth: {
				...userHealth,
				current: stats.health,
				max: stats.maxHealth
			},
			// sets the current level if visited has just been set, or if the user reloads.
			// ...(levels.visited.length <= 1 || window.performance.getEntriesByType('navigation')[0].type === 'reload') && {
			initialLevel: levels.current,
			visitedLevels: levels.visited
			// }
		}, () => this.handleText(levels.current));
		this.startTimer();
	}

	handleLevel = (choice) => {
		const { updateCharacter, levels } = this.props;
		// If the choice selected is one that repeats, don't add it to the visited array.
		if (isBlacklistedChoice(choice)) {
			updateCharacter({
				level: {
					current: choice
				}
			});
			this.handleText(choice);
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
			this.handleText(choice);
		}
	};

	handleText = (choice) => {
		// When a player dies, it puts them on 00-Death. This means that if they select this character
		// again, they'll remain dead.
		if (choice === '00-Death') {
			// handlePlayerDeath();
			return;
		}
		// loops through the storylines array, and matches the character's level with the corresponding object
		const levelMatch = storylines.filter(story => story.level === choice);
		if (!isEmpty(levelMatch)) {
			this.updateState({
				storyText: levelMatch[0].text,
				modifier: levelMatch[0].modifier,
				options: levelMatch[0].options,
				...(levelMatch[0].enemy ? {
					currentEnemy: levelMatch[0].enemy,
					enemyName: levelMatch[0].enemy.name.replace(' ', '_'),
					victoryTarget: levelMatch[0].victory,
					cooldownRound: 0,
					skillUsed: false
				} : {})
			}, this.handleOptionFadeIn);
			assign({
				currentLevel: levelMatch[0]
			});

		}
	};

	handleOptionFadeIn = (multi) => {
		const { storyText, currentEnemy } = this.state;
		this.updateState({
			optionFade: 'hidden'
		}, clearTimeout());
		setTimeout(() => {
			this.updateState({
				optionFade: 'fadeIn'
			}, this.checkModifier);
			!isEmpty(currentEnemy) && this.displayEnemy();
		}, storyText.split('').length * [multi ? multi : 10] + 2000);
	}

	// This function renders the decision buttons based on how long it takes to write the story text.
	// number of letters
	setButtonTimes = () => {
		const { storyText, typewriterDelay } = this.state;
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
		this.handleOptionFadeIn(speedMultiplier);
	};

	startTimer = () => {
		const { time } = this.props;
		let currentTime = time.value;
		setInterval(() => this.updateState({ timer: currentTime++ }), 1000);
	};

	stopTimer = () => {
		clearInterval();
	};

	checkModifier = () => {
		const { levels, updateCharacter, stats, inventory } = this.props;
		const { modifier, initialLevel, userHealth } = this.state;
		// checks if there are any modifiers present in this level, and if so sets the applicable one when the buttons render
		// If it's their saved level, they can't get the buff again.
		// Needed to add in an extra check for torchCheck only, as it wasn't playing nice
		console.log(modifier);
		if ((modifier.length && levels.current !== initialLevel) || modifier[0]?.torchCheck) {
			this.updateState({
				snackbarDisplay: true
			});
			modifier.forEach(mod => {
				const [currentMod] = Object.keys(mod);
				if (mod.weapon) {
					updateCharacter({
						inventory: {
							weapon: mod.weapon.name,
							weaponDamage: mod.weapon.dmg
						}
					});
					assign({
						weaponDamage: mod.weapon.dmg
					});
				} else if (mod.health) {
					const newHealth = userHealth.current + mod.health > userHealth.max ? userHealth.max : userHealth.current + mod.health;
					updateCharacter({
						stats: {
							health: newHealth
						}
					});
					this.updateState({
						userHealth: {
							...userHealth,
							current: newHealth
						}
					});
					assign({
						health: newHealth
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
					assign({
						[currentMod]: (context) => context[currentMod] + mod[currentMod]
					});
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
					currentMod === 'healthPotions' && assign({
						healthPotions: (context) => context.healthPotions + mod.healthPotions
					});
				} else if (mod.luckCheck) {
					this.updateState({
						snackbarDisplay: false
					});
					const checkingLuck = async () => {
						return attacks.campaignLuckCheck(stats.luck, mod.event);
					};
					checkingLuck().then((results) => {
						this.updateState({
							options: [
								{
									'label': results[0].label,
									'target': results[0].target
								}
							]});
					});
				} else if (mod.torchCheck) {
					this.updateState({
						snackbarDisplay: false
					});
					const checkingTorch = async () => {
						return attacks.torchCheck(inventory.torch);
					};
					checkingTorch().then((results) => {
						this.updateState({
							options: [
								{
									'label': results.label,
									'target': results.target
								}
							]});
					});
				} else {
					this.updateState({
						snackbarDisplay: false
					});
				}
			});
		}
	};

	// Checks that we're in a fight sequence, then displays the enemy based on what its name is. 
	displayEnemy = async () => {
		const { stats } = this.props;
		const { currentEnemy, modifier, enemyName } = this.state;
		if (modifier[0].fight) {
			this.updateState({
				userHealth: {
					current: stats.health,
					max: stats.maxHealth,
					width: `${(100 * stats.health) / stats.maxHealth}%`
				},
				enemyHealth: {
					current: currentEnemy.health,
					max: currentEnemy.health,
					width: '100%'
				},
				enemyImage: enemyName,
				imageDisplay: 'block',
				enemyBlockFade: 'fadeIn'
			});
		}
	};

	// This takes the value from the option, and sets the level and text based on its target
	handleClick = async (option) => {
		const { navigate } = this.props;
		this.updateClickedArray(option.target);
		this.updateState({
			optionFade: 'none',
			imageDisplay: 'none'
		}, () => this.handleLevel(option.target));
		if (option.target === 'Main Menu') {
			await this.saveGame();
			navigate('/select');

		}
	};

	updateClickedArray = (levelName) => {
		const { visitedLevels } = this.state;
		const levelAlreadyExists = visitedLevels.some(level => level === levelName);
		if (!levelAlreadyExists && !isBlacklistedChoice(levelName)) {
			this.updateState({
				visitedLevels: [...visitedLevels, levelName]
			});
		}
	}

	disableIfClicked = () => {
		const { levels } = this.props;
		const { options } = this.state;
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

	handleFight = (option) => {
		const { stats, updateCharacter } = this.props;
		const { charClass, defense, luck } = stats;
		const { cooldownRound, enemyHealth, userHealth } = this.state;
		const { send } = this.service;
		const camelOption = stringToCamel(option.label);
		const res = send({ type: camelOption });
		const skillButton = document.getElementById('useSkill');
		// resets buffs if the round is same as the specified cooldown one.
		if (res.context.roundCount === cooldownRound) {
			this.resetBuffs();
			skillButton.removeAttribute('style');
		}
		this.updateState({
			buttonDisabled: true
		});
		if (camelOption === 'normalAttack' || camelOption === 'specialAttack') {
			this.updateState({
				enemyHealth: {
					...enemyHealth,
					current: res.context.enemyHealth,
					width: `${(100 * res.context.enemyHealth) / enemyHealth.max}%`
				},
				attackText: res.context.battleText
			});
			res.context.enemyHealth <= 0 ? this.nextPhase() : this.enemyTurn(userHealth.current);
			// TODO: Add an "enemy defeated!" popup, maybe show rewards there too with an advance button
		} else if (camelOption === 'useSkill') {
			this.updateState({
				cooldownRound: res.context.cooldownRound,
				attackText: res.context.battleText
			});
			// sets a style to the skill button to make it the only one that continues being disabled.
			skillButton.setAttribute('style', 'pointer-events: none; color: rgba(0, 0, 0, 0.26) !important; box-shadow: none; background-color: rgba(0, 0, 0, 0.12) !important;');
			switch (charClass) {
			case 'Warrior':
				this.updateState({
					tempDefense: defense
				});
				updateCharacter({
					stats: {
						defense: defense + res.context.skillResult
					}
				});
				res.context.defense = defense + res.context.skillResult;
				this.enemyTurn(userHealth.current);
				break;
			case 'Rogue':
				this.updateState({
					tempLuck: luck
				});
				updateCharacter({
					stats: {
						luck: luck + res.context.skillResult
					}
				});
				res.context.luck = luck + res.context.skillResult;
				this.enemyTurn(userHealth.current);
				break;
			default:
				this.updateState({
					userHealth: {
						...userHealth,
						current: userHealth.max
					},
					attackText: res.context.battleText
				});
				this.enemyTurn(userHealth.max);
			}

		} else {
			// if the user's health with the increase added is MORE than their max, just set it to max.
			const finalHealth = userHealth.current + res.context.healthIncrease > userHealth.max ?
				userHealth.max : userHealth.current + res.context.healthIncrease;
			this.updateState({
				userHealth: {
					...userHealth,
					current: finalHealth,
					width: `${(100 * finalHealth) / userHealth.max}%`
				},
				attackText: res.context.battleText
			});
			this.enemyTurn(finalHealth);
		}

	};

	enemyTurn = (currentHealth) => {
		const { userHealth, roundCount } = this.state;
		const { send } = this.service;
		setTimeout(() => {
			const res = send({ type: 'enemyNormalAttack' });
			const damagedHealth = currentHealth - res.context.damage;
			const nextRound = roundCount + 1;
			this.updateState({
				userHealth: {
					...userHealth,
					current: damagedHealth,
					width: `${(100 * damagedHealth) / userHealth.max}%`
				},
				roundCount: nextRound,
				buttonDisabled: false,
				attackText: res.context.battleText
			});
		}, 3000);
		userHealth.current <= 0 && this.handlePlayerDeath();
	};

	// Sets the buffed status back to their original values
	resetBuffs = () => {
		const { updateCharacter } = this.props;
		const { tempDefense, tempLuck } = this.state;
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

	nextPhase = async () => {
		const { updateCharacter } = this.props;
		const { enemyHealth, userHealth, victoryTarget } = this.state;
		// set enemy health to 0, and reset buffs
		this.updateState({
			enemyHealth: {
				...enemyHealth,
				width: '0%',
				current: 0
			},
			buttonDisabled: false
		}, this.resetBuffs);
		updateCharacter({
			stats: {
				health: userHealth.current
			}
		});
		// Fade the image out after a second, so it's not jarringly quick.
		setTimeout(() => {
			this.updateState({
				enemyBlockFade: 'fadeOut'
			});
		}, 1000);
		// Once it's faded, wait another second and hide the image. Clear out the current enemy object and the image, and change the level.
		setTimeout(() => {
			this.updateState({
				enemyBlockFade: 'hidden',
				imageDisplay: 'none',
				currentEnemy: {},
				attackText: '',
				enemyImage: '',
				roundCount: 1,
			});
			this.handleLevel(victoryTarget.target);
		}, 2000);
	};

	handlePlayerDeath = async () => {
		const { updateCharacter } = this.props;
		await updateCharacter({
			stats: {
				health: 0
			}
		});
		await updateCharacter({
			levels: {
				current: '00-Death',
				visited: []
			}
		});
		this.updateState({
			enemyBlockFade: 'hidden',
			imageDisplay: 'none',
			currentEnemy: {},
			storyText: 'After fighting valliantly, you succumb to your wounds.',
			modifier: [
				{
					death: true
				}
			]
		}, this.saveGame());
	};

	handleMenuClick = (event) => {
		this.updateState({
			anchorEl: event.currentTarget
		});
	};

	handleMenuClose = (speed, reason) => {
		this.updateState({
			...(reason !== 'backdropClick' ? {
				typewriterDelay: speed
			}: {}),
			anchorEl: null
		});
	};

	saveGame = async () => {
		const { updateCharacter, levels, stats, inventory, user } = this.props;
		const { timer, visitedLevels } = this.state;
		updateCharacter({
			time: {
				value: timer
			}
		});
		await API.saveCharacter(
			stats,
			inventory,
			levels.current,
			visitedLevels,
			timer,
			user.jwtToken,
		);
		this.setSaveGameDisplayCallback(true);
	};

	setSaveGameDisplayCallback = (value) => {
		this.updateState({
			saveGameDisplay: value
		});
	}

	setSnackbarDisplayCallback = (value) => {
		const { modifier } = this.state;
		this.updateState({
			snackbarDisplay: value,
			...(!value && !modifier[0].fight ? { enemyName: '' } : {})
		});
	}

	logout = () => {
		const { resetStore, navigate } = this.props;
		this.stopTimer();
		resetStore();
		navigate('/');
	};
	render() {
		const { stats, navigate } = this.props;
		const {
			buttonDisabled,
			anchorEl,
			storyText,
			typewriterDelay,
			imageDisplay,
			enemyBlockFade,
			currentEnemy,
			enemyHealth,
			enemyImage,
			userHealth,
			optionFade,
			attackText,
			modifier,
			options,
			saveGameDisplay,
			snackbarDisplay,
			enemyName,
			visitedLevels
		} = this.state;
		return (
			<Wrapper page="main">
				<div className="topRow">
					<Button
						className="primaryOutlinedButton"
						variant="outlined"
						id="logout"
						onClick={this.logout}
						disabled={buttonDisabled}
					>LOG OUT</Button>
					<img src={smallLogo} alt="a small logo" id="smallLogo" />
					<a id="back" onClick={() => navigate('/select')}>QUIT TO<br />MAIN MENU</a>
				</div>
				<section className="textArea">
					<Button aria-controls="simple-menu" aria-haspopup="true" id="speedButton" onClick={this.handleMenuClick}>
						{'Text Speed >>'}
					</Button>
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={this.handleMenuClose}
						elevation={0}
					>
						<MenuItem onClick={() => this.handleMenuClose(40)}>Slow</MenuItem>
						<MenuItem onClick={() => this.handleMenuClose(20)}>Medium</MenuItem>
						<MenuItem onClick={() => this.handleMenuClose(1)}>Fast</MenuItem>
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
					attackText={attackText}
				/>
				<div id="optionArea" className={optionFade}>
					<ChoiceBlock
						modifier={modifier}
						optionFade={optionFade}
						options={options}
						buttonDisabled={buttonDisabled}
						handleFight={this.handleFight}
						handleClick={this.handleClick}
						enemyDefense={currentEnemy.defense}
						visitedLevels={visitedLevels}
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
							onClick={this.saveGame}
						>Save Game</Button>
					</div>
				</footer>
				<DefaultPopup customClass="saveSuccess" display={saveGameDisplay} setDisplay={this.setSaveGameDisplayCallback} message={'Game saved!'} destination="" snackbarColor="success" />
				<SuccessScreen
					display={snackbarDisplay}
					setDisplay={this.setSnackbarDisplayCallback}
					items={modifier}
					enemyName={enemyName}
				/>
			</Wrapper>

		);
	}

}

BoundMainStory.propTypes = {
	navigate: PropTypes.func,
	updateCharacter: PropTypes.func,
	inventory: PropTypes.object,
	stats: PropTypes.object,
	levels: PropTypes.object,
	time: PropTypes.object,
	user: PropTypes.object,
	resetStore: PropTypes.func
};

BoundMainStory.defaultProps = {
	navigate: () => {},
	updateCharacter: () => {},
	inventory: {},
	stats: {},
	levels: {},
	time: {},
	user: {},
	resetStore: () => {}
};

const MainStory = connect(mapStateToProps, mapDispatchToProps)(BoundMainStory);

export default withRouter(MainStory);