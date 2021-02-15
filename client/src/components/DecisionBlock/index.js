import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { navigate } from "hookrouter";
import storylines from "../../utils/storylines.json";
import attacks from "../../utils/attacks.js";
import Typewriter from 'typewriter-effect';
import smallLogo from "../../assets/images/Antre.png";
import enemies from "../../assets/images/enemyIcons";
import "./style.css";

const DecisionBlock = () => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState({})
    const [currentLevel, setCurrentLevel] = useState("")
    const [storyText, setStoryText] = useState("");
    const [modifier, setModifier] = useState("");
    const [options, setOptions] = useState([]);
    const [clicked, setClicked] = useState("");
    const [currentEnemy, setCurrentEnemy] = useState({});
    const [victoryTarget, setVictoryTarget] = useState({});
    const [enemyImage, setEnemyImage] = useState("");
    const [imageDisplay, setImageDisplay] = useState("none");
    const [optionFade, setOptionFade] = useState("hidden");
    const [enemyBlockFade, setEnemyBlockFade] = useState("hidden");
    // this determines the width of the health. Will change based on damage done
    const [enemyHealthWidth, setEnemyHealthWidth] = useState("100%");
    const [userHealthWidth, setUserHealthWidth] = useState("100%");
    const [currentUserHealth, setCurrentUserHealth] = useState(1);
    const [currentEnemyHealth, setCurrentEnemyHealth] = useState(1);


    useEffect(() => {
        // grabs the current character selected and stores it in state
        setCurrentCharacter(JSON.parse(window.sessionStorage.getItem("currentCharacter")));
    }, [])

    useEffect(() => {
        handleLevel(currentCharacter.level);
        handleText(currentCharacter.level);
    }, [currentCharacter])

    useEffect(() => {
        setButtonTimes();
    }, [storyText])

    useEffect(() => {
        setHealthWidth();
    })

    const handleLevel = (choice) => {
        setCurrentLevel(choice)
    }

    const handleText = (choice) => {
        // loops through the storylines array, and matches the character's level with the corresponding object
        for(let i = 0; i < storylines.length; i++) {
            
            if (storylines[i].level === choice) {
                setStoryText(storylines[i].text);
                setModifier(storylines[i].modifier);
                setOptions(storylines[i].options);
                if (storylines[i].enemy) {
                    setCurrentEnemy(storylines[i].enemy)
                    setVictoryTarget(storylines[i].victory)
                }
                renderOptions();
            }
        }
    }
    
    // maps through the options array and creates divs for them
    const renderOptions = () => {
        if (modifier[0] != undefined && modifier[0].death) {
            return(
                <p className={`options ${optionFade}`}>You died.</p>
            )
        } else if (modifier[0] != undefined && modifier[0].fight) {
            // If fight: true appears in the decision block, render the fight screen instead.
            return(options.map(fightOption => {
                return(
                    <div className={`options ${optionFade}`} key={fightOption.label}>
                        <Button className="optionText" variant="contained" color="secondary" onClick={() => handleFight(fightOption)} disabled={buttonDisabled}>
                            {fightOption.label}
                        </Button>
                    </div>
                    // Need to replace the direction for "RETURN TO THE TASK AT HAND", where it still goes back to the previous section but written slightly different.
                )
            }))
        } else {
            // Otherwise, show the option page
            return options.map(option => {
                return(
                    <div className={`options ${optionFade}`} key={option.target}>
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
        setTimeout(() => {
            setOptionFade("fadeIn")
            displayEnemy();
        }, (storyText.length * 30 + 2000))

    }

    // Checks that we're in a fight sequence, then displays the enemy based on what its name is. 

    // For some reason this is running after an enemy has been killed... not sure how to fix that
    const displayEnemy = () => {
        if (modifier[0] != undefined && modifier[0].fight) {
            console.log("displaying enemy")
            setEnemyImage(enemies[currentEnemy.name])
            setImageDisplay("block");
            setEnemyBlockFade("fadeIn")
            setCurrentUserHealth(currentCharacter.health);
            setCurrentEnemyHealth(currentEnemy.health);
            decideTurn();
        }
        return;
    }

    const decideTurn = () => {
        // Begin each battle with a dice roll, to see who goes first
        let diceRoll = (Math.floor(Math.random() * 6) + 1);
        if (diceRoll >= 1 || diceRoll <= 3) {
            console.log("Your turn")
            setButtonDisabled(false);
        } else {
            console.log("Enemy turn")
            setButtonDisabled(true);
            enemyTurn();
        }
        
    }

    const enemyTurn = () => {
        attacks.enemyNormalAttack(currentEnemy.weapon.dmg, currentEnemy.strength, currentCharacter.defense, currentUserHealth, setCurrentUserHealth)
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
        
        switch (option.label) {
            case "Normal Attack":
                attacks.normalAttack(currentCharacter.weapon, currentCharacter.strength, currentEnemy.defense, currentEnemyHealth, setCurrentEnemyHealth);
                break;
            case "Special Attack":
                attacks.specialAttack(currentCharacter.weapon, currentCharacter.strength, currentEnemy.defense, currentCharacter.luck, currentEnemy.luck, currentEnemyHealth, setCurrentEnemyHealth);
                break;
            case "Use health potion":
                attacks.useHealthPotion();
                break;
            case "Use skill":
                attacks.useSkill(currentCharacter.charClass);
                break;
            default: return;
        }

        if (currentEnemyHealth > 0) {
            enemyTurn();
        }
    }

    const setHealthWidth = () => {
        // This sets the red enemy health bar to be a percentage of the total amount
        let enemyNewWidth = (100 * currentEnemyHealth) / currentEnemy.health;
        setEnemyHealthWidth(`${enemyNewWidth}%`);
        // If enemy's health reaches or surpasses 0, set it all to 0 and begin the next phase
        if (enemyNewWidth <= 0) {
            console.log("Enemy defeated")
            setCurrentEnemyHealth(0);
            setEnemyHealthWidth(0);
            nextPhase();
        }

        let userNewWidth = (100 * currentUserHealth) / currentCharacter.health;
        setUserHealthWidth(`${userNewWidth}%`);
        if (userNewWidth <= 0) {
            console.log("You are dead.")
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
            setEnemyBlockFade("fadeOut")
        }, 1000)
        // Once it's faded, wait another second and hide the image. Clear out the current enemy object and the image, and change the level.
        setTimeout(() => {
            setEnemyBlockFade("hidden");
            setImageDisplay("none");
            setCurrentEnemy({});
            setEnemyImage("");
            setClicked(victoryTarget.target)
            handleLevel(victoryTarget.target);
            handleText(victoryTarget.target);
            // After fights are complete, save game
        }, 2000)
    }

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return(
        <div className="decisionWrapper">
            <Button variant="outlined" id="logout" onClick={logout} disabled={buttonDisabled}>LOG OUT</Button>
            
            <Typewriter
                id="text"
                options={{
                    strings: storyText,
                    autoStart: true,
                    loop: false,
                    delay: 20,
                }}

            />
            <div style={{display: imageDisplay}} className={enemyBlockFade} id="enemyBlock">
                <div>{currentEnemy.name}</div>
                <div className="healthArea">
                    <div className="healthText">
                        {currentEnemyHealth}/{currentEnemy.health}
                    </div>
                    <div id="enemyBar" style={{width: enemyHealthWidth}}></div>
                </div>

                <img src={enemyImage} />
                
                <div id="charName">{currentCharacter.name}</div>
                <div className="healthArea" id="userHealthArea">
                    <div className="healthText">
                        {currentUserHealth}/{currentCharacter.health}
                    </div>
                    <div id="userBar" style={{width: userHealthWidth}}></div>
                </div>
            </div>
            
            <div id="optionArea">{renderOptions()}</div>

            <footer id="footer">
                <Button variant="contained" disabled={buttonDisabled}>Inventory</Button>
                <Button variant="contained" disabled={buttonDisabled}>Save Game</Button>

                <img src={smallLogo} alt="a small logo" id="smallLogo"/>
            </footer>
        </div>
                    
    )
}

export default DecisionBlock;