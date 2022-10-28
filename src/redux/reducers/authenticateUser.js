export const initialState = {
	user: {
		id: '',
		username: '',
		jwtToken: ''
	}
};

const authenticateUser = (state = initialState, action) => {
	switch (action.type) {
	case 'AUTHENTICATE_USER':
		if (action.user) {
			return {
				...state,
				user: {
					...state.user,
					...action.user
				} 
			};
		}
		break;
	}
	return state;
};

export default authenticateUser;