// Depending on the action type, the reducer produces the next
// state, eventually merging the action payload into the new state

// Must use Object.assign to keep the original state unaltered.
// Must use array.concat to retain immutability

import { ADD_GOLD } from "../constants/actionTypes";

const initialState = {
    inventory: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
    case ADD_GOLD:
        return Object.assign({}, state, {
            inventory: state.inventory.concat(action.payload)
        });
    default:
        state;
    }
    return state;



};

export default rootReducer;