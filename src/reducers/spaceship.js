import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import {calcXDist, calcYDist} from '../helpers/gameHelpers.js';

const resetSpaceship = {
    dir: undefined,
    rot: undefined,
    pos: {x: undefined, y: undefined},
    radius: undefined,
    rotSpeed: undefined,
    speed: undefined
}
const initSpaceship = {
    dir: 0,
    rot: 0,
    pos: {
        x: Math.round(gameConfig.GAME_WIDTH / 2),
        y: Math.round(gameConfig.GAME_HEIGHT / 2)
    },
    radius: gameConfig.SPACESHIP_RADIUS,
    rotSpeed: 0,
    speed: 0
}

export default function spaceship(state = (() => {
    return Object.assign({}, state, resetSpaceship)
})(), action) {
    switch (action.type) {
        case actionTypes.START:
            return Object.assign({}, state, initSpaceship);
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
        case actionTypes.GAME_OVER:
            return Object.assign({}, state, resetSpaceship);
        case actionTypes.UPDATE:
            let rot = (state.rot + 360 + state.rotSpeed) % 360;
            return Object.assign({}, state, {
                pos: {
                    x: (state.pos.x + calcXDist(state.dir, state.speed) +
                        gameConfig.GAME_WIDTH) % gameConfig.GAME_WIDTH,
                    y: (state.pos.y + calcYDist(state.dir, state.speed) +
                        gameConfig.GAME_HEIGHT) % gameConfig.GAME_HEIGHT
                },
                rot: rot,
                dir: rot
            });
        default:
            return state;
    }
};
