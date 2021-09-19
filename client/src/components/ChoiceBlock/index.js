import React, { useState } from 'react';
import { stringToCamel } from '../../utils/functions';
import Info from '../Info';
import { Button } from "@material-ui/core";
import "./style.css";

const ChoiceBlock = (props) => {
    const {
        modifier,
        optionFade,
        options,
        buttonDisabled,
        handleFight,
        handleClick,
        weaponDamage,
        strength,
        enemyDefense
    } = props;

    const minDamage = Math.ceil(((weaponDamage * 1) + (strength * 2)) / enemyDefense)
    const maxDamage = Math.ceil(((weaponDamage * 6) + (strength * 2)) / enemyDefense)

    const fightInfo = {
        title: 'Combat',
        subheadings: [
            {
                header: 'Normal Attack',
                body: `The most reliable of choices, a normal attack never misses. Against this enemy,
                    your damage range is between ${minDamage} and ${maxDamage}`
            }
        ]
    }
    if (modifier[0] !== undefined && modifier[0].death) {
        return (
            <div>
                <p className={`options ${optionFade} title`}>You died.</p>
            </div>
        )
    } else if (modifier[0] != undefined && modifier[0].fight) {
        // If fight: true appears in the decision block, render the fight screen instead.
        return <>
            <Info infoProps={fightInfo} optionFade={optionFade} />
            {options.map(fightOption => {
                return (
                    <div className={`options ${optionFade}`} key={fightOption.label}>
                        <Button className="optionText" variant="contained" color="secondary" id={stringToCamel(fightOption.label)} onClick={() => handleFight(fightOption)} disabled={buttonDisabled}>
                            {fightOption.label}
                        </Button>
                    </div>
                )
            })}
        </>;
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