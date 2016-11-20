import React from 'react';
import asteroidField from '../src/reducers/asteroidField.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as gameConfig from '../src/constants/gameConfig.js';
import {screen} from '../src/helpers/gameHelpers';

describe('asteroidField reducer', () => {

    describe('START action type', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = {
                asteroids: []
            };
        });

        it(`should create ${gameConfig.ASTEROID_START_COUNT} asteroids`, () => {
            actual = asteroidField(state,
                {type: actionTypes.START}
            );
            expect(actual.asteroids.length).to.equal(gameConfig.ASTEROID_START_COUNT);
        });

        it('should reset maxAcceleration', () => {
            state.maxAcceleration = 2;
            actual = asteroidField(state,
                {type: actionTypes.START}
            );
            expect(actual.maxAcceleration).to.equal(gameConfig.ASTEROID_START_MAX_ACCL);
        });
    });

    describe('GAME_OVER action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                asteroids: [
                    {speed: 10, dir: 0, pos: {x: 0, y: 0}}
                ]
            };
        });

        it('should remove all asteroids', () => {
            actual = asteroidField(state,
                {type: actionTypes.GAME_OVER}
            );
            expect(actual.asteroids.length).to.equal(0);
        });
    });

    describe('UPDATE action type', () => {
        let state;
        let actual;
        const SPEED = 10;
        const X_POS = 10;
        const Y_POS = 10;

        beforeEach(() => {
            state = {
                asteroids: [
                    {speed: SPEED, dir: 0, pos: {x: X_POS, y: Y_POS}}
                ]
            };
        });

        it(`should set x and y by distance of ${SPEED} when dir is 0`, () => {
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(SPEED + X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(Y_POS);
        });

        it(`should set x and y by distance of ${SPEED} when dir is 45`, () => {
            state.asteroids[0].dir = 45;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            let y;
            let x = y = Math.sqrt((Math.pow(SPEED, 2) / 2));
            expect(actual.asteroids[0].pos.x - X_POS).to.be.closeTo(x, 0.5);
            expect(actual.asteroids[0].pos.y - Y_POS).to.be.closeTo(y, 0.5);
        });

        it('should wrap when leaving right of game area', () => {
            // facing right
            state.asteroids[0].pos.x = screen.width;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(SPEED);
            expect(actual.asteroids[0].pos.y).to.equal(Y_POS);
        });

        it('should wrap when leaving bottom of game area', () => {
            // facing down
            state.asteroids[0].dir = 90;
            state.asteroids[0].pos.y = screen.height;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(SPEED);
        });

        it('should wrap when leaving left of game area', () => {
            // facing left
            state.asteroids[0].dir = 180;
            state.asteroids[0].pos.x = 0;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(screen.width - X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(Y_POS);
        });

        it('should wrap when leaving top of game area', () => {
            // facing up
            state.asteroids[0].dir = 270;
            state.asteroids[0].pos.y = 0;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(screen.height - Y_POS);
        });
    });

    describe('ASTEROID_HIT action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                asteroids: [
                    {speed: 10, dir: 10, pos: {x: 0, y: 0}},
                    {speed: 10, dir: 10, pos: {x: 10, y: 10}}
                ]
            };
        });

        it('should remove asteroid of returned index', () => {
            expect(state.asteroids.length).to.equal(2);
            actual = asteroidField(state,
                {
                    type: actionTypes.ASTEROID_HIT,
                    asteroid: {speed: 10, dir: 10, pos: {x: 10, y: 10}, index: 0}
                }
            );
            expect(actual.asteroids.length).to.equal(2);
            expect(actual.asteroids[0].pos.x).to.equal(10);
        });
    });
});
