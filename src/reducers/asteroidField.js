import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import {calcXDist, calcYDist} from '../helpers/gameHelpers.js';

export default function asteroidField(state = {
    maxAcceleration: gameConfig.ASTEROID_START_MAX_ACCL,
    asteroids: []
}, action) {
    switch (action.type) {
        case actionTypes.START:
            let asteroids = [...state.asteroids];
            while(asteroids.length < gameConfig.ASTEROID_START_COUNT) {

                // make sure asteroid starts on one of the edges so if can'the
                // occupy same space as spacehip at shart
                // TODO: this should  be based on current spaceship pos
                // this will be necessary when new asteroids are generated
                let xEdge = !!Math.round(Math.random());
                let yEdge = !xEdge;
                asteroids.push({
                    rot: Math.round(Math.random() * 360),
                    pos: {
                        x: xEdge ? 0 : Math.round(Math.random() * gameConfig.GAME_WIDTH),
                        y: yEdge ? 0 : Math.round(Math.random() * gameConfig.GAME_HEIGHT)
                    },
                    radius: gameConfig.ASTEROID_RADIUS,
                    speed: Math.ceil(Math.random() * state.maxAcceleration)
                });
            }
            return Object.assign({}, state, {asteroids: asteroids});
        case actionTypes.UPDATE:
            asteroids = state.asteroids.map(function(asteroid) {
                return {
                    pos: {
                        x: (asteroid.pos.x + calcXDist(asteroid.rot, asteroid.speed) +
                            gameConfig.GAME_WIDTH) % gameConfig.GAME_WIDTH,
                        y: (asteroid.pos.y + calcYDist(asteroid.rot, asteroid.speed) +
                            gameConfig.GAME_HEIGHT) % gameConfig.GAME_HEIGHT
                    },
                    radius: asteroid.radius,
                    rot: asteroid.rot,
                    speed: asteroid.speed
                }
            });
            return Object.assign({}, state, {asteroids: asteroids});
        case actionTypes.ASTEROID_HIT:
            asteroids = state.asteroids.filter(function(asteroid, index) {
                return index !== action.asteroid.index
            });
            return Object.assign({}, state, {asteroids: asteroids});
        default:
            return state;
    }
};
