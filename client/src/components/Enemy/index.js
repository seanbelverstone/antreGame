import React, { useState } from 'react';
import enemies from "../../assets/images/enemyIcons";

const Enemy = (props) => {

    const {
        imageDisplay,
        enemyBlockFade,
        currentEnemy,
        currentEnemyHealth,
        enemyHealthWidth,
        enemyImage,
        characterName,
        currentUserHealth,
        maxHealth,
        userHealthWidth,
        optionFade,
        attackDisplay,
        attackText
    } = props;

    console.log(imageDisplay);
    console.log(currentEnemy);
    console.log(enemies);
    console.log(enemyImage);
    console.log(enemies[enemyImage]);

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

                <img src={enemies[enemyImage.toUpperCase()]} id="enemyImage" />

                <div id="charName">{characterName}</div>
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