const diceRoll = () => {
    return(Math.floor(Math.random() * 6) + 1);
}

let weaponDamage;

const checkUserWeapon = (weapon) => {
    switch(weapon) {
        case "No weapon":
            weaponDamage = 1;
            break;
        case "Rusty shortsword":
            weaponDamage = 3;
            break;
        case "Dagger":
            weaponDamage = 3;
            break;
        case "Steel dagger":
            weaponDamage = 4;
            break;
        case "Halberd":
            weaponDamage = 6;
            break;
        case "Steel shortsword":
            weaponDamage = 7;
            break;
        case "Black iron sword":
            weaponDamage = 11;
            break;
        case "Warhammer":
            weaponDamage = 14;
    }
};


// Luck check compares users and enemy luck rolls
const luckCheck = (luck, enemyLuck, finalDamage) => {

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
};

export default {


    // USER ATTACKS
    // Normal attack does weapon damage * dice roll, + strength * 2, divided by enemy defense
    normalAttack: (weapon, strength, enemyDef) => {
        checkUserWeapon(weapon);
        const initialRoll = diceRoll();
    
        console.log(`You rolled a ${initialRoll}`);
        console.log(`Your weapon does ${weaponDamage} damage, and you have ${strength} strength points.`);
        console.log(`The enemy has ${enemyDef} defence points`)
        const finalDamage = Math.ceil(((weaponDamage * initialRoll) + (strength * 2)) / enemyDef);
        console.log(`Your hit the enemy for ${finalDamage} !`)
    },

    // Normal attack does 3 * weapon damage, * dice roll, + strength * 3, divided by enemy defense
    specialAttack: (weapon, strength, enemyDef, luck, enemyLuck) => {
        const initalRoll = diceRoll();
        checkUserWeapon(weapon);
    
        console.log(`You go for a special attack!`)
        console.log(`You roll a ${initalRoll}.`);
        console.log(`Your weapon does ${weaponDamage} damage, and you have ${strength} strength points.`);
        console.log(`The enemy has ${enemyDef} defence points`)
    
        const finalDamage = Math.ceil((((3 * weaponDamage) * initalRoll) + (strength * 3)) / enemyDef);
    
        console.log(`You roll again for a luck check. \n`)
    
    
        luckCheck(luck, enemyLuck, finalDamage);  
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

    // ENEMY ATTACKS
    enemyNormalAttack: (enemyWeapon, strength, myDef) => {
        const initialRoll = diceRoll();

        console.log(`The enemy rolled a ${initialRoll}`);
        console.log(`Their weapon does ${enemyWeapon} damage, and they have ${strength} strength points.`);
        console.log(`You have ${myDef} defence points`)
        const finalDamage = Math.ceil(((enemyWeapon * initialRoll) + (strength * 2)) / myDef);
        console.log(`The enemy hits you for ${finalDamage}!`)
    },

}