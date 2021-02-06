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
                    <section className="raceAndClass">
                        <div className="race">{character.race}</div>
                        <div className="class">  {character.class}</div>
                    </section>
                </section>

                <section className="stats">
                    <section className="health">
                        <div>Health</div>
                        <div>{character.health}</div>
                    </section>
                    <section className="strength">
                        <div>Strength</div>
                        <div>{character.strength}</div>
                    </section>
                    <section className="defense">
                        <div>Defense</div>
                        <div>{character.defense}</div>
                    </section>
                    <section className="wisdom">
                        <div>Wisdom</div>
                        <div>{character.wisdom}</div>
                    </section>
                    <section className="luck">
                        <div>Luck</div>
                        <div>{character.luck}</div>
                    </section>                 
                </section>

                <section className="levelAndTime">
                    <section className="level">
                        <div>Level</div>   
                        <div>{character.level}</div>
                    </section>
                    <section  className="time">
                        <div>Time</div>
                        <div>{character.time}</div>
                    </section>                    
                </section>
                <Button variant="contained" color="primary">
                    PLAY
                </Button>
                <Button variant="contained" color="secondary">
                    DELETE
                </Button>
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