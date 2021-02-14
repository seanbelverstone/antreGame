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

    const [currentCharacter, setCurrentCharacter] = useState({})
    const [currentLevel, setCurrentLevel] = useState("")
    const [storyText, setStoryText] = useState("");
    const [modifier, setModifier] = useState("");
    const [options, setOptions] = useState([]);
    const [clicked, setClicked] = useState("");
    const [currentEnemy, setCurrentEnemy] = useState({});
    const [enemyImage, setEnemyImage] = useState("");
    const [imageDisplay, setImageDisplay] = useState("none");
    const [optionFade, setOptionFade] = useState("hidden");
    // this determines the width of the health. Will change based on damage done
    const [enemyHealthWidth, setEnemyHealthWidth] = useState("100%");
    const [userHealthWidth, setUserHealthWidth] = useState("100%");

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
                }
                renderOptions();
            }
        }
    }
    
    // maps through the options array and creates divs for them
    const renderOptions = () => {
        if (modifier[0] != undefined && modifier[0].death) {
            return(
                <p>You died.</p>
            )
        } else if (modifier[0] != undefined && modifier[0].fight) {
            // If fight: true appears in the decision block, render the fight screen instead.
            return(options.map(fightOption => {
                return(
                    <div className={`options ${optionFade}`} key={fightOption.label} display={{display: imageDisplay}}>
                        <Button className="optionText" variant="contained" color="secondary" onClick={() => handleFight(fightOption)}>
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
                    <div className={`options ${optionFade}`} key={option.target}  display={{display: imageDisplay}}>
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
            setOptionFade("fade")
            displayEnemy();
        }, (storyText.length * 30 + 2000))

    }

    // Checks that we're in a fight sequence, then displays the enemy based on what its name is. 
    const displayEnemy = () => {
        if (modifier[0] != undefined && modifier[0].fight) {
            setEnemyImage(enemies[currentEnemy.name])
            setImageDisplay("block")
        }
        return;
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
        console.log(option)
        console.log(currentEnemy);
        console.log(currentCharacter);
        // inside here, do a switch case for normal attack, special attack etc.
        switch (option.label) {
            case "Normal Attack":
                attacks.normalAttack(currentCharacter.weapon, currentCharacter.strength, currentEnemy.defense);
                break;
            case "Special Attack":
                attacks.specialAttack(currentCharacter.weapon, currentCharacter.strength, currentEnemy.defense, currentCharacter.luck, currentEnemy.luck);
                break;
            case "Use health potion":
                attacks.useHealthPotion();
                break;
            case "Use skill":
                attacks.useSkill(currentCharacter.charClass);
                break;
            default: return
        }
    }

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return(
        <div className="decisionWrapper">
            <Button variant="outlined" id="logout" onClick={logout}>LOG OUT</Button>
            
            <Typewriter
                id="text"
                options={{
                    strings: storyText,
                    autoStart: true,
                    loop: false,
                    delay: 20,
                }}

            />
            <div style={{display: imageDisplay}} className={optionFade} id="enemyBlock">
                <div>{currentEnemy.name}</div>
                <div className="healthArea">
                    <div className="healthText">
                        {currentEnemy.health}/{currentEnemy.health}
                    </div>
                    <div id="enemyBar" style={{width: enemyHealthWidth}}></div>
                </div>

                <img src={enemyImage} />
                
                <div id="charName">{(currentCharacter.name).toUpperCase()}</div>
                <div className="healthArea" id="userHealthArea">
                    <div className="healthText">
                        {currentCharacter.health}/{currentCharacter.health}
                    </div>
                    <div id="userBar" style={{width: userHealthWidth}}></div>
                </div>
            </div>
            <div id="optionArea">{renderOptions()}</div>

            <footer id="footer">
                <Button variant="contained">Inventory</Button>
                <Button variant="contained">Save Game</Button>

                <img src={smallLogo} alt="a small logo" id="smallLogo"/>
            </footer>
        </div>
                    
    )
}

export default DecisionBlock;