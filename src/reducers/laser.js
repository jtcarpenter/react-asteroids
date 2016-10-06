import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';

export default function laser(state = {
    speed: gameConfig.LASER_BOLT_ACCL,
    bolts: []
}, action) {
    var bolts;
    switch (action.type) {
        case actionTypes.FIRE:
            bolts = [...state.bolts];
            bolts.push({
                rot: action.laserOrigin.rot,
                pos: {x: action.laserOrigin.pos.x, y: action.laserOrigin.pos.y}
            });
            return Object.assign({}, state, {bolts: bolts});
        case actionTypes.UPDATE:

            // recalculate bolt positions
            bolts = state.bolts.map(function(bolt) {
                let xIncr = Math.cos(bolt.rot * Math.PI / 180) * state.speed;
                let yIncr = Math.sin(bolt.rot * Math.PI / 180) * state.speed;
                return {
                    pos: {
                        x: bolt.pos.x + xIncr,
                        y: bolt.pos.y + yIncr
                    },
                    radius: gameConfig.LASER_BOLT_RADIUS,
                    rot: bolt.rot
                }
            })

            // filter out all bolts which have left the game area
            .filter(function(bolt, index) {
                return  bolt.pos.x >= 0 &&
                        bolt.pos.x <= (gameConfig.GAME_WIDTH) &&
                        bolt.pos.y >= 0 &&
                        bolt.pos.y <= gameConfig.GAME_HEIGHT;
            });

            return Object.assign({}, state, {bolts: bolts});
        case actionTypes.ASTEROID_HIT:
            bolts = state.bolts.filter(function(laserBolt, index) {
                return index !== action.laserBolt.index
            });
            return Object.assign({}, state, {bolts: bolts});
        default:
            return state;
    }
};
