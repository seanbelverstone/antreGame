import React, { useState } from "react";
import SelectCharacter from "../SelectCharacter";
import API from "../../utils/API";
import logo from "../../assets/images/AntreLarge.png";
import { TextField, Button } from "@material-ui/core";
import "./style.css";

const Login = ({ changeComponent }) => {

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState("");


    const onSubmit = (event) => {
        event.preventDefault();
        API.checkUser(username, password)
            .then(results => {

                // Clears out any errors if there are any
                setUsernameError(false);
                setPasswordError(false);
                setPasswordHelperText("");

                // set the user's ID to session storage, so we can use it throughout the applicable
                window.sessionStorage.setItem("id", results.data.user.id);

                changeComponent(<SelectCharacter />)
            })
            .catch(error => {
                console.log(error);
                setUsernameError(true);
                setPasswordError(true);
                setPasswordHelperText(`Username/password doesn't exist.`)
            });
    }
    

    return(
        <div>
            <img src={logo} alt="logo" className="wrapper"/>
            <form noValidate autoComplete="off" id="login" onSubmit={onSubmit}>
                <TextField 
                    className="formInput" 
                    label="Username" 
                    variant="outlined"
                    onChange={event => setUsername(event.target.value)} 
                    error={usernameError} 
                    />
                <TextField 
                    className="formInput" 
                    label="Password" 
                    variant="outlined" 
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                    error={passwordError} 
                    helperText={passwordHelperText}
                    />
                <Button 
                    variant="contained" 
                    color="primary"
                    type="submit"
                    >
                    Login
                </Button>
            </form>
        </div>
                    
    )
}

export default Login;