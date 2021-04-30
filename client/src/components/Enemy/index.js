import React, { useState } from 'react';
import enemies from "../../assets/images/enemyIcons";

const Enemy = ({
    imageDisplay,
    enemyBlockFade,
    currentEnemy,
    currentEnemyHealth,
    enemyHealthWidth,
    enemyImage,
    currentCharacter,
    currentUserHealth,
    maxHealth,
    userHealthWidth,
    optionFade,
    attackDisplay,
    attackText
}) => {

    return (
        <>
            <div style={{ display: imageDisplay }} className={enemyBlockFade} id="enemyBlock">
                <div>{currentEnemy.name}</div>
                <div className="healthArea">
                    <div className="healthText">
                        {currentEnemyHealth}/{currentEnemy.health}
                    </div>
                    <div id="enemyBar" style={{ width: enemyHealthWidth }}></div>
                </div>

                <img src={enemies[enemyImage]} id="enemyImage" />

                <div id="charName">{currentCharacter.name}</div>
                <div className="healthArea" id="userHealthArea">
                    <div className="healthText">
                        {currentUserHealth}/{maxHealth}
                    </div>
                    <div id="userBar" style={{ width: userHealthWidth }}></div>
                </div>
            </div>

            <div id="attackText" className={optionFade} style={{ display: attackDisplay }}>
                {attackText}
            </div>
        </>
    )
};

export default Enemy;