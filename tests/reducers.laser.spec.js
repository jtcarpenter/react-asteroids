import React from 'react';
import laser from '../src/reducers/laser.js';
import * as actionTypes from '../src/constants/actionTypes.js';
import {screen} from '../src/helpers/gameHelpers';

describe('laser reducer', () => {

    describe('FIRE action type', () => {

        let state;
        let actual;

        beforeEach(() => {
            state = {
                bolts: []
            };
        });

        it('should add new laser bolt to laser bolts list', () => {
            let action = {
                type: actionTypes.FIRE,
                laserOrigin: {rot: 10, pos: {x: 20, y: 30}}
            }
            actual = laser(state, action);
            expect(actual.bolts.length).to.equal(1);
        });

        it('should add laser bolt with defined position and rotation', () => {
            let action = {
                type: actionTypes.FIRE,
                laserOrigin: {rot: 10, pos: {x: 20, y: 30}}
            }
            actual = laser(state, action);
            expect(actual.bolts[0].pos.x).to.equal(action.laserOrigin.pos.x);
            expect(actual.bolts[0].pos.y).to.equal(action.laserOrigin.pos.y);
            expect(actual.bolts[0].rot).to.equal(action.laserOrigin.rot);
        });
    });

    describe('UPDATE action type', () => {
        let state;
        let actual;
        const SPEED = 5;

        beforeEach(() => {
            state = {
                speed: SPEED,
                bolts: []
            };
        });

        it(`should set x and y by distance of ${SPEED} when dir is 0`, () => {
            state.bolts = [{dir: 0, pos: {x: 0, y: 0}}];
            actual = laser(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.bolts[0].pos.x).to.equal(SPEED);
            expect(actual.bolts[0].pos.y).to.equal(0);
        });

        it(`should set x and y by distance of ${SPEED} when dir is 45`, () => {
            state.bolts = [{dir: 45, pos: {x: 0, y: 0}}];
            actual = laser(state,
                {type: actionTypes.UPDATE}
            );
            let y;
            let x = y = Math.sqrt((Math.pow(SPEED, 2) / 2));
            expect(actual.bolts[0].pos.x).to.be.closeTo(x, 0.5);
            expect(actual.bolts[0].pos.y).to.be.closeTo(y, 0.5);
        });

        it('should remove bolt when it leaves the right of game area', () => {
            // facing right
            state.bolts = [{rot: 0, pos: {x: screen.width, y: 0}}];
            actual = laser(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.bolts.length).to.equal(0);
        });

        it('should remove bolt when it leaves the bottom of game area', () => {
            // facing down
            state.bolts = [{rot: 90, pos: {x: 0, y: screen.height}}];
            actual = laser(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.bolts.length).to.equal(0);
        });

        it('should remove bolt when it leaves the left of game area', () => {
            // facing left
            state.bolts = [{rot: 180, pos: {x: 0, y: 0}}];
            actual = laser(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.bolts.length).to.equal(0);
        });

        it('should remove bolt when it leaves the top of game area', () => {
            // facing up
            state.bolts = [{rot: 270, pos: {x: 0, y: 0}}];
            actual = laser(state,
                {type: actionTypes.UPDATE}
            );
            expect(actual.bolts.length).to.equal(0);
        });
    });
});
