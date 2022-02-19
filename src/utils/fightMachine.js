/* eslint-disable no-unused-vars */
import { createMachine, assign, interpret } from 'xstate';
import attacks from './attacks';
import storylines from './storylines.json';

export const createFightMachine = (props) => {
	const { inventory, stats, levels } = props;
	const currentStory = storylines.find(story => story.level === levels?.current);

	return createMachine({
		id: 'fightMachine',
		initial: 'USER_TURN',
		context: {
			charClass: stats?.charClass,
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
			...(currentStory?.enemy && {
				enemyHealth: currentStory.enemy.health,
				enemyStrength: currentStory.enemy.strength,
				enemyDefense: currentStory.enemy.defense,
				enemyWisdom: currentStory.enemy.wisdom,
				enemyLuck: currentStory.enemy.luck,
				enemyWeapon: currentStory.enemy.weapon.name,
				enemyWeaponDamage: currentStory.enemy.weapon.dmg
			})
		},
		states: {
			USER_TURN: {
				on: {
					normalAttack: {
					// normalAttack is an action.
						target: 'ENEMY_TURN',
						actions: assign((context, data) => {
							console.log('normal attack works');
							console.log(attacks.normalAttack(
								inventory.weaponDamage, stats.strength, currentStory.enemy.defense, stats.luck
							).finalDamage);
							return {
								...context,
								enemyHealth: context.enemyHealth - attacks.normalAttack(
									inventory.weaponDamage, stats.strength, currentStory.enemy.defense, stats.luck
								).finalDamage
							};
						})
					},
					specialAttack: {
						target: 'ENEMY_TURN',
						actions: assign((context, data) => {
							console.log('special attack attack works');
							return {
								...context,
								enemyHealth: context.enemyHealth - attacks.enemyNormalAttack(currentStory.enemy.weapon.dmg, currentStory.enemy.strength, stats.defense, currentStory.enemy.luck).finalDamage
							};
						})
					}
				}
			},
			ENEMY_TURN: {
				on: {
					enemyNormalAttack: {
						target: 'USER_TURN',
						actions: assign((context) => {
							return {
								...context,
								health: context.health - 2
							};
						})
					},
				}
			}
		}
	});
};

export default createFightMachine;