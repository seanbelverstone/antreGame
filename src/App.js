import React, { useState } from "react";
import logo from "./assets/images/AntreLarge.png";
import { TextField, Button } from "@material-ui/core";
import "./App.css";

function App () {

    const [hide, setHide] = useState(false);

    

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className={hide ? "hide" : "show"} alt="logo" id="logo"/>
                {/* <button 
                    id="playButton" 
                    onClick={() => setHide(!hide)} 
                    className={hide ? "hide" : "show"}>
                        Play
                </button> */}
                <form noValidate autoComplete="off" id="login">
                    <TextField id="outlined-basic" label="Username" variant="outlined"/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                    <a id="create">CREATE AN ACCOUNT</a>
                </form>
                
            </header>
        </div>
    );
}

export default App;
