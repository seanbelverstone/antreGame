import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { navigate } from "hookrouter";
import storylines from "../storylines.json";
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


    useEffect(() => {
        // grabs the current character selected and stores it in state
        setCurrentCharacter(JSON.parse(window.sessionStorage.getItem("currentCharacter")));
    }, [])

    useEffect(() => {
        handleLevel(currentCharacter.level);
        handleText(currentCharacter.level);
    }, [currentCharacter])

    const handleLevel = (choice) => {
        setCurrentLevel(choice)
    }

    const handleText = (choice) => {
        // loops through the storylines array, and matches the character's level with the corresponding object
        for(let i = 0; i < storylines.length; i++) {
            
            if (storylines[i].level === choice) {
                setStoryText(storylines[i].text)
                setModifier(storylines[i].modifier);
                setOptions(storylines[i].options);
                if (storylines[i].enemy) {
                    setCurrentEnemy(storylines[i].enemy)
                }
                renderOptions();
            }
        }
    }

    const renderOptions = () => {
        // maps through the options array and creates divs for them
        if (modifier[0] != undefined && modifier[0].death) {
            return(
                <p>You died.</p>
            )
        } else if (modifier[0] != undefined && modifier[0].fight) {
            // If fight: true appears in the decision block, render the fight screen instead.

            // Trying to make it so the image is set to be whatever comes through dynamically, but will take some further thought.
            // setEnemyImage(`../../assets/images/enemyImages/${enemy}`)
            // setImageDisplay("block");
            return(options.map(fightOption => {
                return(
                    <div className="options" key={fightOption.target}>
                        <Button className="optionText" variant="contained" color="secondary" onClick={() => handleFightChoice(fightOption)}>
                            {fightOption.label}
                        </Button>
                    </div>
                )
            }))
        } else {
            // Otherwise, show the option page
            return options.map(option => {
                return(
                    <div className="options" key={option.target}>
                        <Button className="optionText" variant="contained" color="primary" onClick={() => handleClick(option)}>
                            {option.label}
                        </Button>
                    </div>
                )
            })
        }
    }

    // This takes the value from the option, and sets the level and text based on its target
    const handleClick = (option) => {
        setClicked(option.target);
        handleLevel(option.target);
        handleText(option.target);
    }

    const handleFight = (option) => {
        console.log(option)
        // inside here, do a switch case for normal attack, special attack etc.
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
                    delay: 50
                }}
            />

            <img src={currentEnemy} style={{display: imageDisplay}} id="enemyImage" />
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