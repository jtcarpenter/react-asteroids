import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import * as gameStates from '../constants/gameStates.js';

export default function dashboard(state = {
    gameState: gameStates.STOPPED
}, action) {
    switch (action.type) {
        case actionTypes.START:
            return Object.assign({}, state, {
                gameState: gameStates.PLAYING
            });
        default:
            return state;
    }
};
