import React from 'react';
import {
    renderIntoDocument,
} from 'react-addons-test-utils';
import dashboard from '../src/reducers/dashboard.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as gameConfig from '../src/constants/gameConfig.js';
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

        it(`should set message to ${gameConfig.MESSAGE}`, () => {
            expect(actual.message).to.equal(gameConfig.MESSAGE_GAME_OVER);
        });
    });
});
