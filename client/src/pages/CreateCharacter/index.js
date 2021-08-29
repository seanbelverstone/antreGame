import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux"
import * as actionCreators from "../../redux/actions/actionCreators";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { TextField, Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import { navigate } from "hookrouter";
import Wrapper from "../../components/Wrapper";
import DefaultPopup from "../../components/DefaultPopup";
import API from "../../utils/API";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const mapStateToProps = (state) => {
    return {
        user: state.authenticateUser.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const BoundCreateCharacter = (props) => {

    const classes = useStyles();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");
    const [race, setRace] = useState("");
    const [charClass, setCharClass] = useState("");
    const [health, setHealth] = useState(0);
    const [strength, setStrength] = useState(0);
    const [defense, setDefense] = useState(0);
    const [wisdom, setWisdom] = useState(0);
    const [luck, setLuck] = useState(0);
    const [description, setDescription] = useState("");
    const [descriptonDisplay, setDescriptionDisplay] = useState(0);
    const [skill, setSkill] = useState("");
    const [snackbarDisplay, setSnackbarDisplay] = useState(false);

    const { user, resetStore } = props;

    // By passing in charClass, setStats runs whenever the selected class is selected
    useEffect((charClass) => {
        setStats();
    })

    // sets the stats of the corresponding class
    const setStats = () => {
        switch (charClass) {
            case "Warrior":
                setHealth(80)
                setStrength(5);
                setDefense(4);
                setWisdom(1);
                setLuck(2);
                setDescription("Strong and fierce, the warrior is a reliable combatant.")
                setSkill("Stalwart Defense: Massive increase to defense for 3 turns.")
                setDescriptionDisplay(1)
                break;
            case "Rogue":
                setHealth(60)
                setStrength(4);
                setDefense(2);
                setWisdom(2);
                setLuck(4);
                setDescription("As deadly as they are cunning, the rogue utilizes their luck to end fights quickly.")
                setSkill("Gambler's Strike: Massive increase to critical hit chance on the next turn.")
                setDescriptionDisplay(1)
                break;
            case "Paladin":
                setHealth(70)
                setStrength(3);
                setDefense(3);
                setWisdom(4);
                setLuck(2);
                setDescription("Using other worldly powers to surpass their foes, the paladin is the wisest of them all.")
                setSkill("Holy Remedy: Fully restores all health.")
                setDescriptionDisplay(1)
                break;
            default:
                setHealth(0)
                setStrength(0);
                setDefense(0);
                setWisdom(0);
                setLuck(0);
                setDescription("")
                setSkill("")
        }
    }

    const handleRaceChange = (event) => {
        setRace(event.target.value);
    };

    const handleClassChange = (event) => {
        setCharClass(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkName();
    }

    const checkName = () => {
        if (name.length > 11 || name.length < 1) {
            setNameError(true);
            setNameHelperText("Please use a name that is less than 10 characters")
            return;
        } else {
            setNameError(false);
            setNameHelperText("");
            createNewCharacter();
        }
    }

    const createNewCharacter = () => {
        API.createNewCharacter(name, race, charClass, health, strength, defense, wisdom, luck, user.id, user.jwt)
            .then(results => {
                setSnackbarDisplay(true);
            })
    }

    const logout = () => {
        resetStore();
        navigate("/")
    }

    return (
        <Wrapper>
            <form id="formWrapper" onSubmit={handleSubmit}>
                <Button variant="outlined" id="logout" onClick={logout}>LOG OUT</Button>
                <a id="back" onClick={() => navigate("/select")}>BACK</a>
                <div className="title">CREATE A CHARACTER</div>
                <FormControl className={classes.formControl}>
                    <TextField
                        className="formInput"
                        label="Name"
                        variant="outlined"
                        onChange={event => setName(event.target.value)}
                        error={nameError}
                        helperText={nameHelperText}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="raceLabel">Race</InputLabel>
                    <Select
                        labelId="raceLabel"
                        id="raceSelect"
                        value={race}
                        onChange={handleRaceChange}
                    >
                        <MenuItem value={"Human"} id="human">Human</MenuItem>
                        <MenuItem value={"Elf"} id="elf">Elf</MenuItem>
                        <MenuItem value={"Dwarf"} id="dwarf">Dwarf</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="classLabel">Class</InputLabel>
                    <Select
                        labelId="classLabel"
                        id="classSelect"
                        value={charClass}
                        onChange={handleClassChange}
                    >
                        <MenuItem value={"Warrior"} id="warrior">Warrior</MenuItem>
                        <MenuItem value={"Rogue"} id="rogue">Rogue</MenuItem>
                        <MenuItem value={"Paladin"} id="paladin">Paladin</MenuItem>
                    </Select>
                </FormControl>
                <div id="classDescription" style={{ opacity: descriptonDisplay }}>
                    <div id="stats">
                        <div className="health">HP: {health}</div>
                        <div className="strength">Strength: {strength}</div>
                        <div className="defense">Defense: {defense}</div>
                        <div className="wisdom">Wisdom: {wisdom}</div>
                        <div className="luck">Luck: {luck}</div>
                    </div>
                    <div id="desAndSkill">
                        <div id="description">{description}</div>
                        <h3 id="skillName">Skill</h3>
                        <div id="skill">{skill}</div>
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Create
                </Button>
            </form>
            <DefaultPopup display={snackbarDisplay} setDisplay={setSnackbarDisplay} message={`Character created!`} destination="/select" snackbarColor="success" />
            <img src={smallLogo} alt="a small logo" id="smallLogo" />
        </Wrapper>

    )
}

const CreateCharacter = connect(mapStateToProps, mapDispatchToProps)(BoundCreateCharacter);

export default CreateCharacter;