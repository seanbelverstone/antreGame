import { createMachine, assign } from 'xstate';
import store from '../redux/store';
import attacks from './attacks';
import storylines from './storylines.json';

const state = store.getState();
const { updateCharacter } = state;
const { inventory, stats, levels } = updateCharacter;
const currentStory = storylines.filter(story => story.level === [levels.current]);
const classStat = () => {
	switch(stats.charClass) {
	case 'Warrior':
		return 'defense';
	case 'Rogue':
		return 'luck';
	default:
		return 'health';
	}
};

export const fightMachine = createMachine({
	id: 'fight',
	initial: 'userTurn',
	context: {
		// user status
		charClass: stats.charClass,
		health: stats.health,
		strength: stats.strength,
		defense: stats.defense,
		wisdom: stats.wisdom,
		luck: stats.luck,
		weapon: inventory.weapon,
		weaponDamage: inventory.weaponDamage,
		healthPotions: inventory.healthPotons,
		currentLevel: levels.current,
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
		userTurn: {
			normalAttack: {
				entry: assign({
					enemyHealth: (enemyHP) => enemyHP - attacks.normalAttack(
						inventory.weaponDamage, stats.strength, currentStory.enemy.defense, stats.luck
					)})
			},
			specialAttack: {
				entry: assign({
					enemyHealth: (enemyHP) => enemyHP - attacks.specialAttack(
						inventory.weaponDamage, stats.strength, currentStory.enemy.defense, stats.luck, currentStory.enemy.luck
					)}),
			},
			useHealthPotion: {
				entry: assign({
					health: (hp) => hp + attacks.useHealthPotion(inventory.healthPotions)
				}),
				on: store.dispatch({ updateCharacter: { inventory: { healthPotions: inventory.healthPotions -1 } } })
			},
			useSkill: {
				entry: assign({
					[classStat()]: (stat) => stat + attacks.useSkill(stats.charClass, stats.wisdom)
				})
			},
			on: { endTurn: 'enemyTurn' }
		},
		enemyTurn: {
			entry: assign({ count: (ctx) => ctx.count + 1 }),
			on: { TOGGLE: 'inactive' }
		}
	}
});

export default fightMachine;