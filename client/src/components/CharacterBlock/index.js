import React from "react";
import { Button } from "@material-ui/core";
import { navigate } from "hookrouter";
import DeleteButton from "../DeleteButton";
import "./style.css";

const CharacterBlock = ({character}) => {
    
    const playThisCharacter = (character) => {
        window.sessionStorage.setItem("currentCharacter", JSON.stringify(character));
        navigate("/play");
    }

    console.log(character.id)
    return(
        <div className="characterBlock">
            <div className="characterWrapper">

                <section className="identity">
                    <div className="name">{character.name}</div>
                    <section className="raceAndClass">
                        <div className="race">{character.race}</div>
                        <div className="charClass">  {character.charClass}</div>
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
                <Button variant="contained" color="primary" id="play" onClick={() => playThisCharacter(character)}>
                    PLAY
                </Button>

                <DeleteButton id={character.id}/>
            </section>
        </div>
    )
}

export default CharacterBlock;