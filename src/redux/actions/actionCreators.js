export const resetStore = () => {
	return {
		type: 'RESET_STORE'
	};
};

export const updateCharacter = (options) => {
	const {
		inventory,
		stats,
		levels,
		time
	} = options;
	return {
		type: 'UPDATE_CHARACTER',
		inventory,
		stats,
		levels,
		time
	};
};

export const authenticateUser = (options) => {
	const {
		user
	} = options;
	return {
		type: 'AUTHENTICATE_USER',
		user
	};
};