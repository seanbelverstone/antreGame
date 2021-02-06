import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import API from "../../utils/API";
import smallLogo from "../../assets/images/Antre.png";
import "../CreateAccount/style.css";

const SelectCharacter = () => {

    const characters = [];

    // Works the same as componentDidMount. Runs when component has rendered
    useEffect(() => {
        console.log("rendered")
        const userId = parseInt(window.sessionStorage.getItem("id"));
        API.getAllCharacters(userId)
        .then(results => {
            console.log(results)
        })
    })

    return(
        <div className="wrapper">
            <div>SELECT A CHARACTER</div>
            <Button variant="outlined">LOG OUT</Button>
            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default SelectCharacter;