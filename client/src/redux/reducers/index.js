import { combineReducers } from 'redux';

import updateCharacter from './updateCharacter';

const fullReducer = combineReducers({
    updateCharacter
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        return fullReducer(undefined, action)
    }
    return fullReducer(state, action);
}

export default rootReducer;