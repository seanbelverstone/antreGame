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

    createNewCharacter: (charName, charRace, charClass, health, strength, defense, wisdom, luck) => {
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