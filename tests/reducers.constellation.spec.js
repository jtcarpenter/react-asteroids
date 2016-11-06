import React from 'react';
import constellation from '../src/reducers/constellation.js';
import * as gameConfig from '../src/constants/gameConfig.js';

describe('constellation reducer', () => {
    it(`should return initial state with ${gameConfig.CONSTELLATION_COUNT} stars`, () => {
        expect(constellation(undefined, {}).stars.length)
        .to.equal(gameConfig.CONSTELLATION_COUNT)
    });
});
