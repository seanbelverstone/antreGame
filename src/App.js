import React from "react";
import logo from "./assets/images/Antre.png";
import "./App.css";

function App () {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="logo" alt="logo" />
                <button id="playButton" onClick={hideLogo}>Play</button>
            </header>
        </div>
    );
}

const hideLogo = () => {
    console.log()
}

export default App;
