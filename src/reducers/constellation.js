import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';
import {screen, randomNumInRange} from '../helpers/gameHelpers.js';

export default function constellation(state = {
    stars: (function() {
        var stars = [];
        while(stars.length < gameConfig.CONSTELLATION_COUNT) {
            stars.push({
                opacity: Math.round(Math.random()),
                radius: randomNumInRange(
                    gameConfig.CONSTELLATION_MIN_RADIUS,
                    gameConfig.CONSTELLATION_MAX_RADIUS
                ),
                increasing: false,
                pos: {
                    x: Math.round(Math.random() * screen.width),
                    y: Math.round(Math.random() * screen.height)
                }
            });
        }
        return stars;
    })()
}, action) {
    var stars;
    switch (action.type) {
        case actionTypes.UPDATE:
            stars = state.stars.map(function(star) {
                var ran = Math.random();
                star.opacity = ran > 0.99
                    ? 1 - star.opacity
                    : star.opacity;
                return star;
            });
            return Object.assign({}, state, {stars: stars});
        default:
            return state;
    }
}
