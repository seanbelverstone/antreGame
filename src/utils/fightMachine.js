/* eslint-disable no-unused-vars */
import { createMachine, assign } from 'xstate';
import attacks from './attacks';
import storylines from './storylines.json';
import { isEmpty } from './functions';


// TODO
// - add functions for skill/health
// - pass in updateHealth methods from parent to update the state in the parent, or set the health based on the machine's response
// - Add `guarded conditional functions` where we'll only do attacks if enemy/user is alive

export const fightMachine = createMachine({
	id: 'fightMachine',
	initial: 'BATTLE_START',
	predictableActionArguments: true,
	context: {
		roundCount: 1,
		charClass: '',
		health: 1,
		strength: 1,
		defense: 1,
		wisdom: 1,
		luck: 1,
		weapon: 'none',
		weaponDamage: 1,
		healthPotions: 0,
		currentLevel: '01-Start',
		// enemy stats
		enemyHealth: 1,
		enemyStrength: 1,
		enemyDefense: 1,
		enemyWisdom: 1,
		enemyLuck: 1,
		enemyWeapon: 'none',
		enemyWeaponDamage: 1
	},
	states: {
		BATTLE_START: {
			on: {
				updateValues: {
					target: 'USER_TURN',
					actions: assign((context, event) => {
						const { data } = event;
						const { stats, inventory, levels } = data;
						const currentStory = storylines.find(story => story.level === levels?.current);
						return {
							roundCount: 1,
							charClass: stats.charClass,
							health: stats?.health,
							strength: stats?.strength,
							defense: stats?.defense,
							wisdom: stats?.wisdom,
							luck: stats?.luck,
							weapon: inventory?.weapon,
							weaponDamage: inventory?.weaponDamage,
							healthPotions: inventory?.healthPotions,
							currentLevel: levels?.current,
							// enemy stats
							...(!isEmpty(currentStory.enemy) && {
								enemyHealth: currentStory.enemy.health,
								enemyStrength: currentStory.enemy.strength,
								enemyDefense: currentStory.enemy.defense,
								enemyWisdom: currentStory.enemy.wisdom,
								enemyLuck: currentStory.enemy.luck,
								enemyWeapon: currentStory.enemy.weapon.name,
								enemyWeaponDamage: currentStory.enemy.weapon.dmg
							})
						};
					})
				}
			}
		},
		USER_TURN: {
			on: {
				normalAttack: {
					// normalAttack is an action.
					target: 'ENEMY_TURN',
					actions: assign((context, event) => {
						const normalAttack = attacks.normalAttack(
							context.weaponDamage, context.strength, context.enemyDefense, context.luck
						);
						return {
							...context,
							enemyHealth: context.enemyHealth - normalAttack.finalDamage,
							roundCount: context.roundCount + 1,
							battleText: normalAttack.battleText
						};
					})
				},
				specialAttack: {
					target: 'ENEMY_TURN',
					actions: assign((context, event) => {
						const specialAttack = attacks.specialAttack(context.weaponDamage, context.strength, context.enemyDefense, context.luck, context.enemyLuck);
						return {
							...context,
							enemyHealth: context.enemyHealth - specialAttack.finalDamage,
							roundCount: context.roundCount + 1,
							battleText: specialAttack.battleText
						};
					})
				},
				useHealthPotion: {
					target: 'ENEMY_TURN',
					actions: assign((context, data) => {
						const usePotion = attacks.useHealthPotion(context.healthPotions);
						return {
							...context,
							roundCount: context.roundCount + 1,
							healthIncrease: usePotion.healthIncrease,
							battleText: usePotion.battleText,
							healthPotions: context.healthPotions - 1
						};
					})
				},
				useSkill: {
					target: 'ENEMY_TURN',
					actions: assign((context, event) => {
						console.log(event);
						const useSkill = attacks.useSkill(context.charClass, context.wisdom);
						return {
							...context,
							roundCount: context.roundCount + 1,
							cooldownRound: context.roundCount + useSkill.cooldownLength,
							...(context.charClass === 'Warrior' && {
								defense: context.defense + useSkill.skillResult
							}),
							...(context.charClass === 'Rogue' && {
								luck: context.luck + useSkill.skillResult
							}),
							...(context.charClass === 'Paladin' && {
								health: event.data.maxHealth
							}),
							skillResult: useSkill.skillResult,
							battleText: useSkill.battleText
						};
					})
				}
			}
		},
		ENEMY_TURN: {
			on: {
				enemyNormalAttack: {
					target: 'USER_TURN',
					actions: assign((context, event) => {
						const enemyNormalAttack = attacks.enemyNormalAttack(context.enemyWeaponDamage, context.enemyStrength, context.defense, context.enemyLuck);
						const tempValueExists = event.data.tempDefense > 0 || event.data.tempLuck > 0;
						const tempValue = event.data.tempDefense > 0 ? event.data.tempDefense : event.data.tempLuck;
						return {
							...context,
							damage: enemyNormalAttack.finalDamage,
							battleText: enemyNormalAttack.battleText,
							...(tempValueExists && context.roundCount === event.data.cooldownRound && {
								[event.data.tempDefense ? 'defense' : 'luck']: tempValue
							})
						};
					})
				},
			}
		}
	}
});

export default fightMachine;