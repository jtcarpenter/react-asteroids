import React from 'react';
import spaceship from '../src/reducers/spaceship.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as gameConfig from '../src/constants/gameConfig.js';
import {screen} from '../src/helpers/gameHelpers';

describe('spaceship reducer', () => {

    const stoppedSpaceship = {
        dir: undefined,
        rot: undefined,
        pos: {x: undefined, y: undefined},
        radius: undefined,
        rotSpeed: undefined,
        speed: undefined
    }
    const startedSpaceship = {
        dir: 0,
        rot: 0,
        pos: {
            x: Math.round(screen.width / 2),
            y: Math.round(screen.height / 2)
        },
        radius: screen.width / gameConfig.SPACESHIP_SCALE,
        rotSpeed: 0,
        speed: 0
    }

    describe('START action type', () => {

        let state = {};
        let actual = {};

        beforeEach(() => {
            state = Object.assign({}, stoppedSpaceship);
        });

        it('should initialise spaceship properties', () => {
            expect(state).to.eql(stoppedSpaceship);
            actual = spaceship(state,
                {type: actionTypes.START}
            );
            expect(actual).to.eql(startedSpaceship);
        });
    });

    describe('ROTATE_RIGHT action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                rotSpeed: 0
            };
        });

        it(`should increase rotSpeed by ${gameConfig.SPACESHIP_ROT_SPEED}`, () => {
            actual = spaceship(state,
                {type: actionTypes.ROTATE_RIGHT}
            );
            expect(actual.rotSpeed).to.equal(gameConfig.SPACESHIP_ROT_SPEED);
        });
    });

    describe('ROTATE_LEFT action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                rotSpeed: 0
            };
        });

        it(`should decrease rotSpeed by ${gameConfig.SPACESHIP_ROT_SPEED}`, () => {
            actual = spaceship(state,
                {type: actionTypes.ROTATE_LEFT}
            );
            expect(actual.rotSpeed).to.equal(-gameConfig.SPACESHIP_ROT_SPEED);
        });
    });

    describe('STOP_ROTATION action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                rotSpeed: 5
            };
        });

        it('should decrease rotSpeed to 0 ', () => {
            actual = spaceship(state,
                {type: actionTypes.STOP_ROTATION}
            );
            expect(actual.rotSpeed).to.equal(0);
        });
    });

    describe('FORWARD action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                speed: 0
            };
        });

        it(`should set the spacehip speed to ${gameConfig.SPACESHIP_ACCL}`, () => {
            actual = spaceship(state,
                {type: actionTypes.FORWARD}
            );
            expect(actual.speed).to.equal(gameConfig.SPACESHIP_ACCL);
        });
    });

    describe('STOP action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                speed: 7
            };
        });

        it('should set the spaceship speed to 0', () => {
            actual = spaceship(state,
                {type: actionTypes.STOP}
            );
            expect(actual.speed).to.equal(0);
        });
    });

    describe('GAME_OVER action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = startedSpaceship;
        });

        it('should return spaceship to reset state', () => {
            actual = spaceship(state,
                {type: actionTypes.GAME_OVER}
            );
            expect(actual).to.eql(stoppedSpaceship);
        });
    });

    describe('UPDATE action type', () => {
        let state;
        let actual;
        const SPEED = 5;
        const X_POS = 10;
        const Y_POS = 10;

        beforeEach(() => {
            state = {
                dir: 0,
                rot: 0,
                pos: {x: X_POS, y: Y_POS},
                speed: SPEED
            };
        });

        it(`should set x and y by distance of ${SPEED} when dir is 0`, () => {
            actual = spaceship(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.pos.x).to.equal(SPEED + X_POS);
            expect(actual.pos.y).to.equal(Y_POS);
        });

        it(`should set x and y by distance of ${SPEED} when dir is 45`, () => {
            state.dir = 45;
            actual = spaceship(state,
                {type: actionTypes.UPDATE}
            );
            let xDist = Math.sqrt((Math.pow(SPEED, 2) / 2));
            let yDist = Math.sqrt((Math.pow(SPEED, 2) / 2));
            expect(actual.pos.x - X_POS).to.be.closeTo(xDist, 0.5);
            expect(actual.pos.y - Y_POS).to.be.closeTo(yDist, 0.5);
        });

        it('it should wrap when leaving right of game area', () => {
            state.pos.x = screen.width;
            actual = spaceship(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.pos.x).to.equal(SPEED);
            expect(actual.pos.y).to.equal(Y_POS);
        });

        it('it should wrap when leaving bottom of game area', () => {
            state.dir = 90;
            state.pos.y = screen.height;
            actual = spaceship(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.pos.x).to.equal(X_POS);
            expect(actual.pos.y).to.equal(SPEED);
        });

        it('it should wrap when leaving left of game area', () => {
            state.dir = 180;
            state.pos.x = 0;
            actual = spaceship(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.pos.x).to.equal(screen.width - SPEED);
            expect(actual.pos.y).to.equal(Y_POS);
        });

        it('it should wrap when leaving top of game area', () => {
            state.dir = 270;
            state.pos.y = 0;
            actual = spaceship(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.pos.x).to.equal(X_POS);
            expect(actual.pos.y).to.equal(screen.height - SPEED);
        });
    });
});
