import React from 'react';
import dashboard from '../src/reducers/dashboard.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as gameStates from '../src/constants/gameStates.js';

describe('dashboard reducer', () => {

    describe('START action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                message: null,
                gameState: gameStates.STOPPED
            };
            actual = dashboard(state,
                {type: actionTypes.START}
            );
        });

        it(`should set game state to ${gameStates.PLAYING}`, () => {
            expect(actual.gameState).to.equal(gameStates.PLAYING);
        });

        it(`should set message to null`, () => {
            expect(actual.message).to.be.null;
        });

        it(`should set score to 0`, () => {
            expect(actual.score).to.equal(0);
        });
    });

    describe('GAME_OVER action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                message: null,
                gameState: gameStates.PLAYING
            };
            actual = dashboard(state,
                {type: actionTypes.GAME_OVER}
            );
        });

        it(`should set game state to ${gameStates.STOPPED}`, () => {
            expect(actual.gameState).to.equal(gameStates.STOPPED);
        });

        it(`should set message to a string`, () => {
            expect(actual.message).to.be.a('string');
        });
    });
});
