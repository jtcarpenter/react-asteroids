import {hitTest, calcXDist, calcYDist} from '../src/helpers/gameHelpers.js';

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

    describe('xDist', () => {

        var rot = 45;
        var speed = 10;
        var expectedXDist = 7;

        it(`should return close to ${expectedXDist} with speed ${speed} and rot ${rot}`, () => {
            var xDist = calcXDist(rot, speed);
            expect(xDist).to.be.closeTo(expectedXDist, 0.5);
        });
    });

    describe('yDist', () => {

        var rot = 45;
        var speed = 10;
        var expectedYDist = 7;

        it(`should return close to ${expectedYDist} with speed ${speed} and rot ${rot}`, () => {
            var yDist = calcYDist(rot, speed);
            expect(yDist).to.be.closeTo(expectedYDist, 0.5);
        });
    });
});
