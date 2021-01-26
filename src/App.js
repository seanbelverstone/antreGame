import React, { useState } from "react";
import logo from "./assets/images/Antre.png";
import "./App.css";

function App () {

    const [hide, setHide] = useState(false);

    

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className={hide ? "hide" : "show"} alt="logo"/>
                <button 
                    id="playButton" 
                    onClick={() => setHide(!hide)} 
                    className={hide ? "hide" : "show"}>
                        Play
                </button>
            </header>
        </div>
    );
}

export default App;
