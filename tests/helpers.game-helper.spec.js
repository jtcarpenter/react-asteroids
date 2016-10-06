import {hitTest} from '../src/helpers/gameHelpers.js';

describe('gameHelpers', () => {

    describe('hitTest', () => {

        var result;

        it('should return true when distance is less than combined radius', () => {
            result = hitTest(
                {radius: 10, pos: {x: 0, y: 0}},
                {radius: 10, pos: {x: 19, y: 0}}
            );
            expect(result).to.be.true;
        });

        it('should return false when distance is greater than combined radius', () => {
            result = hitTest(
                {radius: 10, pos: {x: 0, y: 0}},
                {radius: 10, pos: {x: 21, y: 0}}
            );
            expect(result).to.be.false;
        });

        it('should return false when distance is equal to combined radius', () => {
            result = hitTest(
                {radius: 10, pos: {x: 0, y: 0}},
                {radius: 10, pos: {x: 20, y: 0}}
            );
            expect(result).to.be.false;
        });
    });
});
