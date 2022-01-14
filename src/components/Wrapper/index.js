import React from "react";
import "./style.css";

const Wrapper = (props) => {
    return(
        <div className="wrapper" id={props.page}>
            {props.children}
        </div>
    )
};

export default Wrapper;