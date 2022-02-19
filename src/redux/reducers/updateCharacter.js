export const initialState = {
	inventory: {
		weapon: 'Rusty shortsword',
		weaponDamage: 3,
		head: 'None',
		chest: 'Ragged shirt',
		legs: 'Ragged pants',
		hands: 'None',
		feet: 'Old boots',
		torch: 0,
		amulet: 'None',
		healthPotions: 0,
		gold: 0
	},
	stats: {
		id: '',
		name: '',
		race: '',
		charClass: '',
		health: 0,
		strength: 0,
		defense: 0,
		wisdom: 0,
		luck: 0
	},
	levels: {
		visited: [],
		current: ''
	},
	time: {
		value: 0
	}
};

const updateCharacter = (state = initialState, action) => {
	switch (action.type) {
	case 'UPDATE_CHARACTER':
		if (action.inventory) {
			return {
				...state,
				inventory: {
					...state.inventory,
					...action.inventory
				}
			};
		}
		if (action.stats) {
			return {
				...state,
				stats: {
					...state.stats,
					...action.stats
				}
			};
		}
		if (action.levels) {
			return {
				...state,
				levels: {
					...state.levels,
					...action.levels
				}
			};
		}
		if (action.time) {
			return {
				...state,
				time: {
					...state.time,
					...action.time
				}
			};
		}
		break;
	}
	return state;
};

export default updateCharacter;