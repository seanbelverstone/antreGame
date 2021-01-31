import React, { useState } from "react";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import "./App.css";

const App = () => {

    const [hide, setHide] = useState(false);
    const [displayedComponent, setDisplayedComponent] = useState(<Login/>)
    const [display, setDisplay] = useState("block");

    const changePage = () => {
        setHide(!hide);
        changeComponent();
    }

    const changeComponent = () => {
        setTimeout(() => {
            setDisplay("none");
            setDisplayedComponent(<CreateAccount />);
            setHide(false)
        }, 500);
    }

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
                    {displayedComponent}
                <a id="create" onClick={() => changePage()} style={{display: display}}>CREATE AN ACCOUNT</a>
            </header>
        </div>
    );
}

export default App;
