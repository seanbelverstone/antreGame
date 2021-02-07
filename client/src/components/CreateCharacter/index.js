import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { TextField, Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
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

    const userId = window.sessionStorage.getItem("id");

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
            setStats();
        }
    }

    const setStats = () => {
        switch (charClass) {
            case "warrior":
                setHealth(80)
                setStrength(5);
                setDefense(4);
                setWisdom(1);
                setLuck(2);
                break;
            case "rogue":
                setHealth(60)
                setStrength(3);
                setDefense(2);
                setWisdom(2);
                setLuck(5);
                break;
            default:
                setHealth(70)
                setStrength(3);
                setDefense(3);
                setWisdom(4);
                setLuck(2);
        }
        createNewCharacter();
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
                            <MenuItem value={"Warrior"}>Warrior</MenuItem>
                            <MenuItem value={"Rogue"}>Rogue</MenuItem>
                            <MenuItem value={"Paladin"}>Paladin</MenuItem>
                        </Select>
                    </FormControl>
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