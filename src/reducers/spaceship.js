import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';

export default function spaceship(state = {
    rot: 0,
    pos: {
        x: Math.round(gameConfig.GAME_WIDTH / 2),
        y: Math.round(gameConfig.GAME_HEIGHT / 2)
    },
    radius: gameConfig.SPACESHIP_RADIUS,
    rotSpeed: 0,
    speed: 0
}, action) {
    switch (action.type) {
        case actionTypes.ROTATE_RIGHT:
            return Object.assign({}, state, {
                rotSpeed: gameConfig.SPACESHIP_ROT_SPEED
            });
        case actionTypes.ROTATE_LEFT:
            return Object.assign({}, state, {
                rotSpeed: -gameConfig.SPACESHIP_ROT_SPEED
            });
        case actionTypes.FORWARD:
            return Object.assign({}, state, {
                speed: state.speed = gameConfig.SPACESHIP_ACCL
            });
        case actionTypes.STOP:
            return Object.assign({}, state, {
                speed: 0
            });
        case actionTypes.STOP_ROTATION:
            return Object.assign({}, state, {
                rotSpeed: 0
            });
        case actionTypes.UPDATE:
            let xIncr = Math.cos(state.rot * Math.PI / 180) * state.speed;
            let yIncr = Math.sin(state.rot * Math.PI / 180) * state.speed;
            return Object.assign({}, state, {
                pos: {
                    x: (state.pos.x + xIncr + gameConfig.GAME_WIDTH)
                        % gameConfig.GAME_WIDTH,
                    y: (state.pos.y + yIncr + gameConfig.GAME_HEIGHT)
                        % gameConfig.GAME_HEIGHT
                },
                rot: (state.rot + 360 + state.rotSpeed) % 360
            });
        default:
            return state;
    }
};
