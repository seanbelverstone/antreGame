import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { TextField, Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import { navigate } from "hookrouter";
import API from "../../utils/API";
import smallLogo from "../../assets/images/Antre.png";
import "./style.css";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const CreateCharacter = () => {
    
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
    const [skill, setSkill] = useState("");

    const userId = window.sessionStorage.getItem("id");

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
                setSkill("Stalwart Defense: Impervious to damage for 1 turn.")
                break;
            case "Rogue":
                setHealth(60)
                setStrength(4);
                setDefense(2);
                setWisdom(2);
                setLuck(4);
                setDescription("As deadly as they are cunning, the rogue utilizes their luck to end fights quickly.")
                setSkill("Rapid Attack: Doubles special attack damage")
                break;
            case "Paladin":
                setHealth(70)
                setStrength(3);
                setDefense(3);
                setWisdom(4);
                setLuck(2);
                setDescription("Using other worldly powers to surpass their foes, the paladin is the wisest of them all.")
                setSkill("Holy Remedy: Restores 30% health")
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
        // put api bit in here
        console.log("eegs")
        console.log(`Name ${userId}`)
        API.createNewCharacter(name, race, charClass, health, strength, defense, wisdom, luck, userId)
            .then(results => {
                console.log(results)
            })
    }

    const logout = () => {
        window.sessionStorage.clear();
        navigate("/")
    }

    return(
        <div className="createWrapper">
            <form id="formWrapper" onSubmit={handleSubmit}>
            <a id="back" href="/select">BACK</a>
            <Button variant="outlined" id="createLogout" onClick={logout}>LOG OUT</Button>
                <div id="charTitle">CREATE A CHARACTER</div>
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
                            <MenuItem value={"Human"}>Human</MenuItem>
                            <MenuItem value={"Elf"}>Elf</MenuItem>
                            <MenuItem value={"Dwarf"}>Dwarf</MenuItem>
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
                    <div id="classDescription">
                        <h3>{charClass}</h3>
                        <div id="stats">
                            <div>HP: {health}</div>
                            <div>Strength: {strength}</div>
                            <div>Defense: {defense}</div>
                            <div>Wisdom: {wisdom}</div>
                            <div>Luck: {luck}</div>
                        </div>
                        <div id="description">{description}</div>
                        <div id="skill">{skill}</div>
                    </div>
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        >
                        Create
                    </Button>
            </form>
            <img src={smallLogo} alt="a small logo" id="smallLogo"/>
        </div>
                    
    )
}

export default CreateCharacter;