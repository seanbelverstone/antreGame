import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { navigate } from "hookrouter";
import API from "../../utils/API";
import storylines from "../../utils/storylines.json";
import attacks from "../../utils/attacks.js";
import Inventory from "../Inventory";
import InventoryPopup from "../InventoryPopup";
import Typewriter from 'typewriter-effect';
import smallLogo from "../../assets/images/Antre.png";
import enemies from "../../assets/images/enemyIcons";
import "./style.css";

const DecisionBlock = () => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [snackbarDisplay, setSnackbarDisplay] = useState(false);

    const [currentCharacter, setCurrentCharacter] = useState({})
    const [currentLevel, setCurrentLevel] = useState("")
    const [storyText, setStoryText] = useState("");
    const [attackText, setAttackText] = useState("");
    const [modifier, setModifier] = useState([]);
    const [options, setOptions] = useState([]);
    const [clicked, setClicked] = useState("");
    const [currentEnemy, setCurrentEnemy] = useState({});
    const [enemyName, setEnemyName] = useState("");
    const [victoryTarget, setVictoryTarget] = useState({});
    const [enemyImage, setEnemyImage] = useState("");
    const [imageDisplay, setImageDisplay] = useState("none");
    const [optionFade, setOptionFade] = useState("hidden");
    const [enemyBlockFade, setEnemyBlockFade] = useState("hidden");
    const [attackDisplay, setAttackDisplay] = useState("none");

    // this determines the width of the healthbar. Will change based on damage done
    const [enemyHealthWidth, setEnemyHealthWidth] = useState("100%");
    const [userHealthWidth, setUserHealthWidth] = useState("100%");
    const [currentUserHealth, setCurrentUserHealth] = useState(1);
    const [currentEnemyHealth, setCurrentEnemyHealth] = useState(1);
    const [maxHealth, setMaxHealth] = useState();

    // stats that will change and be passed to save function
    const [strength, setStrength] = useState();
    const [defense, setDefense] = useState();
    const [wisdom, setWisdom] = useState();
    const [luck, setLuck] = useState();
    const [weapon, setWeapon] = useState();
    const [weaponDmg, setWeaponDmg] = useState(3);
    const [head, setHead] = useState();
    const [chest, setChest] = useState();
    const [legs, setLegs] = useState();
    const [hands, setHands] = useState();
    const [feet, setFeet] = useState();
    const [torch, setTorch] = useState();
    const [amulet, setAmulet] = useState();
    const [healthPotions, setHealthPotions] = useState();
    const [gold, setGold] = useState();
    const [time, setTime] = useState();
    const [roundCount, setRoundCount] = useState(1);
    const [skillUsed, setSkillUsed] = useState(false);
    const [cooldownRound, setCooldownRound] = useState(0);
    const [warriorDefenseRound, setWarriorDefenseRound] = useState(0);
    const [tempDefense, setTempDefense] = useState(0);

    useEffect(() => {
        // grabs the current character selected and stores it in state
        setCurrentCharacter(JSON.parse(window.sessionStorage.getItem("currentCharacter")));
    }, [])

    useEffect(() => {
        handleLevel(currentCharacter.level);
        handleText(currentCharacter.level);
        handleStats(currentCharacter);
    }, [currentCharacter])

    useEffect(() => {
        setButtonTimes();
    }, [storyText])

    useEffect(() => {
        // Health bars now update based on the enemy and user's health
        setHealthWidth();
    }, [currentEnemyHealth, currentUserHealth])

    const handleStats = (c) => {
        console.log("updating stats")
        setCurrentUserHealth(c.health)
        setStrength(c.strength);
        setDefense(c.defense);
        setWisdom(c.wisdom);
        setLuck(c.luck);
        setWeapon(c.weapon);
        setHead(c.head);
        setChest(c.chest);
        setLegs(c.legs);
        setHands(c.hands);
        setFeet(c.feet);
        setTorch(c.torch);
        setAmulet(c.amulet);
        setHealthPotions(c.healthPotions);
        setGold(c.gold);

    };

    const handleLevel = (choice) => {
        setCurrentLevel(choice)

        // sets max health based on the character's class
        switch (currentCharacter.charClass) {
            case "Warrior":
                setMaxHealth(80)
                break;
            case "Rogue":
                setMaxHealth(60)
                break;
            case "Paladin":
                setMaxHealth(70)
                break;
            default: return
        }
    }

    const handleText = (choice) => {
        // loops through the storylines array, and matches the character's level with the corresponding object
        for (let i = 0; i < storylines.length; i++) {

            if (storylines[i].level === choice) {
                setStoryText(storylines[i].text);
                setModifier(storylines[i].modifier);
                setOptions(storylines[i].options);
                if (storylines[i].enemy) {
                    setCurrentEnemy(storylines[i].enemy)
                    // if the enemy has two words in its name, it replaces the space with an underscore for importing
                    setEnemyName(storylines[i].enemy.name.replace(" ", "_"))
                    setVictoryTarget(storylines[i].victory)
                    setCooldownRound(0);
                    setSkillUsed(false);
                }
                renderOptions();
            }
        }
    }

    // maps through the options array and creates divs for them
    const renderOptions = () => {
        if (modifier[0] != undefined && modifier[0].death) {
            return (
                <p className={`options ${optionFade}`}>You died.</p>
            )
        } else if (modifier[0] != undefined && modifier[0].fight) {
            // If fight: true appears in the decision block, render the fight screen instead.
            return (options.map(fightOption => {
                return (
                    <div className={`options ${optionFade}`} key={fightOption.label}>
                        <Button className="optionText" variant="contained" color="secondary" id={fightOption.label} onClick={() => handleFight(fightOption)} disabled={buttonDisabled}>
                            {fightOption.label}
                        </Button>
                    </div>
                    // Need to replace the direction for "RETURN TO THE TASK AT HAND", where it still goes back to the previous section but written slightly different.
                )
            }))
        } else {
            // Otherwise, show the option page
            return options.map(option => {
                return (
                    <div className={`options ${optionFade}`} key={option.label}>
                        <Button className="optionText" variant="contained" color="primary" onClick={() => handleClick(option)}>
                            {option.label}
                        </Button>
                    </div>
                )
            })
        }

    }

    // This function renders the decision buttons based on how long it takes to write the story text.
    const setButtonTimes = () => {
        if (storyText.length === 0) {
            return;
        }
        checkModifier();
        setTimeout(() => {
            setOptionFade("fadeIn")
            displayEnemy();
        }, (storyText.length * 30 + 2000))

    }

    const checkModifier = () => {
        // checks if there are any modifiers present in this level, and if so sets the applicable one when the buttons render
        // adding the second clause makes sure that users cant just keep refreshing the same page to get unlimited upgrades
        if (modifier && currentCharacter.level !== currentLevel) {
            modifier.forEach(mod => {
                console.log(mod)

                // FYI, i hate using an if statement like this.
                // tried to use a switch case but that didnt work for some reason
                if (mod.weapon) {
                    setWeapon(mod.weapon.name)
                    setWeaponDmg(mod.weapon.dmg)
                } else if (mod.health) {
                    if (currentUserHealth + mod.health > maxHealth) {
                        setCurrentUserHealth(maxHealth)
                    } else {
                        setCurrentUserHealth(currentUserHealth + mod.health)
                    }
                } else if (mod.strength) {
                    setStrength(strength + mod.strength)
                } else if (mod.defense) {
                    setDefense(defense + mod.defense)
                } else if (mod.wisdom) {
                    setWisdom(wisdom + mod.wisdom)
                } else if (mod.luck) {
                    setLuck(luck + mod.luck)
                } else if (mod.head) {
                    setHead(mod.head)
                } else if (mod.chest) {
                    setChest(mod.chest)
                } else if (mod.legs) {
                    setLegs(mod.legs)
                } else if (mod.hands) {
                    setHands(mod.hands)
                } else if (mod.feet) {
                    setFeet(mod.feet)
                } else if (mod.torch) {
                    setTorch(mod.torch)
                } else if (mod.amulet) {
                    setAmulet(mod.amulet)
                } else if (mod.healthPotion) {
                    setHealthPotions(healthPotions + mod.healthPotion)
                } else if (mod.gold) {
                    if (gold + mod.gold < 0) {
                        setGold(0)
                    } else {
                        setGold(gold + mod.gold)
                    }
                } else if (mod.luckCheck) {
                    const checkingLuck = attacks.campaignLuckCheck(luck, mod.event);
                    console.log(checkingLuck[0]);
                    setOptions([
                        {
                            "label": checkingLuck[0].label,
                            "target": checkingLuck[0].target
                        }
                    ]);
                }
            })
        }
        setSnackbarDisplay(true);
        updateCharacter();

    }

    // Checks that we're in a fight sequence, then displays the enemy based on what its name is. 
    const displayEnemy = () => {
        if (modifier[0] && modifier[0].fight && modifier !== 0) {
            console.log("displaying enemy")
            console.log(enemyName)
            setEnemyImage(enemyName)

            setAttackDisplay("flex");
            setImageDisplay("block");
            setEnemyBlockFade("fadeIn")
            setCurrentUserHealth(currentCharacter.health);
            setCurrentEnemyHealth(currentEnemy.health);
            
        }
        return;
    }

    const checkHealth = () => {
        if (currentEnemyHealth > 0 && currentUserHealth > 0) {
            setTimeout(() => {
                enemyTurn();
            }, 3000)
        }
    }

    const enemyTurn = () => {
        const enemyAttack = new Promise ((resolve, reject) => {
            resolve(attacks.enemyNormalAttack(currentEnemy.weapon.dmg, currentEnemy.strength, defense));
        });

        enemyAttack.then((results) => {
            console.log(results);
            // needed to look at the previous state in order for the enemy to take the correct health into account
            setCurrentUserHealth(current => current - results.finalDamage);
            setAttackText(results.battleText);
        })
        // enable buttons after attack
        setButtonDisabled(false);
    }

    // This takes the value from the option, and sets the level and text based on its target
    const handleClick = (option) => {
        setClicked(option.target);
        handleLevel(option.target);
        handleText(option.target);
        setOptionFade("none");
        setImageDisplay("none")
    }

    const handleFight = (option) => {

        let skillButton = document.getElementById("Use skill");

        switch (option.label) {
            case "Normal Attack":
                const normalAttack = new Promise((resolve, reject) => {
                    resolve(attacks.normalAttack(weaponDmg, strength, currentEnemy.defense));
                });
                normalAttack.then(results => {
                    setCurrentEnemyHealth(currentEnemyHealth - results.finalDamage)
                    setAttackText(results.battleText)
                });
                break;
            case "Special Attack":
                const specialAttack = new Promise((resolve, reject) => {
                    resolve(attacks.specialAttack(weaponDmg, strength, currentEnemy.defense, luck, currentEnemy.luck));
                });
                specialAttack.then(results => {
                    setCurrentEnemyHealth(currentEnemyHealth - results.finalDamage)
                    setAttackText(results.battleText)
                })
                break;
            case "Use health potion":
                const heal = new Promise((resolve, reject) => {
                    resolve(attacks.useHealthPotion(healthPotions))
                });
                heal.then(results => {
                    if (results.healthIncrease > 0) {
                        setHealthPotions(healthPotions - 1)
                        // if the user's health with the increase added is MORE than their max, just set it to max.
                        if (currentUserHealth + results.healthIncrease > maxHealth) {
                            setCurrentUserHealth(maxHealth);
                        } else {
                            setCurrentUserHealth(currentUserHealth + results.healthIncrease)
                        }
                    }
                    setAttackText(results.battleText)
                })
                break;
            case "Use skill":
                const skill = new Promise((resolve, reject) => {
                    resolve(attacks.useSkill(currentCharacter.charClass, wisdom, currentEnemy.defense))
                });
                skill.then(results => {
                    // sets a style to the skill button to make it the only one that continues being disabled.
                    skillButton.setAttribute("style", "pointer-events: none; color: rgba(0, 0, 0, 0.26); box-shadow: none; background-color: rgba(0, 0, 0, 0.12);");
                    setSkillUsed(true);
                    setCooldownRound(roundCount + results.cooldownLength)
                    setAttackText(results.battleText)
                    if (currentCharacter.charClass === "Warrior") {
                        setTempDefense(defense);
                        setDefense(defense + results.skillResult);
                        setWarriorDefenseRound(roundCount + 3)
                    } else if (currentCharacter.charClass === "Rogue") {
                        setCurrentEnemyHealth(currentEnemyHealth - results.skillResult)
                    } else {
                        setCurrentUserHealth(maxHealth)
                    }
                })
                break;
            default: return;
        }
        // Disables the buttons so the user can't attack while the enemy is, and then adds 1 to the round count.
        // Also check health, to make sure that enemy or user isn't dead
        setButtonDisabled(true);
        setRoundCount(current => current +1)
        checkHealth();

        if (currentCharacter.charClass === "Warrior" && roundCount === warriorDefenseRound) {
            // returns the warrior's defense to it's regular level
            setDefense(tempDefense);
        }

        // If a skill has been used and both the cooldown and roundCount are the same, make the button back to how it was.
        if(cooldownRound === roundCount && skillUsed) {
            skillButton.removeAttribute("style");
        }
    }

    const setHealthWidth = () => {
        // This sets the red enemy health bar to be a percentage of the total amount
        let enemyNewWidth = (100 * currentEnemyHealth) / currentEnemy.health;
        setEnemyHealthWidth(`${enemyNewWidth}%`);
        // If enemy's health reaches or surpasses 0, set it all to 0 and begin the next phase
        if (currentEnemyHealth <= 0) {
            console.log("Enemy defeated")
            setCurrentEnemyHealth(0);
            setEnemyHealthWidth(0);
            nextPhase();
            return;
        }

        let userNewWidth = (100 * currentUserHealth) / maxHealth;
        setUserHealthWidth(`${userNewWidth}%`);

        // if user is dead, hide all images and just render "you are dead"
        // does mean that a bunch of errors run if you load a game at 0 health, but thats an error for future Sean
        if (userNewWidth <= 0) {
            console.log("You are dead.")
            setEnemyBlockFade("hidden");
            setImageDisplay("none");
            setCurrentEnemy({});
            // setEnemyImage("");
            setModifier([
                {
                    "death": 1
                }
            ])
        }
    }

    // Fade the image out after a second, so it's not jarringly quick.
    const nextPhase = () => {
        setTimeout(() => {
            setAttackDisplay("none");
            setEnemyBlockFade("fadeOut")
        }, 1000)
        // Once it's faded, wait another second and hide the image. Clear out the current enemy object and the image, and change the level.
        setTimeout(() => {
            setEnemyBlockFade("hidden");
            setImageDisplay("none");
            setCurrentEnemy({});
            setEnemyImage("");
            setRoundCount(1);
            setClicked(victoryTarget.target)
            handleLevel(victoryTarget.target);
            handleText(victoryTarget.target);
            // After fights are complete, update the character in sessionStorage
            updateCharacter();
        }, 2000)
    }

    const updateCharacter = () => {
        // Update sessionStorage
        console.log("Updating character")
        window.sessionStorage.setItem("currentCharacter", JSON.stringify({
            "id": currentCharacter.id,
            "name": currentCharacter.name,
            "race": currentCharacter.race,
            "charClass": currentCharacter.charClass,
            "health": currentUserHealth,
            "strength": strength,
            "defense": defense,
            "wisdom": wisdom,
            "luck": luck,
            "weapon": weapon,
            "head": head,
            "chest": chest,
            "legs": legs,
            "hands": hands,
            "feet": feet,
            "torch": torch,
            "amulet": amulet,
            "healthPotions": healthPotions,
            "gold": gold,
            "level": currentLevel,
            "time": time
        }))
    }

    const saveGame = () => {
        updateCharacter();
        API.updateCharacter(
            currentUserHealth,
            strength,
            defense,
            wisdom,
            luck,
            weapon,
            head,
            chest,
            legs,
            hands,
            feet,
            torch,
            amulet,
            healthPotions,
            gold,
            currentLevel,
            time,
            currentCharacter.id
        )
            .then((results) => {
                console.log(results);
            })
    }

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return (
        <div className="decisionWrapper">
            <Button variant="outlined" id="logout" onClick={logout} /*disabled={buttonDisabled}*/>LOG OUT</Button>

            <Typewriter
                options={{
                    strings: storyText,
                    autoStart: true,
                    loop: false,
                    delay: 20,
                    wrapperClassName: "text"
                }}

            />
            <div style={{ display: imageDisplay }} className={enemyBlockFade} id="enemyBlock">
                <div>{currentEnemy.name}</div>
                <div className="healthArea">
                    <div className="healthText">
                        {currentEnemyHealth}/{currentEnemy.health}
                    </div>
                    <div id="enemyBar" style={{ width: enemyHealthWidth }}></div>
                </div>

                <img src={enemies[enemyImage]} id="enemyImage" />

                <div id="charName">{currentCharacter.name}</div>
                <div className="healthArea" id="userHealthArea">
                    <div className="healthText">
                        {currentUserHealth}/{maxHealth}
                    </div>
                    <div id="userBar" style={{ width: userHealthWidth }}></div>
                </div>
            </div>

            <div id="attackText" className={optionFade} style={{display: attackDisplay}}>
                {attackText}
            </div>

            <div id="optionArea">{renderOptions()}</div>

            <footer id="footer">
                <Inventory
                    id="inventory"
                    disabled={buttonDisabled}
                    health={currentUserHealth}
                    maxHealth={maxHealth}
                    strength={strength}
                    defense={defense}
                    wisdom={wisdom}
                    luck={luck}
                    weapon={weapon}
                    weaponDmg={weaponDmg}
                    head={head}
                    chest={chest}
                    legs={legs}
                    hands={hands}
                    feet={feet}
                    torch={torch}
                    amulet={amulet}
                    healthPotions={healthPotions}
                    gold={gold}
                />
                <div>
                    <Button type="button" id="save" variant="contained" disabled={buttonDisabled} onClick={saveGame}>Save Game</Button>
                </div>

                <img src={smallLogo} alt="a small logo" id="smallLogo" />
            </footer>
            <InventoryPopup display={snackbarDisplay} setDisplay={setSnackbarDisplay} items={modifier} />
        </div>

    )
}

export default DecisionBlock;