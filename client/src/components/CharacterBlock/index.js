import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux"
import * as actionCreators from "../../redux/actions/actionCreators";
import { Button } from "@material-ui/core";
import { navigate } from "hookrouter";
import DeleteButton from "../DeleteButton";
import "./style.css";

const mapStateToProps = (state) => {
    return {
        inventory: state.updateCharacter.inventory,
        stats: state.updateCharacter.stats,
        levels: state.updateCharacter.levels,
        time: state.updateCharacter.time
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const BoundCharacterBlock = (props) => {
    const { updateCharacter, character, levels } = props;
    
    const playThisCharacter = (character) => {
        updateCharacter({
            inventory: {
                weapon: character.weapon,
                weaponDamage: character.weaponDamage,
                head: character.head,
                chest: character.chest,
                legs: character.legs,
                hands: character.hands,
                feet: character.feet,
                torch: character.torch,
                amulet: character.amulet,
                healthPotions: character.healthPotions,
                gold: character.gold
            }
        });
        updateCharacter({
            stats: {
                id: character.id,
                name: character.name,
                race: character.race,
                charClass: character.charClass,
                health: character.health,
                strength: character.strength,
                defense: character.defense,
                wisdom: character.wisdom,
                luck: character.luck
            }

        });
        updateCharacter({
            levels: {
                visited: [
                    ...levels.visited,
                    character.level
                ],
                current: character.level
            }
        });
        updateCharacter({
            time: {
                value: character.time
            }
        });
        navigate("/play");
    }

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

const CharacterBlock = connect(mapStateToProps, mapDispatchToProps)(BoundCharacterBlock);

export default CharacterBlock;