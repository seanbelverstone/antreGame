import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import "./style.css";

const ChoiceBlock = ({
    modifier,
    optionFade,
    options,
    buttonDisabled,
    handleFight,
    handleClick
}) => {
    if (modifier[0] !== undefined && modifier[0].death) {
        return (
            <div>
                <p className={`options ${optionFade} title`}>You died.</p>
            </div>
        )
    } else if (modifier[0] != undefined && modifier[0].fight) {
        // If fight: true appears in the decision block, render the fight screen instead.
        return (options.map(fightOption => {
            return (
                <div className={`options ${optionFade}`} key={fightOption.label}>
                    <Button className="optionText" variant="contained" color="secondary" id={fightOption.label} onClick={() => handleFight(fightOption)} disabled={buttonDisabled}>
                        {fightOption.label}
                    </Button>
                </div>
            )
        }))
    } else {
        // Otherwise, show the option page
        return options.map(option => {
            return (
                <div className={`options ${optionFade}`} key={option.label}>
                    <Button className="optionText" variant="contained" color="primary" id={option.label} onClick={() => handleClick(option)}>
                        {option.label}
                    </Button>
                </div>
            )
        })
    }
};

export default ChoiceBlock;