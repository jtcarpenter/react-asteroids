import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import {calcXDist, calcYDist, randomNumInRange} from '../helpers/gameHelpers.js';

function newFragment(x, y, radius, speed, rotSpeed) {
    var rot = Math.round(Math.random() * 360);
    var dir = Math.round(Math.random() * 360);
    var fragment =  {
        rot: rot,
        dir: dir,
        pos: {
            x: x,
            y: y
        },
        radius: radius,
        speed: speed,
        rotSpeed: rotSpeed
    }
    return fragment;
}

export default function debris(state = {
    fragments: []
}, action) {
    var fragments;
    switch (action.type) {
        case actionTypes.START:
            return Object.assign({}, state, {
                fragments: []
            });
        case actionTypes.ASTEROID_HIT:
            fragments = [...state.fragments];
            while(fragments.length < gameConfig.ASTEROID_FRAGMENT_COUNT) {
                fragments.push(newFragment(
                    action.asteroid.pos.x,
                    action.asteroid.pos.y,
                    gameConfig.ASTEROID_FRAGMENT_RADIUS,
                    gameConfig.ASTEROID_FRAGMENT_SPEED,
                    gameConfig.ASTEROID_FRAGMENT_ROT_SPEED
                ));
            }
            return Object.assign({}, state, {
                fragments: fragments
            });
        case actionTypes.GAME_OVER:
            fragments = [...state.fragments];
            while(fragments.length < gameConfig.SPACESHIP_FRAGMENT_COUNT) {
                fragments.push(newFragment(
                    action.spaceship.pos.x,
                    action.spaceship.pos.y,
                    gameConfig.SPACESHIP_FRAGMENT_RADIUS,
                    gameConfig.SPACESHIP_FRAGMENT_SPEED,
                    gameConfig.SPACESHIP_FRAGMENT_ROT_SPEED
                ));
            }
            return Object.assign({}, state, {
                fragments: fragments
            });
        case actionTypes.UPDATE:

            // recalculate fragment positions
            fragments = state.fragments.map(function(fragment) {
                return {
                    pos: {
                        x: fragment.pos.x + calcXDist(fragment.dir, fragment.speed),
                        y: fragment.pos.y + calcYDist(fragment.dir, fragment.speed)
                    },
                    radius: fragment.radius,
                    rot: fragment.rot + fragment.rotSpeed,
                    dir: fragment.dir,
                    speed: fragment.speed,
                    rotSpeed: fragment.rotSpeed
                }
            })

            // filter out all bolts which have left the game area
            .filter(function(fragment, index) {
                return  fragment.pos.x >= 0 &&
                        fragment.pos.x <= (gameConfig.GAME_WIDTH) &&
                        fragment.pos.y >= 0 &&
                        fragment.pos.y <= gameConfig.GAME_HEIGHT;
            });

            return Object.assign({}, state, {fragments: fragments});
        default:
            return state;
    }
};