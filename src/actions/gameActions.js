import * as actionTypes from '../constants/actionTypes';

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
