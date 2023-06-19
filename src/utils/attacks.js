const diceRoll = () => {
	return (Math.floor(Math.random() * 6) + 1);
};

const critChance = (luck) => {
	const initialRoll = (Math.floor(Math.random() * 20) + 1);
	const luckCheck = (initialRoll + luck);
	// If the roll + luck is 20 or higher, it's a crit. (generally a 5% chance)
	return luckCheck >= 20;
};

let battleText;

export default {


	// USER ATTACKS
	// Normal attack does weapon damage * dice roll, + strength * 2, divided by enemy defense
	normalAttack: (weaponDamage, strength, enemyDef, luck) => {
		const initialRoll = diceRoll();
		const finalDamage = Math.ceil(((weaponDamage * initialRoll) + (strength * 2)) / enemyDef);
		const critDamage = (weaponDamage * initialRoll) + (strength * 2);
		if (critChance(luck)) {
			battleText = `You rolled a ${initialRoll}, and it was a crit! \n Your normal attack does ${critDamage} damage.`;
			return {
				battleText,
				finalDamage: critDamage
			};
		} else {
			battleText = `You rolled a ${initialRoll}! \n Your normal attack does ${finalDamage} damage.`;
			return {
				battleText,
				finalDamage
			};
		}
	},

	// Normal attack does 3 * weapon damage, * dice roll, + strength * 3, divided by enemy defense
	specialAttack: (weaponDamage, strength, enemyDef, luck, enemyLuck) => {
		const initalRoll = diceRoll();
		let finalDamage = Math.ceil((((3 * weaponDamage) * initalRoll) + (strength * 3)) / enemyDef);
		let critDamage = ((3 * weaponDamage) * initalRoll) + (strength * 3);

		console.log(`Dice roll: ${initalRoll}`);
		console.log(`Weapon Damage: ${weaponDamage}`);
		console.log(`Str: ${strength}`);
		console.log(`Enemy defense ${enemyDef}`);
		console.log(`Luck: ${luck}`);
		console.log(`Enemy luck: ${enemyLuck}`);
		console.log(`Final damage ${finalDamage}`);
		// checks luck
		let myLuckRoll = diceRoll();
		let enemyLuckRoll = diceRoll();

		if (myLuckRoll + luck >= enemyLuckRoll + enemyLuck) {
			if (critChance(Math.floor(luck / 1.5))) {
				battleText = `You roll for a special attack. \n You compare luck values with the enemy, your roll is higher, AND it's a crit! \n Your special attack does ${critDamage} damage!`;
				return {
					battleText,
					finalDamage: critDamage
				};
			}
			battleText = `You roll for a special attack. \n You compare luck values with the enemy and your roll is higher! \n Your special attack does ${finalDamage} damage!`;
			return {
				battleText,
				finalDamage
			};
		} else {
			battleText = 'You roll for a special attack. \n You compare luck values with the enemy and your roll is lower. \n Your attack misses!';
			finalDamage = 0;
			return {
				battleText,
				finalDamage
			};
		}
	},

	useHealthPotion: (potionCount) => {
		const initalRoll = diceRoll();
		const secondRoll = diceRoll();
		// perfect roll (6 x 6) + 15 = 51 health increased
		let healthIncrease = (initalRoll * secondRoll) + 15;

		// checks that the user has potions.
		if (potionCount > 0) {
			battleText = `You drink a health potion, restoring ${healthIncrease} HP.`;
			return {
				battleText,
				healthIncrease
			};
		} else {
			battleText = 'You\'re out of potions!';
			healthIncrease = 0;
			return {
				battleText,
				healthIncrease
			};
		}

	},

	useSkill: (charClass, wisdom) => {
		console.log(`You are a ${charClass}`);
		let cooldownLength;
		let skillResult;

		// PSUEDOCODE
		// For warrior, set character defense to 20 for 3 turns. After 3 turns, it returns to normal
		// Maybe we need a turn counter? Almost definitely.
		// For rogue, guarantee the next attack will crit. (increase luck to 20 for 1 turn)
		// For paladin, heal health completely.

		// Once skill has completed, based on Wisdom number - disable the button for that many turns
		// (for warrior, make it come into effect AFTER the 3 turns have expired)
		// sets the number of rounds a player will have to wait until they can 
		// use their skill again, based on the amount of wisdom their character has
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
			cooldownLength = 1;
		}

		switch (charClass) {
		case 'Warrior':
			// 'Stalwart defense';
			battleText = 'You used Stalwart Defense. Your defense has been temporarily increased!';
			skillResult = 20;
			break;
		case 'Rogue':
			// 'Gambler's Strike';
			battleText = 'You used Gambler\'s Strike. Your luck has been massively increased!';
			skillResult = 20;
			break;
		case 'Paladin':
			// 'Holy remedy';
			battleText = 'You used Holy Remedy. All your health has been restored!';
			break;
		default: return;
		}

		return {
			cooldownLength,
			battleText,
			skillResult
		};
	},

	// ENEMY ATTACKS
	enemyNormalAttack: (enemyWeapon, strength, myDef, enemyLuck) => {
		const initialRoll = diceRoll();
		const finalDamage = Math.ceil(((enemyWeapon * initialRoll) + (strength * 2)) / myDef);
		const critDamage = (enemyWeapon * initialRoll) + (strength * 2);

		console.log(`Enemy weapon ${enemyWeapon}`);
		console.log(`My defense ${myDef}`);
		console.log(`Total damage before divison ${finalDamage * myDef}`);
		console.log(finalDamage);
		console.log(critDamage);
		if (critChance(enemyLuck)) {
			battleText = `The enemy rolled a ${initialRoll} and it was a crit! \n Their attack does ${critDamage} damage.`;
			return {
				battleText,
				finalDamage: critDamage
			};
		}
		battleText = `The enemy rolled a ${initialRoll}! \n Their attack does ${finalDamage} damage.`;
		return {
			battleText,
			finalDamage
		};
	},

	campaignLuckCheck: (luck, story) => {
		let userLuckModifier = luck / 2;

		let myRoll = diceRoll();
		let updatedNumber = Math.floor(myRoll + userLuckModifier);
		const deathLevel = '04bab-Death';
		const badLuckLevel = '04bac-Bad Luck';
		const bestLuckLevel = '04bad-Best Luck';

		const wormDeath = '09caa-Worm Death';
		const wormSuccess = '09cab-Worm Success';

		const slipToHang = '28baa-Gap Slip';
		const pullUpSlip = '28baaa-Gap Death';
		const hangPullUp = '28baab-Pull up';
		const gapSuccess = '28bab-Gap Success';

		let options;
		// Story 1 is Dark path traps
		if (story === 1) {
			if (updatedNumber <= 1) {
				options = deathLevel;
			} else if (myRoll > 1 && myRoll < 6) {
				options = badLuckLevel;
			} else {
				options = bestLuckLevel;
			}
		} else if (story === 2) {
			// Story 2 is Worm Attack
			if (updatedNumber <= 2) {
				options = wormDeath;
			} else {
				options = wormSuccess;
			}

		} else if (story === 3) {
			// Story 3 is Gap cross, with weapon
			if (updatedNumber <= 4) {
				options = slipToHang;
			} else {
				options = gapSuccess;
			}
		} else if (story === 4) {
			// Story 4 is Gap cross, but after slipping first
			if (updatedNumber <= 3) {
				options = pullUpSlip;
			} else {
				options = hangPullUp;
			}
		} else if (story === 5) {
			// Story 5 is Gap cross, but after throwing weapon over. Luck chances are increased
			if (updatedNumber <= 2) {
				options = slipToHang;
			} else {
				options = gapSuccess;
			}
		}
		return [
			{
				label: 'Continue',
				target: options
			}
		];

	},

	torchCheck: (torch) => {
		let options;
		if (torch === 1) {
			options = '04a-Torch Obtained';
		} else {
			options = '04b-No Torch';
		}
		return {
			label: 'Continue',
			target: options
		};
	}

};