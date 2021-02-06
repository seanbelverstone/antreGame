import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import API from "../../utils/API";
import Login from "../Login";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const SelectCharacter = ({ changeToLogin }) => {

    const [characters, setCharacter] = useState([]);
    const [lessThanFour, setLessThanFour] = useState("none");

    // Works the same as componentDidMount. Runs when component has rendered
    useEffect(() => {
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
                <div className="characterBlock" key={character.id}>
                    <div className="characterWrapper">

                        <section className="identity">
                            <div className="name">{character.name}</div>
                            <section className="raceAndClass">
                                <div className="race">{character.race}</div>
                                <div className="class">  {character.class}</div>
                            </section>
                        </section>

                        <section className="stats">
                            <section className="health">
                                <div className="subHeadings">HP</div>
                                <div>{character.health}</div>
                            </section>
                            <section className="strength">
                                <div className="subHeadings">Str</div>
                                <div>{character.strength}</div>
                            </section>
                            <section className="defense">
                                <div className="subHeadings">Def</div>
                                <div>{character.defense}</div>
                            </section>
                            <section className="wisdom">
                                <div className="subHeadings">Wis</div>
                                <div>{character.wisdom}</div>
                            </section>
                            <section className="luck">
                                <div className="subHeadings">Luck</div>
                                <div>{character.luck}</div>
                            </section>                 
                        </section>

                        <section className="levelAndTime">
                            <section className="level">
                                <div className="subHeadings">Level</div>   
                                <div>{character.level}</div>
                            </section>
                            <section  className="time">
                                <div className="subHeadings">Time</div>
                                <div>{character.time}</div>
                            </section>                    
                        </section>
                    </div>
                    <section className="charButtons">
                            <Button variant="contained" color="primary" id="play">
                                PLAY
                            </Button>
                            <Button variant="contained" color="secondary" id="delete">
                                DELETE
                            </Button>
                    </section>
                </div>
            )
        })
    }

    const checkForSpace = () => {
        // Allows the user to have only 4 characters. If they have less than 4, it displays the "create new character" box.
        if(characters.length < 4) {
            setLessThanFour("flex")
        }
    }

    return(
        <div className="wrapper">
            <div id="charTitle">SELECT A CHARACTER</div>
            <Button variant="outlined" id="logout" onClick={() => changeToLogin(<Login />)}>LOG OUT</Button>

            {/* do a map of the characters array, and render them here. */}
            {renderCharacters()}

            <div style={{display: lessThanFour}} id="creatorWrapper" className="characterWrapper">
                <div id="createNew">Create a new character</div>
                <IconButton variant="contained" color="primary">
                    <AddIcon />
                </IconButton>
            </div>

            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default SelectCharacter;