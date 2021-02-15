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
            weaponDamage = 3;
            break;
        case "iron axe":
            weaponDamage = 4;
            break;
        case "steel dagger":
            weaponDamage = 5;
            break;
        case "halberd":
            weaponDamage = 6;
            break;
        case "steel shortsword":
            weaponDamage = 7;
            break;
        case "black iron sword":
            weaponDamage = 11;
            break;
        case "warhammer":
            weaponDamage = 14;
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

    campaignLuckCheck: (luck) => {
        let userLuckModifier = luck / 2;

        let myRoll = diceRoll();
        let updatedNumber = Math.floor(myRoll + userLuckModifier);
        const deathLevel = "04bab-Death";
        const deathText = "You somehow manage to hit each and every one of the traps. You bleed out before reaching the end."
        const badLuckLevel = "04bac-Bad Luck";
        const badLuckText = "Either you're cursed or the luckiest bastard that ever existed. During your time stumbling in the dark, you managed to activate nearly every single trap that was in the corridor, yet miraculously you are still breathing. Exhausted and in pain, you can't help but be somewhat thankful the traps are behind you.";
        const bestLuckLevel = "04bad-Best Luck";
        const bestLuckText = "You are insanely blessed, as you get through the trap filled corridor, in the dark, without setting off a single trap. Your confidence increases and you step forward.";

        let options;
        if(updatedNumber <= 1) {
            options = deathLevel
        } else if (myRoll > 1 && myRoll < 6) {
            options = badLuckLevel;
        } else {
            options = bestLuckLevel;
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