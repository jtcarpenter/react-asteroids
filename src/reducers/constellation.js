import * as actionTypes from '../constants/actionTypes';
import * as gameConfig from '../constants/gameConfig.js';

export default function constellation(state = {
    stars: []
}, action) {
    var stars;
    switch (action.type) {
        case actionTypes.START:
            stars = [...state.stars];
            while(stars.length < gameConfig.CONSTELLATION_COUNT) {
                stars.push({
                    opacity: Math.round(Math.random()),
                    radius: Math.random()
                        * (
                            gameConfig.CONSTELLATION_MAX_RADIUS
                            - gameConfig.CONSTELLATION_MIN_RADIUS
                        )
                        + gameConfig.CONSTELLATION_MIN_RADIUS,
                    increasing: false,
                    pos: {
                        x: Math.round(Math.random() * gameConfig.GAME_WIDTH),
                        y: Math.round(Math.random() * gameConfig.GAME_HEIGHT)
                    }
                });
            }
            return Object.assign({}, state, {stars: stars});
        case actionTypes.UPDATE:
            stars = state.stars.map(function(star) {
                var ran = Math.random();
                star.opacity = ran > 0.99 ? 1 - star.opacity : star.opacity;
                return star;
            });
            return Object.assign({}, state, {stars: stars});
        default:
            return state;
    }
};
