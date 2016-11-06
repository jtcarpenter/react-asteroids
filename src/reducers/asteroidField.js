import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import {calcXDist, calcYDist} from '../helpers/gameHelpers.js';

function newAsteroid(maxAcceleration) {
    var xEdge = !!Math.round(Math.random());
    var yEdge = !xEdge;
    var rot = Math.round(Math.random() * 360);
    var asteroid =  {
        dir: rot,
        rot: rot,
        pos: {
            x: xEdge
                ? 0
                : Math.round(Math.random() * gameConfig.GAME_WIDTH),
            y: yEdge
                ? 0
                : Math.round(Math.random() * gameConfig.GAME_HEIGHT)
        },
        radius: gameConfig.ASTEROID_RADIUS,
        speed: Math.ceil(Math.random() * maxAcceleration)
    }
    return asteroid;
}

export default function asteroidField(state = {
    maxAcceleration: gameConfig.ASTEROID_START_MAX_ACCL,
    asteroids: []
}, action) {
    var asteroids, maxAcceleration;
    switch (action.type) {
        case actionTypes.START:
            asteroids = [...state.asteroids];
            while(asteroids.length < gameConfig.ASTEROID_START_COUNT) {
                asteroids.push(newAsteroid(gameConfig.ASTEROID_START_MAX_ACCL));
            }
            return Object.assign({}, state, {
                maxAcceleration: gameConfig.ASTEROID_START_MAX_ACCL,
                asteroids: asteroids
            });
        case actionTypes.GAME_OVER:
            return Object.assign({}, state, {asteroids: []});
        case actionTypes.UPDATE:
            asteroids = state.asteroids.map(function(asteroid) {
                return {
                    pos: {
                        x: (asteroid.pos.x + calcXDist(asteroid.dir, asteroid.speed) +
                            gameConfig.GAME_WIDTH) % gameConfig.GAME_WIDTH,
                        y: (asteroid.pos.y + calcYDist(asteroid.dir, asteroid.speed) +
                            gameConfig.GAME_HEIGHT) % gameConfig.GAME_HEIGHT
                    },
                    radius: asteroid.radius,
                    rot: asteroid.rot,
                    dir: asteroid.rot,
                    speed: asteroid.speed
                }
            });
            return Object.assign({}, state, {asteroids: asteroids});
        case actionTypes.ASTEROID_HIT:
            maxAcceleration = state.maxAcceleration +
                gameConfig.ASTEROID_START_MAX_ACCL_INCR;
            asteroids = state.asteroids.filter(function(asteroid, index) {
                return index !== action.asteroid.index
            });
            asteroids.push(newAsteroid(maxAcceleration));
            return Object.assign({}, state, {
                asteroids: asteroids,
                maxAcceleration: maxAcceleration
            });
        default:
            return state;
    }
}
