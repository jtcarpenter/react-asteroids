import * as gameActions from '../src/actions/gameActions.js';
import * as actionTypes from '../src/constants/actionTypes.js';

describe('gameActions', () => {
    it('should create an action with type START', () => {
        const expectedAction = {
            type: actionTypes.START
        }
        expect(gameActions.start()).to.eql(expectedAction);
    });

    it('should create an action with type ROTATE_RIGHT', () => {
        const expectedAction = {
            type: actionTypes.ROTATE_RIGHT
        }
        expect(gameActions.rotateRight()).to.eql(expectedAction);
    });

    it('should create an action with type ROTATE_LEFT', () => {
        const expectedAction = {
            type: actionTypes.ROTATE_LEFT
        }
        expect(gameActions.rotateLeft()).to.eql(expectedAction);
    });

    it('should create an action with type FORWARD', () => {
        const expectedAction = {
            type: actionTypes.FORWARD
        }
        expect(gameActions.forward()).to.eql(expectedAction);
    });

    it('should create an action with type STOP', () => {
        const expectedAction = {
            type: actionTypes.STOP
        }
        expect(gameActions.stop()).to.eql(expectedAction);
    });

    it('should create an action with type STOP_ROTATION', () => {
        const expectedAction = {
            type: actionTypes.STOP_ROTATION
        }
        expect(gameActions.stopRotation()).to.eql(expectedAction);
    });

    it('should create an action with type UPDATE', () => {
        const expectedAction = {
            type: actionTypes.UPDATE
        }
        expect(gameActions.update()).to.eql(expectedAction);
    });

    it('should create an action with type FIRE', () => {
        const laserOrigin = {rot: 0, pos: {x: 0, y: 0}};
        const expectedAction = {
            type: actionTypes.FIRE,
            laserOrigin: laserOrigin
        }
        expect(gameActions.fire(laserOrigin)).to.eql(expectedAction);
    });
});
