import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import API from "../../utils/API";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const SelectCharacter = () => {

    const [characters, setCharacter] = useState([]);
    const [lessThanFour, setLessThanFour] = useState("none");

    // Works the same as componentDidMount. Runs when component has rendered
    useEffect(() => {
        console.log("rendered")
        const userId = parseInt(window.sessionStorage.getItem("id"));
        API.getAllCharacters(userId)
        .then(results => {
            // pushes the data to the characters array
            setCharacter(results.data);
            checkForSpace();
        })
        // have to pass an array as a second argument to stop infinite loops
    }, [])

    const renderCharacters = () => {
        return characters.map((character) => {
            return(
            <div className="characterWrapper" key={character.id}>

                <section className="identity">
                    <div className="name">{character.name}</div>
                    <div className="race">{character.race}</div>
                    <div className="class">{character.class}</div>
                </section>

                <section className="stats">
                    <div>Health</div>
                    <div className="health">{character.health}</div>
                    <div>Strength</div>
                    <div className="strength">{character.strength}</div>
                    <div>Defense</div>
                    <div className="defense">{character.defense}</div>
                    <div>Wisdom</div>
                    <div className="wisdom">{character.wisdom}</div>
                    <div>Luck</div>
                    <div className="luck">{character.luck}</div>
                </section>

                <section className="levelAndTime">
                    <div>Level</div>   
                    <div className="level">{character.level}</div>
                    <div>Time</div>
                    <div className="time">{character.time}</div>
                </section>

            </div>
            )
        })
    }

    const checkForSpace = () => {
        // Allows the user to have only 4 characters
        if(characters.length < 4) {
            setLessThanFour("block")
        }
    }

    return(
        <div className="wrapper">
            <div>SELECT A CHARACTER</div>
            <Button variant="outlined">LOG OUT</Button>
            {/* do a map of the characters array, and render them here. */}
            {renderCharacters()}
            <div style={{display: lessThanFour}}>Create a new character</div>
            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default SelectCharacter;