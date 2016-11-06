import * as gameActions from '../src/actions/gameActions.js';
import * as actionTypes from '../src/constants/actionTypes.js';

describe('gameActions', () => {

    it('should create an action with type START', () => {
        const expectedAction = {
            type: actionTypes.START
        };
        expect(gameActions.start()).to.eql(expectedAction);
    });

    it('should create an action with type ROTATE_RIGHT', () => {
        const expectedAction = {
            type: actionTypes.ROTATE_RIGHT
        };
        expect(gameActions.rotateRight()).to.eql(expectedAction);
    });

    it('should create an action with type ROTATE_LEFT', () => {
        const expectedAction = {
            type: actionTypes.ROTATE_LEFT
        };
        expect(gameActions.rotateLeft()).to.eql(expectedAction);
    });

    it('should create an action with type FORWARD', () => {
        const expectedAction = {
            type: actionTypes.FORWARD
        };
        expect(gameActions.forward()).to.eql(expectedAction);
    });

    it('should create an action with type STOP', () => {
        const expectedAction = {
            type: actionTypes.STOP
        };
        expect(gameActions.stop()).to.eql(expectedAction);
    });

    it('should create an action with type STOP_ROTATION', () => {
        const expectedAction = {
            type: actionTypes.STOP_ROTATION
        };
        expect(gameActions.stopRotation()).to.eql(expectedAction);
    });

    it('should create an action with type UPDATE', () => {
        const expectedAction = {
            type: actionTypes.UPDATE
        };
        expect(gameActions.update()).to.eql(expectedAction);
    });

    it('should create an action with type FIRE', () => {
        const laserOrigin = {rot: 0, pos: {x: 0, y: 0}};
        const expectedAction = {
            type: actionTypes.FIRE,
            laserOrigin: laserOrigin
        };
        expect(gameActions.fire(laserOrigin)).to.eql(expectedAction);
    });

    it('should create an action with type ASTEROID_HIT', () => {
        const asteroid = {};
        const laserBolt = {};
        const expectedAction = {
            type: actionTypes.ASTEROID_HIT,
            asteroid: asteroid,
            laserBolt: laserBolt
        };
        expect(gameActions.asteroidHit(asteroid, laserBolt)).to.eql(expectedAction);
    });

    it('should create an action with type GAME_OVER', () => {
        const spaceship = {};
        const expectedAction = {
            type: actionTypes.GAME_OVER,
            spaceship: spaceship
        };
        expect(gameActions.gameOver(spaceship)).to.eql(expectedAction);
    });

    describe('asteroidHitTest', () => {

        var asteroidField ;
        var laser;

        beforeEach(() => {
            asteroidField = {
                asteroids: [{
                    radius: 10,
                    pos: {x: 0, y: 0}
                }]
            };
            laser = {
                bolts: [{
                    radius: 10,
                    pos: {x: 0, y: 19}
                }]
            };
        });

        it('should dispatch asteroidHit action', () => {

            const getState = () => ({
                asteroidField: asteroidField,
                laser: laser
            });
            const dispatch = sinon.spy();
            var index, x, y, speed, asteroid, laserBolt;
            ({index = 0, pos: {x, y}, speed} = asteroidField.asteroids[0]);
            asteroid = {index, pos: {x, y}, speed};
            ({index = 0, pos: {x, y}} = laser.bolts[0]);
            laserBolt = {index, pos: {x, y}};
            const expectedAction = {
                type: actionTypes.ASTEROID_HIT,
                asteroid: asteroid,
                laserBolt: laserBolt
            };
            gameActions.asteroidHitTest()(dispatch, getState);

            expect(dispatch.calledOnce).to.be.true;
            sinon.assert.calledWith(dispatch, expectedAction);
        });

        it('should not dispatch asteroidHit action', () => {

            laser.bolts[0].pos.y = 21;
            const getState = () => ({
                asteroidField: asteroidField,
                laser: laser
            });
            const dispatch = sinon.spy();
            gameActions.asteroidHitTest()(dispatch, getState);

            expect(dispatch.calledOnce).to.be.false;
        });
    });

    describe('spaceshipHitTest', () => {

        var asteroidField ;
        var spaceship;

        beforeEach(() => {
            asteroidField = {
                asteroids: [{
                    radius: 10,
                    pos: {x: 0, y: 0}
                }]
            };
            spaceship = {
                radius: 10,
                pos: {x: 0, y: 19},
                speed: 10
            };
        });

        it('should dispatch gameOver action', () => {
            const getState = () => ({
                asteroidField: asteroidField,
                spaceship: spaceship
            });
            const dispatch = sinon.spy();
            const expectedAction = {
                type: actionTypes.GAME_OVER,
                spaceship: {
                    pos: {x: spaceship.pos.x, y: spaceship.pos.y},
                    speed: spaceship.speed
                }
            };
            gameActions.spaceshipHitTest()(dispatch, getState);

            expect(dispatch.calledOnce).to.be.true;
            sinon.assert.calledWith(dispatch, expectedAction);
        });

        it('should not dispatch gameOver action', () => {
            spaceship.pos.y = 21;
            const getState = () => ({
                asteroidField: asteroidField,
                spaceship: spaceship
            });
            const dispatch = sinon.spy();
            gameActions.spaceshipHitTest()(dispatch, getState);

            expect(dispatch.calledOnce).to.be.false;
        });
    });
});
