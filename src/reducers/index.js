import {combineReducers} from 'redux';
import spaceship from './spaceship';
import laser from './laser';
import asteroidField from './asteroidField';
import constellation from './constellation';

export default combineReducers({
    spaceship,
    laser,
    asteroidField,
    constellation
});
