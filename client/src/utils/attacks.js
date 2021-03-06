const diceRoll = () => {
    return(Math.floor(Math.random() * 6) + 1);
}

let battleText;

export default {


    // USER ATTACKS
    // Normal attack does weapon damage * dice roll, + strength * 2, divided by enemy defense
    normalAttack: (weaponDamage, strength, enemyDef) => {
        const initialRoll = diceRoll();
        const finalDamage = Math.ceil(((weaponDamage * initialRoll) + (strength * 2)) / enemyDef);

        let battleText = `You rolled a ${initialRoll}! \n Your normal attack does ${finalDamage} damage.`

        return {
            battleText,
            finalDamage
        };
    },

    // Normal attack does 3 * weapon damage, * dice roll, + strength * 3, divided by enemy defense
    specialAttack: (weaponDamage, strength, enemyDef, luck, enemyLuck) => {
        const initalRoll = diceRoll();    
        let finalDamage = Math.ceil((((3 * weaponDamage) * initalRoll) + (strength * 3)) / enemyDef);
    
        
        console.log(`Dice roll: ${initalRoll}`);
        console.log(`Weapon Damage: ${weaponDamage}`);
        console.log(`Str: ${strength}`);
        console.log(`Enemy defence ${enemyDef}`);
        console.log(`Luck: ${luck}`);
        console.log(`Enemy luck: ${enemyLuck}`);
        console.log(`Final damage ${finalDamage}`);
        // checks luck
        let myLuckRoll = diceRoll();
        let enemyLuckRoll = diceRoll();

        if (myLuckRoll + luck >= enemyLuckRoll + enemyLuck) {
            battleText = `You roll for a special attack. \n You compare luck values with the enemy and your roll is higher! \n Your special attack does ${finalDamage} damage!`;
            return {
                battleText,
                finalDamage
            };
        } else {
            battleText =  `You roll for a special attack. \n You compare luck values with the enemy and your roll is lower. \n Your attack misses!`;
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
        // perfect roll (6 x 6) + 25 = 61 health increased
        let healthIncrease = (initalRoll * secondRoll) + 35

        // checks that the user has potions.
        if (potionCount > 0) {
            battleText = `You drink a health potion, restoring ${healthIncrease} HP.`
            return {
                battleText,
                healthIncrease
            }
        } else {
            battleText = `You're out of potions!`;
            healthIncrease = 0
            return {
                battleText,
                healthIncrease
            }
        }
        
    },

    useSkill: (charClass, wisdom, enemyDef) => {
        console.log(`You are a ${charClass}`)
        let cooldownLength;
        let skill;
        let skillResult;

        // PSUEDOCODE
        // For warrior, set character defense to 20 for 3 turns. After 3 turns, it returns to normal
        // Maybe we need a turn counter? Almost definitely.
        // For rogue, do the same as special attack but increase weapon damage by a lot (max?) and remove
        // the luck constraints.
        // For paladin, heal health completely.

        // Once skill has completed, based on Wisdom number - disable the button for that many turns
        // (for warrior, make it come into effect AFTER the 3 turns have expired)
        // sets the number of rounds a player will have to wait until they can 
        // use their skill again, based on the amount of wisdom their character has
        if (wisdom <= 2) {
            cooldownLength = 5
        } else if (wisdom > 2 && wisdom <= 4) {
            cooldownLength = 4
        } else if (wisdom > 4 && wisdom <= 6) {
            cooldownLength = 3
        } else if (wisdom > 6 && wisdom <= 8) {
            cooldownLength = 2
        } else if (wisdom > 8 && wisdom <= 10) {
            cooldownLength = 1;
        } else {
            cooldownLength = 0;
        }

        switch(charClass) {
            case "Warrior":
                skill = "Stalwart defense";
                battleText = "You used Stalwart Defense. Your defense has been temporarily increased!"
                skillResult = 20;
                break;
            case "Rogue":
                skill = "Rapid attack";
                const initalRoll = diceRoll();    
                skillResult = Math.ceil(((3 * 9) * initalRoll) / enemyDef);
                battleText = `You used Rapid Attack. Fast as lightning, you strike the enemy for ${skillResult} damage!`
                break;
            case "Paladin":
                skill = "Holy remedy";
                battleText = "You used Holy Remedy. All your health has been restored!"
                break;
            default: return;
        }

        return {
            cooldownLength,
            battleText,
            skillResult
        }
    },

    // ENEMY ATTACKS
    enemyNormalAttack: (enemyWeapon, strength, myDef) => {
        const initialRoll = diceRoll();
        const finalDamage = Math.ceil(((enemyWeapon * initialRoll) + (strength * 2)) / myDef);
        console.log(`Enemy weapon ${enemyWeapon}`)
        console.log(`My defense ${myDef}`)
        console.log(`Total damage before divison ${finalDamage * myDef}`)

        battleText = `The enemy rolled a ${initialRoll}! \n Their attack does ${finalDamage} damage.`
        return {
            battleText,
            finalDamage
        }
    },

    campaignLuckCheck: (luck, story) => {
        let userLuckModifier = luck / 2;

        let myRoll = diceRoll();
        let updatedNumber = Math.floor(myRoll + userLuckModifier);
        const deathLevel = "04bab-Death";
        const badLuckLevel = "04bac-Bad Luck";
        const bestLuckLevel = "04bad-Best Luck";

        const wormDeath = "09caa-Worm Death";
        const wormSuccess = "09cab-Worm Success"

        const slipToHang = "28baa-Gap Slip";
        const pullUpSlip = "28baaa-Gap Death";
        const hangPullUp = "28baab-Pull up"
        const gapSuccess = "28bab-Gap Success";

        let options;
        // Story 1 is Dark path traps
        console.log(story)
        if (story === 1) {
            if(updatedNumber <= 1) {
                options = deathLevel
            } else if (myRoll > 1 && myRoll < 6) {
                options = badLuckLevel;
            } else {
                options = bestLuckLevel;
            }
        } else if (story === 2) {
            console.log(story);
            console.log(updatedNumber)
            // Story 2 is Worm Attack
            if (updatedNumber <= 2) {
                options = wormDeath
            } else {
                options = wormSuccess
            }
            console.log(options)

        } else if (story === 3) {
            // Story 3 is Gap cross, with weapon
            if (updatedNumber <= 4) {
                options = slipToHang
            } else {
                options = gapSuccess
            }
        } else if (story === 4) {
            // Story 4 is Gap cross, but after slipping first
            if (updatedNumber <= 3) {
                options = pullUpSlip
            } else {
                options = hangPullUp
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
                label: "Continue",
                target: options
            }
        ]
    
    },

    torchCheck: (torch) => {
        let options;
        console.log(torch);
        if (torch === 1) {
            options = "04a-Torch Obtained"
        } else {
            options = "04b-No Torch"
        }
        console.log(options)
        return {
                label: "Continue",
                target: options
            }
    }

}