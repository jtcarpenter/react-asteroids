import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';

export default function asteroidField(state = {
    maxAcceleration: gameConfig.ASTEROID_START_MAX_ACCL,
    asteroids: []
}, action) {
    switch (action.type) {
        case actionTypes.START:
            let asteroids = [...state.asteroids];
            while(asteroids.length < gameConfig.ASTEROIDS_START_COUNT) {
                asteroids.push({
                    rot: Math.round(Math.random() * 360),
                    pos: {
                        // TODO: prevent asteroids from being too close to spaceship
                        x: Math.round(Math.random() * gameConfig.GAME_WIDTH),
                        y: Math.round(Math.random() * gameConfig.GAME_HEIGHT)
                    },
                    speed: Math.ceil(Math.random() * state.maxAcceleration)
                });
            }
            return Object.assign({}, state, {asteroids: asteroids});
        case actionTypes.UPDATE:
            asteroids = state.asteroids.map(function(asteroid) {
                let xIncr = Math.cos(asteroid.rot * Math.PI /180) * asteroid.speed;
                let yIncr = Math.sin(asteroid.rot * Math.PI /180) * asteroid.speed;
                return {
                    pos: {
                        x: (asteroid.pos.x + xIncr + gameConfig.GAME_WIDTH)
                            % gameConfig.GAME_WIDTH,
                        y: (asteroid.pos.y + yIncr + gameConfig.GAME_HEIGHT)
                            % gameConfig.GAME_HEIGHT
                    },
                    rot: asteroid.rot,
                    speed: asteroid.speed
                }
            });
            return Object.assign({}, state, {asteroids: asteroids});
        default:
            return state;
    }
};
