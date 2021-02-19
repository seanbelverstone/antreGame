const diceRoll = () => {
    return(Math.floor(Math.random() * 6) + 1);
}

let weaponDamage;

const checkUserWeapon = (weapon) => {
    switch(weapon.toLowerCase()) {
        case "no weapon":
            weaponDamage = 1;
            break;
        case "rusty shortsword":
            weaponDamage = 2;
            break;
        case "dagger":
            weaponDamage = 5;
            break;
        case "iron axe":
            weaponDamage = 7;
            break;
        case "steel dagger":
            weaponDamage = 8;
            break;
        case "steel shortsword":
            weaponDamage = 10;
            break;
        case "halberd":
            weaponDamage = 12;
            break;
        case "black iron longsword":
            weaponDamage = 14;
            break;
        case "obsidian axes":
            weaponDamage = 16;
        case "warhammer":
            weaponDamage = 18;
    }
};


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
    } else {
        console.log("You miss")
    }

    setEnemyHealth(enemyHealth - finalDamage)

};

export default {


    // USER ATTACKS
    // Normal attack does weapon damage * dice roll, + strength * 2, divided by enemy defense
    normalAttack: (weapon, strength, enemyDef, enemyHealth, setEnemyHealth) => {
        checkUserWeapon(weapon);
        const initialRoll = diceRoll();
    
        console.log(`You rolled a ${initialRoll}`);
        console.log(`Your weapon does ${weaponDamage} damage, and you have ${strength} strength points.`);
        console.log(`The enemy has ${enemyDef} defence points`)
        const finalDamage = Math.ceil(((weaponDamage * initialRoll) + (strength * 2)) / enemyDef);
        console.log(`Your hit the enemy for ${finalDamage} !`)
        setEnemyHealth(enemyHealth - finalDamage)
    },

    // Normal attack does 3 * weapon damage, * dice roll, + strength * 3, divided by enemy defense
    specialAttack: (weapon, strength, enemyDef, luck, enemyLuck, enemyHealth, setEnemyHealth) => {
        const initalRoll = diceRoll();
        checkUserWeapon(weapon);
    
        console.log(`You go for a special attack!`)
        console.log(`You roll a ${initalRoll}.`);
        console.log(`Your weapon does ${weaponDamage} damage, and you have ${strength} strength points.`);
        console.log(`The enemy has ${enemyDef} defence points`)
    
        const finalDamage = Math.ceil((((3 * weaponDamage) * initalRoll) + (strength * 3)) / enemyDef);
    
        console.log(`You roll again for a luck check. \n`)
    
    
        luckCheck(luck, enemyLuck, finalDamage, enemyHealth, setEnemyHealth);  
    },

    useHealthPotion: () => {
        console.log(`You drink a health potion, restoring ${diceRoll() * diceRoll() + 15} health.`)
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

    campaignLuckCheck: (luck, story) => {
        let userLuckModifier = luck / 2;

        let myRoll = diceRoll();
        let updatedNumber = Math.floor(myRoll + userLuckModifier);
        const deathLevel = "04bab-Death";
        const badLuckLevel = "04bac-Bad Luck";
        const bestLuckLevel = "04bad-Best Luck";

        const wormDeath = "09caa-Worm Death";
        const wormSuccess = "09cab-Worm Success"

        let options;
        // 
        if (story === 1) {
            if(updatedNumber <= 1) {
                options = deathLevel
            } else if (myRoll > 1 && myRoll < 6) {
                options = badLuckLevel;
            } else {
                options = bestLuckLevel;
            }
        } else if (story === 2) {
            if (updatedNumber <= 2) {
                options = wormDeath
            } else {
                options = wormSuccess
            }
        }
        return [
            {
                label: "Continue",
                target: options
            }
        ]
    
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
    }

}