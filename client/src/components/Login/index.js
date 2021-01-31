import React, { useState } from "react";
import logo from "../../assets/images/AntreLarge.png";
import { TextField, Button } from "@material-ui/core";
import "./style.css";

const Login = () => {

    

    return(
        <div>
            <img src={logo} alt="logo" id="logo"/>
            <form noValidate autoComplete="off" id="login">
                <TextField className="formInput" label="Username" variant="outlined"/>
                <TextField className="formInput" label="Password" variant="outlined" type="password"/>
                <Button 
                    variant="contained" 
                    color="primary"
                    >
                    Login
                </Button>
            </form>
        </div>
                    
    )
}

export default Login;