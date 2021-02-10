import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { navigate } from "hookrouter";
import storylines from "../storylines.json";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const DecisionBlock = () => {

    const [storyText, setStoryText] = useState("");

    useEffect(() => {
        console.log(storyText);
    })

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return(
        <div className="decisionWrapper">
            <Button variant="outlined" id="logout" onClick={logout}>LOG OUT</Button>
            <div id="text"></div>


            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default DecisionBlock;