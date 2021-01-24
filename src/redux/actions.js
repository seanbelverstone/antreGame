// Redux actions are nothing more than objects.
// Type = how state should be changed
// Payload = what should change (omitted if no new data to save)

import { ADD_GOLD } from "./constants/actionTypes";

export function addGold(payload) {
    return {
        type: ADD_GOLD,
        payload
    };
}