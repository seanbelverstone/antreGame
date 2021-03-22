import React, { useState } from "react";
import logo from "../../assets/images/AntreLarge.png";
import "./style.css";

const PageNotFound = () => {

    return(
        <div className="loginWrapper">
            <h1 id="notFound">Page Not Found</h1>
            <img src={logo} alt="logo" id="antreLogo"/>
            
        </div>
                    
    )
}

export default PageNotFound;