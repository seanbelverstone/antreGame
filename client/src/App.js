import React, { useState } from "react";
import logo from "./assets/images/AntreLarge.png";
import { TextField, Button } from "@material-ui/core";
import "./App.css";

function App () {

    const [hide, setHide] = useState(false);

    

    return (
        <div className="App">
            <header className="App-header" id={hide ? "hide" : "show"}>
                <img src={logo} alt="logo" id="logo"/>
                <form noValidate autoComplete="off" id="login">
                    <TextField className="formInput" label="Username" variant="outlined"/>
                    <TextField className="formInput" label="Password" variant="outlined" type="password"/>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => setHide(!hide)} 
                        >
                        Login
                    </Button>
                    <a id="create">CREATE AN ACCOUNT</a>
                    {/* will do api call here to make an account to database */}
                </form>
                
            </header>
        </div>
    );
}

export default App;
