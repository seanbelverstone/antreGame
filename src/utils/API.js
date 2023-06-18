/* eslint-disable no-undef */
import axios from 'axios';
const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://antre-game-server.herokuapp.com';

export default {

	createUser: (username, email, password) => {
		return axios.post(`${endpoint}/api/users`, {
			username, 
			email, 
			password
		});
	},
	checkUser: (username, password) => {
		return axios.post(`${endpoint}/api/auth`, {
			username, 
			password
		}); 
	},
	editUser: (type, value, id, jwtToken) => {
		return axios.put(`${endpoint}/api/users/${id}`, {
			[type === 'username' ? 'username' : 'password']: value
		}, {
			headers: {
				'Authorization': `Bearer ${jwtToken}`}
		});
	},
	deleteUser: (userId, jwtToken) => {
		return axios.delete(`${endpoint}/api/users/${userId}`, {
			headers: {
				'Authorization': `Bearer ${jwtToken}`}
		});
	},

	getAllCharacters: (userId, jwtToken) => {
		return axios.get(`${endpoint}/api/characters/${userId}`, {
			headers: {
				'Authorization': `Bearer ${jwtToken}`}
		});
	},
	createNewCharacter: (name, race, charClass, health, strength, defense, wisdom, luck, UserId, jwtToken) => {
		return axios.post(`${endpoint}/api/characters`, {
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
		});
	},
	saveCharacter: (stats, inventory, level, pastLevels, time, jwtToken) => {
		console.log(stats, inventory, level, time);
		const { id, health, strength, defense, wisdom, luck } = stats;
		const {weapon, weaponDamage, head,  chest,  legs,  hands,  feet,  torch,  amulet,  healthPotions,  gold } = inventory;
		return axios.put(`${endpoint}/api/characters/${id}`, {
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
			level,
			pastLevels: pastLevels.toString(), 
			time
		}, {
			headers: {
				'Authorization': `Bearer ${jwtToken}`}
		});
	},
	deleteCharacter: (characterId, jwtToken) => {
		return axios.delete(`${endpoint}/api/characters/${characterId}`, {
			headers: {
				'Authorization': `Bearer ${jwtToken}`}
		});
	}
};