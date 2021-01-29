import React, { useState } from "react";
import Login from "./components/Login";

const App = () => {

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
            <Login />
        </div>
    );
}

export default App;
