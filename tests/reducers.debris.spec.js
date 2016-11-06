import React from 'react';
import debris from '../src/reducers/debris.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as gameConfig from '../src/constants/gameConfig.js';

describe('debris reducer', () => {

    describe('START action type', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = {
                fragments: [{}]
            };
        });

        it('should reset number of fragents to 0', () => {
            actual = debris(state,
                {type: actionTypes.START}
            );
            expect(actual.fragments.length).to.equal(0);
        });
    });

    describe('ASTEROID_HIT action type', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = {
                fragments: [{}]
            };
        });

        it(`should create ${gameConfig.ASTEROID_FRAGMENT_COUNT} fragments`, () => {
            actual = debris(state,
                {
                    type: actionTypes.ASTEROID_HIT,
                    asteroid: {speed: 10, rot: 10, dir: 10, pos: {x: 10, y: 10}, index: 0}
                }
            );
            expect(actual.fragments.length).to.equal(gameConfig.ASTEROID_FRAGMENT_COUNT);
        });
    });

    describe('GAME_OVER action type', () => {

    });

    describe('UPDATE action type', () => {
        let state;
        let actual;
        const SPEED = 10;
        const X_POS = 10;
        const Y_POS = 10;

        beforeEach(() => {
            state = {
                fragments: [
                    {speed: SPEED, rot: 0, dir: 0, pos: {x: X_POS, y: Y_POS}}
                ]
            };
        });

        it(`should set x and y by distance of ${SPEED} when dir is 0`, () => {
            actual = debris(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.fragments[0].pos.x).to.equal(SPEED + X_POS);
            expect(actual.fragments[0].pos.y).to.equal(Y_POS);
        });
    });
});