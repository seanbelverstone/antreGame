import axios from "axios";

let jwtToken;


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
        jwtToken = window.sessionStorage.getItem("jwtToken");

        return axios.get(`/api/characters/${userId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`}
        })
    },

    createNewCharacter: (name, race, charClass, health, strength, defense, wisdom, luck, UserId) => {
        jwtToken = window.sessionStorage.getItem("jwtToken");

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
        }, {
            headers: {
            'Authorization': `Bearer ${jwtToken}`}
        })
    },

    updateCharacter: (health, strength, defense, wisdom, luck, weapon, head, chest, legs, hands, feet, torch, amulet, healthPotions, gold, level, time, id) => {
        jwtToken = window.sessionStorage.getItem("jwtToken");

        return axios.put(`/api/characters/${id}`, {
            health,
            strength,
            defense,
            wisdom,
            luck,
            weapon,
            head, 
            chest, 
            legs, 
            hands, 
            feet, 
            torch, 
            amulet, 
            healthPotions, 
            gold, 
            level, 
            time,
            id
        }, {
            headers: {
            'Authorization': `Bearer ${jwtToken}`}
        })
    },
    
    deleteCharacter: (characterId) => {
        jwtToken = window.sessionStorage.getItem("jwtToken");

        return axios.delete(`/api/characters/${characterId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`}
        })
    }
}