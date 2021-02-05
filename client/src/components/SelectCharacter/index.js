import React, { useState } from "react";
import smallLogo from "../../assets/images/Antre.png";
import "../CreateAccount/style.css";

const SelectCharacter = () => {


    return(
        <div className="wrapper">
            <div>Select a character</div>
            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default SelectCharacter;