import {combineReducers} from 'redux';
import spaceship from './spaceship';
import laser from './laser';
import asteroidField from './asteroidField';

export default combineReducers({
    spaceship,
    laser,
    asteroidField
});
