import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import * as gameStates from '../constants/gameStates.js';

export default function dashboard(state = {
    message: null,
    gameState: gameStates.STOPPED
}, action) {
    switch (action.type) {
        case actionTypes.START:
            return Object.assign({}, state, {
                message: null,
                gameState: gameStates.PLAYING
            });
        case actionTypes.GAME_OVER:
            return Object.assign({}, state, {
                message: gameConfig.MESSAGE_GAME_OVER,
                gameState: gameStates.STOPPED
            });
        default:
            return state;
    }
};
