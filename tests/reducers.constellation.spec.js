import React from 'react';
import {
    renderIntoDocument,
} from 'react-addons-test-utils';
import constellation from '../src/reducers/constellation.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import * as gameConfig from '../src/constants/gameConfig.js';

describe('constellation reducer', () => {

    describe('START action type', () => {
        let state;
        let actual;

        beforeEach(() => {
            state = {
                stars: []
            };
        });

        it(`should create ${gameConfig.ASTEROIDS_START_COUNT} asteroids`, () => {
            actual = constellation(state,
                {type: actionTypes.START}
            );
            expect(actual.stars.length).to.equal(gameConfig.CONSTELLATION_COUNT);
        });
    });
});
