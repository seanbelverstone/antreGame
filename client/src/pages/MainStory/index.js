import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Menu, MenuItem } from "@material-ui/core";
import { navigate } from "hookrouter";
import API from "../../utils/API";
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

const MainStory = () => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [snackbarDisplay, setSnackbarDisplay] = useState(false);

    const [currentCharacter, setCurrentCharacter] = useState({})
    const [currentLevel, setCurrentLevel] = useState("")
    const [storyText, setStoryText] = useState("");
    const [attackText, setAttackText] = useState("");
    const [modifier, setModifier] = useState([]);
    const [options, setOptions] = useState([]);
    const [clicked, setClicked] = useState([]);
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

    const handleStats = (c) => {
        console.log("updating stats")
        setCurrentUserHealth(c.health)
        setStrength(c.strength);
        setDefense(c.defense);
        setWisdom(c.wisdom);
        setLuck(c.luck);
        setWeapon(c.weapon);
        setWeaponDmg(c.weaponDamage)
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
        // once level has been chosen, look at the modifiers that are present
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
        switch(typewriterDelay) {
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
        // adding the second clause makes sure that users cant just keep refreshing the same page to get unlimited upgrades
        console.log(modifier)
        if (modifier.length && currentCharacter.level !== currentLevel) {
            setSnackbarDisplay(true);
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
                } else if (mod.torch || mod.torch === 0) {
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
                    setSnackbarDisplay(false);
                    const checkingLuck = async () => {
                        return attacks.campaignLuckCheck(luck, mod.event);
                    }
                    checkingLuck().then((results) => {
                        console.log(results)
                        setOptions([
                            {
                                "label": results[0].label,
                                "target": results[0].target
                            }
                        ]);
                    })
                } else if (mod.torchCheck) {
                    setSnackbarDisplay(false);
                    console.log("here")
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
        updateCharacter();
    }

    // Checks that we're in a fight sequence, then displays the enemy based on what its name is. 
    const displayEnemy = () => {
        if (modifier[0].fight && modifier.length < 2) {
            console.log("displaying enemy")
            console.log(enemyName)
            setEnemyImage(enemyName)

            setAttackDisplay("flex");
            setImageDisplay("block");
            setEnemyBlockFade("fadeIn")
            setCurrentUserHealth(currentCharacter.health);
            setCurrentEnemyHealth(currentEnemy.health);
            setTimeout(() => {
                const enemyBlock = document.getElementById("enemyBlock");
                enemyBlock.scrollIntoView({ behavior: "smooth" })
            }, 1000);
        }
        return;
    }

    const checkHealth = () => {
        if (currentEnemyHealth > 0 && currentUserHealth > 0) {
            setTimeout(() => {
                enemyTurn();
            }, 3000)
        } else {
            return;
        }
    }

    const enemyTurn = () => {
        const enemyAttack = async () => {
            return attacks.enemyNormalAttack(currentEnemy.weapon.dmg, currentEnemy.strength, defense);
        };

        enemyAttack().then((results) => {
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
        updateClickedArray(option);
        handleLevel(option.target);
        handleText(option.target);
        setOptionFade("none");
        setImageDisplay("none")
        if (option.target === "Main Menu") {
            saveGame().then(() => navigate("/select"));

        }
    }

    const updateClickedArray = (option) => {
        // prevents the option from being added to the array twice.
        if ( option.target === "01-Start"
         || option.target === "02-Tunnel"
         || option.target === "02-Tunnel Return Variant"
         || option.target === "03-Three Paths"
         || option.target === "13a-Wrong room"
         || option.target === "13aa-Wrong room" 
         || option.target === "13b-Correct room" 
         || option.target === "13bb-Correct room") {
            // For the random room puzzle, don't deactivate anything
            return;
        } else if (clicked.includes(option.target)) {
            disableIfClicked(option);
            return;
        } else {
            setClicked([...clicked, option.target])
        }
    }

    const disableIfClicked = () => {
        if (!options) {
            return;
        }
        for(let item of options) {
            if (clicked.includes(item.target)) {
                let disabledElement = document.getElementById(item.label);
                disabledElement.setAttribute("style", "pointer-events: none; color: rgba(0, 0, 0, 0.26); box-shadow: none; background-color: rgba(0, 0, 0, 0.12);")
            }
        }
    };

    const handleFight = (option) => {
        let skillButton = document.getElementById("Use skill");
        switch (option.label) {
            case "Normal Attack":
                const normalAttack = async () => {
                    return attacks.normalAttack(weaponDmg, strength, currentEnemy.defense);
                };
                normalAttack().then(results => {
                    setCurrentEnemyHealth(currentEnemyHealth - results.finalDamage)
                    setAttackText(results.battleText)
                });
                break;
            case "Special Attack":
                const specialAttack = async () => {
                    return attacks.specialAttack(weaponDmg, strength, currentEnemy.defense, luck, currentEnemy.luck);
                };
                specialAttack().then(results => {
                    setCurrentEnemyHealth(currentEnemyHealth - results.finalDamage)
                    setAttackText(results.battleText)
                })
                break;
            case "Use health potion":
                const heal = async () => {
                    return attacks.useHealthPotion(healthPotions)
                };
                heal().then(results => {
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
                const skill = async () => {
                    return attacks.useSkill(currentCharacter.charClass, wisdom, currentEnemy.defense)
                };
                skill().then(results => {
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
            setCurrentEnemyHealth(0);
            setEnemyHealthWidth(0);
            nextPhase().then(() => checkModifier());
            return;
        }

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
        ])
    }

    // Fade the image out after a second, so it's not jarringly quick.
    const nextPhase = async () => {
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
            handleText(victoryTarget.target);
            // After fights are complete, update the character in sessionStorage
            updateCharacter();
        }, 2000)
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
            "weaponDamage": weaponDmg,
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

    const saveGame = async () => {
        updateCharacter();
        API.updateCharacter(
            currentUserHealth,
            strength,
            defense,
            wisdom,
            luck,
            weapon,
            weaponDmg,
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
                setSaveGameDisplay(true);
            })
    }

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return (
        <Wrapper>
            <Button variant="outlined" id="logout" onClick={logout} disabled={buttonDisabled}>LOG OUT</Button>
            <a id="back" href={"/select"}>QUIT TO<br />MAIN MENU</a>
            
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
                currentCharacter={currentCharacter}
                currentUserHealth={currentUserHealth}
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
                    name={currentCharacter.name}
                    race={currentCharacter.race}
                    charClass={currentCharacter.charClass}
                />
                <div>
                    <Button type="button" id="save" variant="contained" disabled={buttonDisabled} onClick={saveGame}>Save Game</Button>
                </div>

                <img src={smallLogo} alt="a small logo" id="smallLogo" />
            </footer>
            <DefaultPopup display={saveGameDisplay} setDisplay={setSaveGameDisplay} message={`Game saved!`} destination="" snackbarColor="success"/>
            <InventoryPopup display={snackbarDisplay} setDisplay={setSnackbarDisplay} items={modifier} />
        </Wrapper>

    )
}

export default MainStory;