import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { navigate } from "hookrouter";
import storylines from "../storylines.json";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const DecisionBlock = () => {

    const [currentCharacter, setCurrentCharacter] = useState({})
    const [currentLevel, setCurrentLevel] = useState("")
    const [storyText, setStoryText] = useState("");
    const [modifier, setModifier] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // grabs the current character selected and stores it in state
        setCurrentCharacter(JSON.parse(window.sessionStorage.getItem("currentCharacter")));
    }, [])

    useEffect(() => {
        handleLevel();
        handleText();
    }, [currentCharacter])

    const handleLevel = () => {
        setCurrentLevel(currentCharacter.level)
    }

    const handleText = () => {
        // loops through the storylines array, and matches the character's level with the corresponding object
        for(let i = 0; i < storylines.length; i++) {
            
            if (storylines[i].level === currentCharacter.level) {
                setStoryText(storylines[i].text.split("||"))
                setModifier(storylines[i].modifier);
                setOptions(storylines[i].options);
                renderOptions();
            }
        }
    }

    const renderOptions = () => {
        // maps through the options array and creates divs for them
        return options.map(option => {
            return(
                <div className="options" key={option.target}>
                    <Button className="optionText" variant="contained" color="primary">
                        {option.label}
                    </Button>
                </div>
            )
        })
    }

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return(
        <div className="decisionWrapper">
            <Button variant="outlined" id="logout" onClick={logout}>LOG OUT</Button>
            <p id="text">{storyText}</p>

            <div id="optionArea">{renderOptions()}</div>

            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default DecisionBlock;