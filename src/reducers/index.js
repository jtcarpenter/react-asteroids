import {combineReducers} from 'redux';
import spaceship from './spaceship';
import laser from './laser';
import asteroidField from './asteroidField';
import debris from './debris';
import constellation from './constellation';
import dashboard from './dashboard';

export default combineReducers({
    spaceship,
    laser,
    asteroidField,
    debris,
    constellation,
    dashboard
});
