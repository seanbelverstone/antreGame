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

    createNewCharacter: (name, race, charClass, health, strength, defense, wisdom, luck, UserId) => {
        return axios.post("/api/characters", {
            name, 
            race, 
            charClass,
            health,
            strength,
            defense,
            wisdom,
            luck,
            UserId
        })
    }
}