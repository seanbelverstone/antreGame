import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Snackbar from "../Snackbar";
import API from "../../utils/API";
import smallLogo from "../../assets/images/Antre.png"
import "../../App.css";
import "./style.css";

const CreateAccount = () => {

    // State for username section
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelperText, setUsernameHelperText] = useState("");

    // Email state handlers
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState("");

    // Password state handlers
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState("");

    const [snackbarDisplay, setSnackbarDisplay] = useState(false);

    // Email validation check with regex
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Staggering the checks, both to retain the styling of the site, and also to enable the button when all is complete
        checkUsername();
    }

    // Username validation
    const checkUsername = () => {
        if (username.length < 1 || username.length > 12) {
            setUsernameError(true);
            setUsernameHelperText("Please choose a username between 1 - 12 letters");
            return;
        } else {
            setUsernameError(false);
            setUsernameHelperText("");
            checkEmail();
        }
    }

    // Email validation
    const checkEmail = () => {
        if(!validateEmail(email)) {
            setEmailError(true);
            setEmailHelperText("Please enter a valid email")
        } else {
            setEmailError(false);
            setEmailHelperText("");
            checkPasswords();
        }
    }

    const checkPasswords = () => {
        if (password !== confirmPassword) {
            setPasswordError(true);
            setPasswordHelperText("Passwords don't match")
        } if (password.length === 0 || confirmPassword.length === 0) {
            setPasswordError(true);
            setPasswordHelperText("Please enter a password")
        } else {
            setPasswordError(false);
            setPasswordHelperText("");

            createNewUser();
        }
    }

    const createNewUser = () => {
        API.createUser(username, email, password).then(() => {
            // Set the username to session storage so we can use it later
            window.sessionStorage.setItem("antreUsername", username);
        });
        setSnackbarDisplay(true);
    }

    return(
        <div className="createWrapper">
            <a id="back" href="/">BACK</a>
            <div id="title">CREATE ACCOUNT</div>
            <form noValidate autoComplete="off" id="createAccount" onSubmit={handleSubmit}>

                <TextField 
                    className="formInput" 
                    label="Username" 
                    variant="outlined" 
                    onChange={event => setUsername(event.target.value)} 
                    error={usernameError} 
                    helperText={usernameHelperText}
                    />

                <TextField 
                    className="formInput" 
                    label="Email" 
                    variant="outlined"  
                    onChange={event => setEmail(event.target.value)} 
                    error={emailError} 
                    helperText={emailHelperText}
                    />

                <TextField 
                    className="formInput" 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    onChange={event => setPassword(event.target.value)}
                    error={passwordError} 
                    />

                <TextField 
                    className="formInput" 
                    label="Confirm Password"
                    variant="outlined" 
                    type="password" 
                    onChange={event => setConfirmPassword(event.target.value)}
                    error={passwordError} 
                    helperText={passwordHelperText}
                    />

                <Button 
                    variant="contained" 
                    color="primary"
                    id="submit"
                    type="submit"
                    >
                    Submit
                </Button>

            </form>
            <Snackbar setDisplay={setSnackbarDisplay}/>
            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
    )
}

export default CreateAccount;