import * as actionTypes from '../constants/actionTypes';
import * as gameStates from '../constants/gameStates.js';

export default function dashboard(state = {
    message: null,
    score: 0,
    gameState: gameStates.STOPPED
}, action) {
    switch (action.type) {
        case actionTypes.START:
            return Object.assign({}, state, {
                message: null,
                score: 0,
                gameState: gameStates.PLAYING
            });
        case actionTypes.GAME_OVER:
            return Object.assign({}, state, {
                message: `Game over! You hit ${state.score} asteroid${state.score !== 1
                    ? 's'
                    : ''}`,
                gameState: gameStates.STOPPED
            });
        case actionTypes.ASTEROID_HIT:
            return Object.assign({}, state, {
                score: state.score + 1
            });
        default:
            return state;
    }
}
