import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import {calcXDist, calcYDist, randomNumInRange} from '../helpers/gameHelpers.js';

function newFragment(x, y) {
    var fragment =  {
        rot: Math.round(Math.random() * 360),
        pos: {
            x: x,
            y: y
        },
        radius: gameConfig.ASTEROID_FRAGMENT_RADIUS,
        speed: gameConfig.ASTEROID_START_SPEED
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
                    action.asteroid.pos.y
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
                    action.spaceship.pos.y
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
                        x: fragment.pos.x + calcXDist(fragment.rot, fragment.speed),
                        y: fragment.pos.y + calcYDist(fragment.rot, fragment.speed)
                    },
                    radius: fragment.radius,
                    rot: fragment.rot,
                    speed: fragment.speed
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