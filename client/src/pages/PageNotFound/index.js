import React from "react";
import Wrapper from "../../components/Wrapper";
import logo from "../../assets/images/AntreLarge.png";
import "./style.css";

const PageNotFound = () => {

    return(
        <Wrapper>
            <h1 id="notFound">Page Not Found</h1>
            <img src={logo} alt="logo" id="antreLogo"/>
        </Wrapper>
                    
    )
}

export default PageNotFound;