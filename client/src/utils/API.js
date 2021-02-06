import axios from "axios";

export default {

    createUser: (username, email, password) => {
        return axios.post("/api/users", {
            username, 
            email, 
            password
        })
    },

    checkUser: (username, password) => {
        return axios.post("/api/auth", {
            username, 
            password
        }) 
    },

    getAllCharacters: (userId) => {
        return axios.get(`/api/characters/${userId}`)
    },

<<<<<<< HEAD
    createNewCharacter: (name, race, charClass, health, strength, defense, wisdom, luck, UserId) => {
=======
    createNewCharacter: (charName, charRace, charClass, health, strength, defense, wisdom, luck) => {
>>>>>>> parent of 84cf7f1 (Creating a character finally works! Need to add on hover details)
        return axios.post("/api/characters", {
            charName, 
            charRace, 
            charClass,
            health,
            strength,
            defense,
            wisdom,
            luck
        })
    }
}