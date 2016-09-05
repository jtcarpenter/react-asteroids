import React from 'react';
import {
    renderIntoDocument,
} from 'react-addons-test-utils';
import asteroidField from '../src/reducers/asteroidField.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as gameConfig from '../src/constants/gameConfig.js';

describe('asteroidField reducer', () => {

    describe('START action type', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = {
                asteroids: []
            };
        });

        it(`should create ${gameConfig.ASTEROIDS_START_COUNT} asteroids`, () => {
            actual = asteroidField(state,
                {type: actionTypes.START}
            );
            expect(actual.asteroids.length).to.equal(gameConfig.ASTEROIDS_START_COUNT);
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
                    {speed: SPEED, rot: 0, pos: {x: X_POS, y: Y_POS}}
                ]
            };
        });

        it(`should set x and y by distance of ${SPEED} when rot is 0`, () => {
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(SPEED + X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(Y_POS);
        });

        it(`should set x and y by distance of ${SPEED} when rot is 45`, () => {
            state.asteroids[0].rot = 45;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            let y;
            let x = y = Math.sqrt((Math.pow(SPEED, 2) / 2));
            expect(actual.asteroids[0].pos.x - X_POS).to.be.closeTo(x, 0.5);
            expect(actual.asteroids[0].pos.y - Y_POS).to.be.closeTo(y, 0.5);
        });

        it('it should wrap when leaving right of game area', () => {
            // facing right
            state.asteroids[0].pos.x = gameConfig.GAME_WIDTH;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(SPEED);
            expect(actual.asteroids[0].pos.y).to.equal(Y_POS);
        });

        it('it should wrap when leaving bottom of game area', () => {
            // facing down
            state.asteroids[0].rot = 90;
            state.asteroids[0].pos.y = gameConfig.GAME_HEIGHT;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(SPEED);
        });

        it('it should wrap when leaving left of game area', () => {
            // facing left
            state.asteroids[0].rot = 180;
            state.asteroids[0].pos.x = 0;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(gameConfig.GAME_WIDTH - X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(Y_POS);
        });

        it('it should wrap when leaving top of game area', () => {
            // facing up
            state.asteroids[0].rot = 270;
            state.asteroids[0].pos.y = 0;
            actual = asteroidField(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.asteroids[0].pos.x).to.equal(X_POS);
            expect(actual.asteroids[0].pos.y).to.equal(gameConfig.GAME_HEIGHT - Y_POS);
        });
    });
});
