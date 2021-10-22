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

    getAllCharacters: (userId, jwtToken) => {
        return axios.get(`/api/characters/${userId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`}
        })
    },

    createNewCharacter: (name, race, charClass, health, strength, defense, wisdom, luck, UserId, jwtToken) => {
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

    saveCharacter: (stats, inventory, levels, time, jwtToken) => {
        const { id, health, strength, defense, wisdom, luck } = stats;
        const {weapon, weaponDamage, head,  chest,  legs,  hands,  feet,  torch,  amulet,  healthPotions,  gold } = inventory;
        return axios.put(`/api/characters/${id}`, {
            id,
            health,
            strength,
            defense,
            wisdom,
            luck,
            weapon,
            weaponDamage,
            head, 
            chest, 
            legs, 
            hands, 
            feet, 
            torch, 
            amulet, 
            healthPotions, 
            gold, 
            level: levels.current, 
            time
        }, {
            headers: {
            'Authorization': `Bearer ${jwtToken}`}
        })
    },
    
    deleteCharacter: (characterId, jwtToken) => {
        return axios.delete(`/api/characters/${characterId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`}
        })
    }
}