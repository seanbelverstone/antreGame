import React, { useState } from "react";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import "./App.css";

const App = () => {

    const changeToCreatePage = (component) => {
        setHide(!hide);
        changeComponent(component, "none", "block");
        window.sessionStorage.removeItem("antreUsername");
    }

    const changeToLoginPage = (component) => {
        setHide(!hide);
        changeComponent(component, "block", "none");
    }

    const changeToSelectCharacterPage = (component) => {
        setHide(!hide);
        changeComponent(component, "none", "none");
    }

    const changeToCreateCharacterPage = (component) => {
        setHide(!hide);
        changeComponent(component, "none", "none");
    }

    const changeComponent = (component, createStyle, backStyle) => {
        setTimeout(() => {
            setCreateDisplay(createStyle);
            setBackDisplay(backStyle);
            setDisplayedComponent(component);
            setHide(false)
        }, 500);
    }

    // Having to set state after the functions have been created, running into asynchronous issues.
    // State for hiding login wrapper
    const [hide, setHide] = useState(false);
    // Set default component to be Login. Have to pass changeComponent twice, due to the way it renders.
    const [displayedComponent, setDisplayedComponent] = useState(<Login changeToCharacter={changeToSelectCharacterPage} changeToLogin={changeToLoginPage} changeToCreate={changeToCreateCharacterPage}/>)
    // State for CREATE AN ACCOUNT text
    const [createDisplay, setCreateDisplay] = useState("block");
    // State for BACK button on CreateAccount page
    const [backDisplay, setBackDisplay] = useState("none");


    

// PSUEDOCODE
/* 
Have a rendered component within App.
- Create an if statement that does onload, display Login. If createAccount is clicked, set Login style to animation + display none. Set show animation to CreateAccount to show.
- Toast popup on account created, CreateAccount style animation + display none, opposite for Login. Maybe autofill Login with created account username?
- Then, when login button is clicked, if password matches, show character creation screen.
- Character Creation will have a block, with created characters shown (get request for characterController). This displays the character's details and part of the level (if saved/applicable).
- New Character button is available, character creation modal pops up. User creates character, modal disappears and getAllCharacters runs again.
- When character is selected, go to relevant level (default is start for new character).
*/



    return (
        <div className="App">
            <header className="loginWrapper" id={hide ? "hide" : "show"}>
                {/* Back button goes back to Login page, and we're passing in the changeComponent function */}
                <a id="back" 
                    onClick={() => changeToLoginPage(<Login changeToCharacter={changeToSelectCharacterPage} changeToLogin={changeToLoginPage} changeToCreate={changeToCreateCharacterPage}/>)} 
                    style={{display: backDisplay}}>
                        BACK</a>
                    {displayedComponent}
                <a id="create" onClick={() => changeToCreatePage(<CreateAccount changeToCharacter={changeToSelectCharacterPage} changeToLogin={changeToLoginPage} changeToCreate={changeToCreateCharacterPage}/>)} style={{display: createDisplay}}>CREATE AN ACCOUNT</a>
            </header>
        </div>
    );
}

export default App;
