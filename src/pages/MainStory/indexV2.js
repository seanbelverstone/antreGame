import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux"
import { Button, Menu, MenuItem } from "@material-ui/core";
import { navigate } from "hookrouter";
import * as actionCreators from "../../redux/actions/actionCreators";
import API from "../../utils/API";
import { stringToCamel, isBlacklistedChoice } from '../../utils/functions';
import Wrapper from "../../components/Wrapper";
import storylines from "../../utils/storylines.json";
import attacks from "../../utils/attacks.js";
import Inventory from "../../components/Inventory";
import InventoryPopup from "../../components/InventoryPopup";
import DefaultPopup from "../../components/DefaultPopup";
import ChoiceBlock from "../../components/ChoiceBlock";
import Enemy from "../../components/Enemy";
import Typewriter from 'typewriter-effect';
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const mapStateToProps = (state) => {
    return {
        inventory: state.updateCharacter.inventory,
        stats: state.updateCharacter.stats,
        levels: state.updateCharacter.levels,
        time: state.updateCharacter.time,
        user: state.authenticateUser.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const BoundMainStory = (props) => {






// Will be rewriting this code from scratch




    const startTimer = () => {
        let currentTime = time.value;
        setInterval(() => setTimer(currentTime++), 1000);
    }

    const stopTimer = () => {
        clearInterval(startTimer)
    }








    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (speed, reason) => {
        if (reason !== "backdropClick") {
            setTypewriterDelay(speed);
        }
        setAnchorEl(null);
    };

    const saveGame = () => {
        updateCharacter({
            time: {
                value: timer
            }
        });
        API.saveCharacter(
            stats.id,
            stats.health,
            stats.strength,
            stats.defense,
            stats.wisdom,
            stats.luck,
            inventory.weapon,
            inventory.weaponDamage,
            inventory.head,
            inventory.chest,
            inventory.legs,
            inventory.hands,
            inventory.feet,
            inventory.torch,
            inventory.amulet,
            inventory.healthPotions,
            inventory.gold,
            levels.current,
            timer,
            user.jwtToken
        ).then((results) => {
            setSaveGameDisplay(true);
        })
    }

    const logout = () => {
        stopTimer();
        resetStore()
        navigate("/")
    }

    return (
        <Wrapper page="main">
            <div className="topRow">
                <Button variant="outlined" id="logout" onClick={logout} disabled={buttonDisabled}>LOG OUT</Button>
                <img src={smallLogo} alt="a small logo" id="smallLogo" />
                <a id="back" onClick={() => navigate('/select')}>QUIT TO<br />MAIN MENU</a>
            </div>
            <section className="textArea">
                <Button aria-controls="simple-menu" aria-haspopup="true" id="speedButton" onClick={handleMenuClick}>
                    {"Text Speed >>"}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    elevation={0}
                >
                    <MenuItem onClick={() => handleMenuClose(40)}>Slow</MenuItem>
                    <MenuItem onClick={() => handleMenuClose(20)}>Medium</MenuItem>
                    <MenuItem onClick={() => handleMenuClose(1)}>Fast</MenuItem>
                </Menu>
                <Typewriter
                    options={{
                        strings: storyText,
                        autoStart: true,
                        loop: false,
                        delay: typewriterDelay,
                        wrapperClassName: "text"
                    }}
                />
            </section>

            <Enemy
                imageDisplay={imageDisplay}
                enemyBlockFade={enemyBlockFade}
                currentEnemy={currentEnemy}
                currentEnemyHealth={currentEnemyHealth}
                enemyHealthWidth={enemyHealthWidth}
                enemyImage={enemyImage}
                characterName={stats.name}
                currentUserHealth={currentUserHealth === 1 ? stats.health : currentUserHealth}
                maxHealth={maxHealth}
                userHealthWidth={userHealthWidth}
                optionFade={optionFade}
                attackDisplay={attackDisplay}
                attackText={attackText}
            />

            <div id="optionArea" className={optionFade}>
                <ChoiceBlock
                    modifier={modifier}
                    optionFade={optionFade}
                    options={options}
                    buttonDisabled={buttonDisabled}
                    handleFight={handleFight}
                    handleClick={handleClick}
                    weaponDamage={inventory.weaponDamage}
                    strength={stats.strength}
                    enemyDefense={currentEnemy.defense}
                    charClass={stats.charClass}
                    wisdom={stats.wisdom}
                />
            </div>

            <footer id="footer">
                <Inventory
                    id="inventory"
                    disabled={buttonDisabled}
                    health={currentUserHealth === 1 ? stats.health : currentUserHealth}
                    maxHealth={maxHealth}
                    userHealthWidth={(100 * (currentUserHealth === 1 ? stats.health : currentUserHealth)) / maxHealth}
                    strength={stats.strength}
                    defense={stats.defense}
                    wisdom={stats.wisdom}
                    luck={stats.luck}
                    weapon={inventory.weapon}
                    weaponDamage={inventory.weaponDamage}
                    head={inventory.head}
                    chest={inventory.chest}
                    legs={inventory.legs}
                    hands={inventory.hands}
                    feet={inventory.feet}
                    torch={inventory.torch}
                    amulet={inventory.amulet}
                    healthPotions={inventory.healthPotions}
                    gold={inventory.gold}
                    charName={stats.name}
                    race={stats.race}
                    charClass={stats.charClass}
                />
                <div>
                    <Button type="button" id="save" variant="contained" disabled={buttonDisabled} onClick={saveGame}>Save Game</Button>
                </div>
            </footer>
            <DefaultPopup customClass="saveSuccess" display={saveGameDisplay} setDisplay={setSaveGameDisplay} message={`Game saved!`} destination="" snackbarColor="success" />
            <InventoryPopup display={snackbarDisplay} setDisplay={setSnackbarDisplay} items={modifier} />
        </Wrapper>

    )
}

const MainStory = connect(mapStateToProps, mapDispatchToProps)(BoundMainStory);

export default MainStory;