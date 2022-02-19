/* eslint-disable no-unused-vars */
import { createMachine, assign } from 'xstate';
import attacks from './attacks';
import storylines from './storylines.json';


// TODO
// - add functions for skill/health
// - pass in updateHealth methods from parent to update the state in the parent, or set the health based on the machine's response
// - Add `guarded conditional functions` where we'll only do attacks if enemy/user is alive

export const createFightMachine = (props, setAttackText) => {
	const { inventory, stats, levels } = props;
	const currentStory = storylines.find(story => story.level === levels?.current);

	return createMachine({
		id: 'fightMachine',
		initial: 'USER_TURN',
		context: {
			roundCount: 1,
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
							const normalAttack = attacks.normalAttack(
								inventory.weaponDamage, stats.strength, currentStory.enemy.defense, stats.luck
							);
							setAttackText(normalAttack.battleText);
							return {
								...context,
								enemyHealth: context.enemyHealth - normalAttack.finalDamage,
								roundCount: context.roundCount++
							};
						})
					},
					specialAttack: {
						target: 'ENEMY_TURN',
						actions: assign((context, data) => {
							console.log('special attack attack works');
							const specialAttack = attacks.specialAttack(inventory.weaponDamage, stats.strength, currentStory.enemy.defense, stats.luck, currentStory.enemy.luck);
							setAttackText(specialAttack.battleText);
							return {
								...context,
								enemyHealth: context.enemyHealth - specialAttack.finalDamage,
								roundCount: context.roundCount++
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
							const enemyNormalAttack = attacks.enemyNormalAttack(currentStory.enemy.weapon.dmg, currentStory.enemy.strength, stats.defense, currentStory.enemy.luck);
							setAttackText(enemyNormalAttack.battleText);
							return {
								...context,
								health: context.health - enemyNormalAttack.finalDamage
							};
						})
					},
				}
			}
		}
	});
};

export default createFightMachine;