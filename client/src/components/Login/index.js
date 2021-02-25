import React, { useState } from "react";
import { navigate } from "hookrouter";
import API from "../../utils/API";
import logo from "../../assets/images/AntreLarge.png";
import { TextField, Button } from "@material-ui/core";
import "./style.css";

const Login = ({ changeToCharacter, changeToLogin, changeToCreate }) => {

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
                window.sessionStorage.setItem("jwtToken", results.data.token);
            })
            .then(() => {
                navigate("/select");
            })
            .catch(error => {
                console.log(error);
                setUsernameError(true);
                setPasswordError(true);
                setPasswordHelperText(`Username/password doesn't exist.`)
            });
    }

    return(
        <div className="loginWrapper">
            <img src={logo} alt="logo" id="antreLogo"/>
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
                <a id="create" href="/account">CREATE AN ACCOUNT</a>
            </form>
        </div>
                    
    )
}

export default Login;