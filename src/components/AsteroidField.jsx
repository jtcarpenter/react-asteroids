import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {Layer, Rect} from 'react-konva';
import Spaceship from '../components/Spaceship.jsx';
import LaserBolt from '../components/LaserBolt.jsx';
import Asteroid from '../components/Asteroid.jsx';

class AsteroidField extends React.Component {
    render() {

        var {
            spaceship,
            laser,
            asteroidField,
            width,
            height
        } = this.props;

        return <Layer>
            <Rect
                width={width}
                height={height}
                />
            <Spaceship
                pos={spaceship.pos}
                rot={spaceship.rot}
                radius={spaceship.radius}
                laser={laser}
            />
            {laser.bolts.map((bolt, index) => {
                return <LaserBolt
                    key={Math.random()}
                    rot={bolt.rot}
                    radius={bolt.radius}
                    pos={bolt.pos}>
                </LaserBolt>
            })}
            {asteroidField.asteroids.map((asteroid, index) => {
                return <Asteroid
                    key={Math.random()}
                    rot={asteroid.rot}
                    radius={asteroid.radius}
                    pos={asteroid.pos}>
                </Asteroid>
            })}
        </Layer>
    }
}

export default AsteroidField;
