import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux"
import { Button, Menu, MenuItem } from "@material-ui/core";
import { navigate } from "hookrouter";
import * as actionCreators from "../../redux/actions/actionCreators";
import API from "../../utils/API";
import { stringToCamel, isBlacklistedChoice } from '../../utils/functions';
import Wrapper from "../../components/Wrapper";
import storylines from "../../utils/storylines.json";
import attacks from "../../utils/attacks.js";
import Inventory from "../../components/Inventory";
import InventoryPopup from "../../components/InventoryPopup";
import DefaultPopup from "../../components/DefaultPopup";
import ChoiceBlock from "../../components/ChoiceBlock";
import Enemy from "../../components/Enemy";
import Typewriter from 'typewriter-effect';
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const mapStateToProps = (state) => {
    return {
        inventory: state.updateCharacter.inventory,
        stats: state.updateCharacter.stats,
        levels: state.updateCharacter.levels,
        time: state.updateCharacter.time,
        user: state.authenticateUser.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const BoundMainStory = (props) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [snackbarDisplay, setSnackbarDisplay] = useState(false);

    const [storyText, setStoryText] = useState("");
    const [attackText, setAttackText] = useState("");
    const [modifier, setModifier] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentEnemy, setCurrentEnemy] = useState({});
    const [enemyName, setEnemyName] = useState("");
    const [victoryTarget, setVictoryTarget] = useState({});
    const [enemyImage, setEnemyImage] = useState("");
    const [imageDisplay, setImageDisplay] = useState("none");
    const [optionFade, setOptionFade] = useState("hidden");
    const [enemyBlockFade, setEnemyBlockFade] = useState("hidden");
    const [attackDisplay, setAttackDisplay] = useState("none");
    const [saveGameDisplay, setSaveGameDisplay] = useState(false);
    const [typewriterDelay, setTypewriterDelay] = useState(20);
    const [anchorEl, setAnchorEl] = useState(null);

    // this determines the width of the healthbar. Will change based on damage done
    const [enemyHealthWidth, setEnemyHealthWidth] = useState("100%");
    const [userHealthWidth, setUserHealthWidth] = useState("100%");
    const [currentUserHealth, setCurrentUserHealth] = useState(1);
    const [currentEnemyHealth, setCurrentEnemyHealth] = useState(1);
    const [maxHealth, setMaxHealth] = useState();

    // stats that will change and be passed to save function
    const [roundCount, setRoundCount] = useState(1);
    const [skillUsed, setSkillUsed] = useState(false);
    const [cooldownRound, setCooldownRound] = useState(0);
    const [warriorDefenseRound, setWarriorDefenseRound] = useState(0);
    const [tempDefense, setTempDefense] = useState(0);
    const [rogueLuckRound, setRogueLuckRound] = useState(0)
    const [tempLuck, setTempLuck] = useState(0);

    const { updateCharacter, inventory, stats, levels, time, user, resetStore } = props;

    useEffect(() => {
        handleText(levels.current);
    }, [levels])

    useEffect(() => {
        disableIfClicked();
        checkModifier();
    }, [storyText])

    useEffect(() => {
        setButtonTimes();
    }, [typewriterDelay, storyText])

    useEffect(() => {
        // Health bars now update based on the enemy and user's health
        setHealthWidth();
    }, [currentEnemyHealth, currentUserHealth])

    const handleLevel = (choice) => {
        // once level has been chosen, look at the modifiers that are present
        if (isBlacklistedChoice(choice)) {
            updateCharacter({
                level: {
                    current: choice
                }
            });
            handleText(choice);
        } else {
            updateCharacter({
                levels: {
                    visited: [
                        ...levels.visited,
                        choice
                    ],
                    current: choice
                }
            });
            handleText(choice);
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

            }
        }
    }

    // This function renders the decision buttons based on how long it takes to write the story text.
    // number of letters
    const setButtonTimes = () => {
        let speedMultiplier;
        clearTimeout();
        if (storyText.length === 0) {
            return;
        }
        switch (typewriterDelay) {
            case 1:
                speedMultiplier = 11;
                break;
            case 20:
                speedMultiplier = 30;
                break;
            case 40:
                speedMultiplier = 44;
                break;
        }
        setTimeout(() => {
            setOptionFade("fadeIn")
            if (currentEnemy !== {} && currentEnemy.health > 0) {
                displayEnemy();
            }
        }, (storyText.split("").length * speedMultiplier + 2000))

    }

    const checkModifier = () => {
        // checks if there are any modifiers present in this level, and if so sets the applicable one when the buttons render
        // features a check so if they've already visited this level, they can't keep getting the same buff
        if (modifier.length && levels.visited.indexOf(levels.current)) {
            setSnackbarDisplay(true);
            modifier.forEach(mod => {
                const currentMod = Object.keys(mod)[0];
                if (mod.weapon) {
                    updateCharacter({
                        inventory: {
                            weapon: mod.weapon.name,
                            weaponDamage: mod.weapon.dmg
                        }
                    })
                } else if (mod.health) {
                    updateCharacter({
                        stats: {
                            health: stats.health + mod.health > maxHealth ? maxHealth : stats.health + mod.health
                        }
                    });
                } else if (currentMod === 'strength' ||
                    currentMod === 'defense' ||
                    currentMod === 'wisdom' ||
                    currentMod === 'luck') {
                    updateCharacter({
                        stats: {
                            [currentMod]: stats[currentMod] + mod[currentMod]
                        }
                    });
                } else if (currentMod === 'head' ||
                    currentMod === 'chest' ||
                    currentMod === 'legs' ||
                    currentMod === 'hands' ||
                    currentMod === 'feet' ||
                    currentMod === 'torch' ||
                    currentMod === 'amulet') {
                    updateCharacter({
                        inventory: {
                            [currentMod]: mod[currentMod]
                        }
                    });
                } else if (currentMod === 'healthPotion' || currentMod === 'gold') {
                    updateCharacter({
                        inventory: {
                            [currentMod]: inventory[currentMod] + mod[currentMod]
                        }
                    });
                } else if (mod.luckCheck) {
                    setSnackbarDisplay(false);
                    const checkingLuck = async () => {
                        return attacks.campaignLuckCheck(stats.luck, mod.event);
                    }
                    checkingLuck().then((results) => {
                        setOptions([
                            {
                                "label": results[0].label,
                                "target": results[0].target
                            }
                        ]);
                    })
                } else if (mod.torchCheck) {
                    setSnackbarDisplay(false);
                    const checkingTorch = async () => {
                        return attacks.torchCheck(torch);
                    }
                    checkingTorch().then((results) => {
                        setOptions([
                            {
                                "label": results.label,
                                "target": results.target
                            }
                        ]);
                    })
                } else {
                    setSnackbarDisplay(false);
                }
            })
        }
    }

    // Checks that we're in a fight sequence, then displays the enemy based on what its name is. 
    const displayEnemy = () => {
        if (modifier[0].fight && modifier.length < 2) {
            setEnemyImage(enemyName)
            setAttackDisplay("flex");
            setImageDisplay("block");
            setEnemyBlockFade("fadeIn")
            setCurrentUserHealth(stats.health);
            setCurrentEnemyHealth(currentEnemy.health);
            setTimeout(() => {
                const enemyBlock = document.getElementById("enemyBlock");
                enemyBlock.scrollIntoView({ behavior: "smooth" })
            }, 1000);
        }
        return;
    }

    // This takes the value from the option, and sets the level and text based on its target
    const handleClick = (option) => {
        // updateClickedArray(option);
        handleLevel(option.target);
        setOptionFade("none");
        setImageDisplay("none")
        if (option.target === "Main Menu") {
            saveGame().then(() => navigate("/select"));

        }
    }

    const disableIfClicked = () => {
        if (!options) {
            return;
        }
        for (let item of options) {
            if (levels.visited.includes(item.target)) {
                let disabledElement = document.getElementById(stringToCamel(item.label));
                disabledElement.setAttribute("style", "pointer-events: none; color: rgba(0, 0, 0, 0.26); box-shadow: none; background-color: rgba(0, 0, 0, 0.12);")
            }
        }
    };

    const handleFight = async (option) => {
        const { weaponDamage, healthPotions } = inventory;
        const { health, strength, defense, wisdom, luck, charClass } = stats;
        let skillButton = document.getElementById("useSkill");
        switch (option.label) {
            case "Normal Attack":
                const normalAttack = async () => {
                    return attacks.normalAttack(weaponDamage, strength, currentEnemy.defense, luck);
                };
                normalAttack().then(results => {
                    setCurrentEnemyHealth(currentEnemyHealth - results.finalDamage);
                    setAttackText(results.battleText);
                    enemyTurn();
                });
                break;
            case "Special Attack":
                const specialAttack = async () => {
                    return attacks.specialAttack(weaponDamage, strength, currentEnemy.defense, luck, currentEnemy.luck);
                };
                specialAttack().then(results => {
                    setCurrentEnemyHealth(currentEnemyHealth - results.finalDamage)
                    setAttackText(results.battleText)
                    enemyTurn();
                });
                break;
            case "Use health potion":
                const heal = async () => {
                    return attacks.useHealthPotion(healthPotions)
                };
                heal().then(results => {
                    if (results.healthIncrease > 0) {
                        setHealthPotions(healthPotions - 1)
                        // if the user's health with the increase added is MORE than their max, just set it to max.
                        setCurrentUserHealth(currentUserHealth + results.healthIncrease > maxHealth ?
                            maxHealth : currentUserHealth + results.healthIncrease)
                    }
                    setAttackText(results.battleText)
                    enemyTurn();
                });
                break;
            case "Use skill":
                const skill = async () => {
                    return attacks.useSkill(charClass, wisdom, currentEnemy.defense)
                };
                skill().then(async results => {
                    // sets a style to the skill button to make it the only one that continues being disabled.
                    skillButton.setAttribute("style", "pointer-events: none; color: rgba(0, 0, 0, 0.26); box-shadow: none; background-color: rgba(0, 0, 0, 0.12);");
                    setSkillUsed(true);
                    setCooldownRound(roundCount + results.cooldownLength)
                    setAttackText(results.battleText)
                    if (charClass === "Warrior") {
                        setTempDefense(defense);
                        await updateCharacter({
                            stats: {
                                defense: defense + results.skillResult
                            }
                        });
                        setWarriorDefenseRound(roundCount + 3)
                        enemyTurn();
                    } else if (charClass === "Rogue") {
                        setTempLuck(luck);
                        await updateCharacter({
                            stats: {
                                luck: results.skillResult
                            }
                        })
                        setRogueLuckRound(roundCount + 1)
                        enemyTurn();
                    } else {
                        await updateCharacter({
                            stats: {
                                health: maxHealth
                            }
                        });
                        enemyTurn();
                    }
                })
                break;
            default: return;
        }
        // Disables the buttons so the user can't attack while the enemy is, and then adds 1 to the round count.
        // Also check health, to make sure that enemy or user isn't dead
        setButtonDisabled(true);
        setRoundCount(current => current + 1)
    }        
        // if the enemy is still alive, we want to check if we're on the debuff rounds instead
        // if so, reset the stats to their pre-skill values.
        if (roundCount === warriorDefenseRound) {
            updateCharacter({
                stats: {
                    defense: tempDefense
                }
            });
        }
        if (roundCount === rogueLuckRound) {
            updateCharacter({
                stats: {
                    luck: tempLuck
                }
            });
        }
    // If a skill has been used and both the cooldown and roundCount are the same, make the button back to how it was.
    if (cooldownRound === roundCount && skillUsed) {
        skillButton.removeAttribute("style");
    }

    const enemyTurn = () => {
        setTimeout(() => {
             if (currentEnemyHealth > 0) {
            const enemyAttack = async () => {
                return attacks.enemyNormalAttack(currentEnemy.weapon.dmg, currentEnemy.strength, stats.defense, currentEnemy.luck);
            };
            enemyAttack().then((results) => {
                // needed to look at the previous state in order for the enemy to take the correct health into account
                setCurrentUserHealth(current => current - results.finalDamage);
                setAttackText(results.battleText);
            });
            // enable buttons after attack
            setButtonDisabled(false);
        } else {
        // if the enemy is dead, we want to set the enemy health and width to 0, reset the player's buffed values to
        // their pre-skill values, and then move on. 
            setCurrentEnemyHealth(0);
            setEnemyHealthWidth(0);
            if (tempDefense !== 0) {
                updateCharacter({
                    stats: {
                        defense: tempDefense
                    }
                });
            } else if (tempLuck !== 0) {
                updateCharacter({
                    stats: {
                        luck: tempLuck
                    }
                });
            }
            nextPhase();
        }
        }, 3000)
    }

    const setHealthWidth = () => {
        switch (stats.charClass) {
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
        // This sets the red enemy health bar to be a percentage of the total amount
        let enemyNewWidth = (100 * currentEnemyHealth) / currentEnemy.health;
        setEnemyHealthWidth(`${enemyNewWidth}%`);
        // If enemy's health reaches or surpasses 0, set it all to 0 and begin the next phase

        let userNewWidth = (100 * currentUserHealth) / maxHealth;
        setUserHealthWidth(`${userNewWidth}%`);

        if (userNewWidth <= 0) {
            handlePlayerDeath();
        }
    }

    const handlePlayerDeath = () => {
        setEnemyBlockFade("hidden");
        setImageDisplay("none");
        setCurrentEnemy({});
        setStoryText("After fighting valliantly, you succumb to your wounds.")
        setAttackDisplay("none")
        setModifier([
            {
                "death": true
            }
        ]);
        saveGame();
    }

    // Fade the image out after a second, so it's not jarringly quick.
    const nextPhase = async () => {
        updateCharacter({
            stats: {
                health: currentUserHealth
            }
        });
        setTimeout(() => {
            setAttackDisplay("none");
            setEnemyBlockFade("fadeOut")
        }, 1000)
        // Once it's faded, wait another second and hide the image. Clear out the current enemy object and the image, and change the level.
        setTimeout(() => {
            setEnemyBlockFade("hidden");
            setImageDisplay("none");
            setCurrentEnemy({});
            setAttackText("")
            setEnemyImage("");
            setRoundCount(1);
            handleLevel(victoryTarget.target);
            saveGame();
        }, 2000)
        checkModifier()
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (speed, reason) => {
        if (reason !== "backdropClick") {
            setTypewriterDelay(speed);
        }
        setAnchorEl(null);
    };

    const saveGame = () => {
        API.saveCharacter(
            stats.id,
            stats.health,
            stats.strength,
            stats.defense,
            stats.wisdom,
            stats.luck,
            inventory.weapon,
            inventory.weaponDamage,
            inventory.head,
            inventory.chest,
            inventory.legs,
            inventory.hands,
            inventory.feet,
            inventory.torch,
            inventory.amulet,
            inventory.healthPotions,
            inventory.gold,
            levels.current,
            time.value,
            user.jwtToken
        )
            .then((results) => {
                setSaveGameDisplay(true);
            })
    }

    const logout = () => {
        resetStore()
        navigate("/")
    }

    return (
        <Wrapper>
            <Button variant="outlined" id="logout" onClick={logout} disabled={buttonDisabled}>LOG OUT</Button>
            <a id="back" onClick={() => navigate('/select')}>QUIT TO<br />MAIN MENU</a>

            <section className="textArea">
                <Button aria-controls="simple-menu" aria-haspopup="true" id="speedButton" onClick={handleMenuClick}>
                    {"Text Speed >>"}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    elevation={0}
                >
                    <MenuItem onClick={() => handleMenuClose(40)}>Slow</MenuItem>
                    <MenuItem onClick={() => handleMenuClose(20)}>Medium</MenuItem>
                    <MenuItem onClick={() => handleMenuClose(1)}>Fast</MenuItem>
                </Menu>
                <Typewriter
                    options={{
                        strings: storyText,
                        autoStart: true,
                        loop: false,
                        delay: typewriterDelay,
                        wrapperClassName: "text"
                    }}
                />
            </section>

            <Enemy
                imageDisplay={imageDisplay}
                enemyBlockFade={enemyBlockFade}
                currentEnemy={currentEnemy}
                currentEnemyHealth={currentEnemyHealth}
                enemyHealthWidth={enemyHealthWidth}
                enemyImage={enemyImage}
                characterName={stats.name}
                currentUserHealth={currentUserHealth === 1 ? stats.health : currentUserHealth}
                maxHealth={maxHealth}
                userHealthWidth={userHealthWidth}
                optionFade={optionFade}
                attackDisplay={attackDisplay}
                attackText={attackText}
            />

            <div id="optionArea">
                <ChoiceBlock
                    modifier={modifier}
                    optionFade={optionFade}
                    options={options}
                    buttonDisabled={buttonDisabled}
                    handleFight={handleFight}
                    handleClick={handleClick}
                />
            </div>

            <footer id="footer">
                <Inventory
                    id="inventory"
                    disabled={buttonDisabled}
                    health={stats.health}
                    maxHealth={maxHealth}
                    strength={stats.strength}
                    defense={stats.defense}
                    wisdom={stats.wisdom}
                    luck={stats.luck}
                    weapon={inventory.weapon}
                    weaponDamage={inventory.weaponDamage}
                    head={inventory.head}
                    chest={inventory.chest}
                    legs={inventory.legs}
                    hands={inventory.hands}
                    feet={inventory.feet}
                    torch={inventory.torch}
                    amulet={inventory.amulet}
                    healthPotions={inventory.healthPotions}
                    gold={inventory.gold}
                    name={stats.name}
                    race={stats.race}
                    charClass={stats.charClass}
                />
                <div>
                    <Button type="button" id="save" variant="contained" disabled={buttonDisabled} onClick={saveGame}>Save Game</Button>
                </div>

                <img src={smallLogo} alt="a small logo" id="smallLogo" />
            </footer>
            <DefaultPopup display={saveGameDisplay} setDisplay={setSaveGameDisplay} message={`Game saved!`} destination="" snackbarColor="success" />
            <InventoryPopup display={snackbarDisplay} setDisplay={setSnackbarDisplay} items={modifier} />
        </Wrapper>

    )
}

const MainStory = connect(mapStateToProps, mapDispatchToProps)(BoundMainStory);

export default MainStory;