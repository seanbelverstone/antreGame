const diceRoll = () => {
    return(Math.floor(Math.random() * 6) + 1);
}


// Luck check compares users and enemy luck rolls
const luckCheck = (luck, enemyLuck, finalDamage, enemyHealth, setEnemyHealth) => {

    let myRoll = diceRoll();
    let enemyRoll = diceRoll();

    console.log(`You roll a ${myRoll} and the enemy rolls a ${enemyRoll}`)
    console.log(`With your luck values added, the final results are:`)
    console.log(`Your Luck: ${myRoll + luck}`)
    console.log(`Enemy Luck: ${enemyRoll + enemyLuck}`)

    if (myRoll + luck >= enemyRoll + enemyLuck) {
        console.log(`Your special attack lands, and does ${finalDamage}!`)
        setEnemyHealth(enemyHealth - finalDamage)
    } else {
        console.log("You miss")
    }

};

export default {


    // USER ATTACKS
    // Normal attack does weapon damage * dice roll, + strength * 2, divided by enemy defense
    normalAttack: (weaponDamage, strength, enemyDef, enemyHealth, setEnemyHealth) => {
        const initialRoll = diceRoll();
    
        // console.log(`You rolled a ${initialRoll}`);
        // console.log(`Your weapon does ${weaponDamage} damage, and you have ${strength} strength points.`);
        // console.log(`The enemy has ${enemyDef} defence points`)
        const finalDamage = Math.ceil(((weaponDamage * initialRoll) + (strength * 2)) / enemyDef);
        // console.log(`Your hit the enemy for ${finalDamage} !`)
        // setEnemyHealth(enemyHealth - finalDamage)
        let battleText = `You rolled a ${initialRoll}! Your normal attack does ${finalDamage}.`

        // setEnemyHealth(enemyHealth - finalDamage);
        return {
            battleText,
            finalDamage
        };
    },

    // Normal attack does 3 * weapon damage, * dice roll, + strength * 3, divided by enemy defense
    specialAttack: (weaponDamage, strength, enemyDef, luck, enemyLuck, enemyHealth, setEnemyHealth) => {
        const initalRoll = diceRoll();
    
        console.log(`You go for a special attack!`)
        console.log(`You roll a ${initalRoll}.`);
        console.log(`Your weapon does ${weaponDamage} damage, and you have ${strength} strength points.`);
        console.log(`The enemy has ${enemyDef} defence points`)
    
        const finalDamage = Math.ceil((((3 * weaponDamage) * initalRoll) + (strength * 3)) / enemyDef);
    
        console.log(`You roll again for a luck check. \n`)
    
    
        luckCheck(luck, enemyLuck, finalDamage, enemyHealth, setEnemyHealth);  
    },

    useHealthPotion: (potionCount, setPotionCount, userHealth, setUserHealth, maxHealth) => {
        const initalRoll = diceRoll();
        const secondRoll = diceRoll();

        // checks that the user has potions. If they don't, return a message
        if (potionCount > 0) {
            // perfect roll (6 x 6) + 15 = 51 health increased
            const healthIncrease = (initalRoll * secondRoll) + 15
            const newHealth = userHealth + healthIncrease
            // if the total health after the increase is more than max, just set it to max
            if (newHealth > maxHealth) {
                setUserHealth(maxHealth)
            } else {
                setUserHealth(userHealth + healthIncrease)
            }
            setPotionCount(potionCount--)
            console.log(`You drink a health potion, restoring ${initalRoll * secondRoll + 15} health.`)
        } else {
            console.log("You're out of potions!")
        }
        
    },

    useSkill: (charClass) => {
        console.log(`You are a ${charClass}`)
        let skill;
        switch(charClass) {
            case "Warrior":
                skill = "Stalwart defense";
                break;
            case "Rogue":
                skill = "Rapid attack";
                break;
            case "Paladin":
                skill = "Holy remedy";
                break;
            default: return;
        }

        console.log(`You used ${skill}, which did... something`)
    },

    // ENEMY ATTACKS
    enemyNormalAttack: (enemyWeapon, strength, myDef, userHealth, setUserHealth) => {
        const initialRoll = diceRoll();

        console.log(`The enemy rolled a ${initialRoll}`);
        console.log(`Their weapon does ${enemyWeapon} damage, and they have ${strength} strength points.`);
        console.log(`You have ${myDef} defence points`)
        const finalDamage = Math.ceil(((enemyWeapon * initialRoll) + (strength * 2)) / myDef);
        console.log(`The enemy hits you for ${finalDamage}!`)

        setUserHealth(userHealth - finalDamage)
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
        if (story === 1) {
            if(updatedNumber <= 1) {
                options = deathLevel
            } else if (myRoll > 1 && myRoll < 6) {
                options = badLuckLevel;
            } else {
                options = bestLuckLevel;
            }
        } else if (story === 2) {
            // Story 2 is Worm Attack
            if (updatedNumber <= 2) {
                options = wormDeath
            } else {
                options = wormSuccess
            }
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
    
    }

}