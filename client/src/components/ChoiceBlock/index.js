import React, { useState } from 'react';
import { stringToCamel } from '../../utils/functions';
import { Button } from "@material-ui/core";
import "./style.css";

const ChoiceBlock = (props) => {
    const {
        modifier,
        optionFade,
        options,
        buttonDisabled,
        handleFight,
        handleClick
    } = props;
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
                    <Button className="optionText" variant="contained" color="secondary" id={stringToCamel(fightOption.label)} onClick={() => handleFight(fightOption)} disabled={buttonDisabled}>
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
                    <Button className="optionText" variant="contained" color="primary" id={stringToCamel(option.label)} onClick={() => handleClick(option)}>
                        {option.label}
                    </Button>
                </div>
            )
        })
    }
};

export default ChoiceBlock;