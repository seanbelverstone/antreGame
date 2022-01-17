import { combineReducers } from 'redux';

import updateCharacter from './updateCharacter';
import authenticateUser from './authenticateUser';


const fullReducer = combineReducers({
	updateCharacter,
	authenticateUser
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET_STORE') {
		return fullReducer(undefined, action);
	}
	return fullReducer(state, action);
};

export default rootReducer;