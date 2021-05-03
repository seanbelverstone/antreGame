import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import API from "../../utils/API";
import { navigate } from "hookrouter";
import Wrapper from "../../components/Wrapper";
import CharacterBlock from "../../components/CharacterBlock";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const SelectCharacter = () => {

    const userId = parseInt(window.sessionStorage.getItem("id"));

    const [characters, updateCharacters] = useState([]);
    const [lessThanFour, setLessThanFour] = useState("none");

    useEffect(() => {
        API.getAllCharacters(userId)
        .then(results => {
            // pushes the data to the characters array
            const newCharacters = results.data;
            updateCharacters(prev => [...prev, ...newCharacters]);
        });
        checkForSpace();
    }, [userId])

    useEffect(() => {
        if (characters.length) {
            checkForSpace()
        }
    }, [characters]);

    const renderCharacters = () => {
        return characters.map(character => <CharacterBlock character={character} key={character.id}/>)
    }

    const checkForSpace = () => {
        // Allows the user to have only 4 characters. If they have less than 4, it displays the "create new character" box.
        if(characters.length < 4) {
            setLessThanFour("flex")
        } else {
            setLessThanFour("none")
        }
    }

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return(
        <Wrapper>
            <div id="charTitle">SELECT A CHARACTER</div>
            <Button variant="outlined" id="logoutButton" onClick={logout}>LOG OUT</Button>

            {/* do a map of the characters array, and render them here. */}
            {renderCharacters()}

            <div style={{display: lessThanFour}} id="creatorWrapper" className="characterWrapper">
                <div id="createNew">Create a new character</div>
                <IconButton variant="contained" color="primary" onClick={() => navigate("/create")}>
                    <AddIcon />
                </IconButton>
            </div>

            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </Wrapper>
                    
    )
}

export default SelectCharacter;