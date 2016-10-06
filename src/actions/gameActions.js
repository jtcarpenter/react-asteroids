import * as actionTypes from '../constants/actionTypes';
import {hitTest, findHit} from '../helpers/gameHelpers';

export function start() {
    return {
        type: actionTypes.START
    };
}

export function rotateLeft() {
    return {
        type: actionTypes.ROTATE_LEFT
    };
}

export function rotateRight() {
    return {
        type: actionTypes.ROTATE_RIGHT
    };
}

export function forward() {
    return {
        type: actionTypes.FORWARD
    };
}

export function update() {
    return {
        type: actionTypes.UPDATE
    };
}

export function stop() {
    return {
        type: actionTypes.STOP
    };
}

export function stopRotation() {
    return {
        type: actionTypes.STOP_ROTATION
    };
}

export function fire(laserOrigin) {
    return {
        type: actionTypes.FIRE,
        laserOrigin: laserOrigin
    };
}

export function asteroidHit(asteroid, laserBolt) {
    return {
        type: actionTypes.ASTEROID_HIT,
        asteroid: asteroid,
        laserBolt: laserBolt
    }
}

export function asteroidHitTest() {
    return (dispatch, getState) => {

        // TODO: mock getState for test
        var {asteroidField, laser} = getState();

        for (let i = 0, l = asteroidField.asteroids.length; i < l; i++) {
            let {radius, pos: {x, y}} = asteroidField.asteroids[i];
            let a = {radius, pos: {x, y}};
            for (let j = 0, m = laser.bolts.length; j < m; j++) {
                let {radius, pos: {x, y}} = laser.bolts[j];
                let b = {radius, pos: {x, y}};

                if (hitTest(
                    {pos: {x: a.pos.x, y: a.pos.y}, index: i, radius: a.radius},
                    {pos: {x: b.pos.x, y: b.pos.y}, index: j, radius: b.radius}
                )) {
                    dispatch(asteroidHit({
                        index: i,
                        pos: {
                            x: a.pos.x,
                            y: a.pos.y
                        }
                    },{
                        index: j,
                        pos: {
                            x: b.pos.x,
                            y: b.pos.y
                        }
                    }));
                }
            }
        }
    }
}
