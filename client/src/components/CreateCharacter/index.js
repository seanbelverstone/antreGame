import React, { useState, useEffect } from "react";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const CreateCharacter = ({ changeToLogin, changeToCreate }) => {


    return(
        <div className="wrapper">
            <div id="charTitle">CREATE A CHARACTER</div>
            

            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default CreateCharacter;