import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {Layer, Rect, Line, Stage, Group} from 'react-konva';
import Spaceship from '../components/Spaceship.jsx';
import LaserBolt from '../components/LaserBolt.jsx';
import Asteroid from '../components/Asteroid.jsx';
import * as keyCodes from '../constants/keyCodes.js';
import * as gameConfig from '../constants/gameConfig.js';
import {
    start,
    rotateRight,
    rotateLeft,
    forward,
    stop,
    stopRotation,
    fire,
    update
} from '../actions/gameActions.js';

class Game extends React.Component {

    constructor() {
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyDown(event) {
        switch(event.keyCode) {
            case keyCodes.LEFT:
                this.props.dispatch(rotateLeft());
                break;
            case keyCodes.RIGHT:
                this.props.dispatch(rotateRight());
                break;
            case keyCodes.UP:
                this.props.dispatch(forward());
                break;
            case keyCodes.SPACE:
                let {rot, pos: {x, y}} = this.props.spaceship;
                let laserOrigin = {rot, pos: {x, y}};
                this.props.dispatch(fire(laserOrigin));
                break;
            default:
                break;
        }
    }

    updateGame() {
        this.props.dispatch(update());
        requestAnimationFrame(this.updateGame.bind(this));
    }

    handleKeyUp(event) {
        switch(event.keyCode) {
            case keyCodes.LEFT:
            case keyCodes.RIGHT:
                this.props.dispatch(stopRotation());
                break;
            case keyCodes.UP:
                this.props.dispatch(stop());
                break;
            default:
                break;
        }
    }

    render() {

        const {
            spaceship,
            laser,
            asteroidField
        } = this.props;

        return <div
                ref="asteroids"
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}>
            <Stage
                width={gameConfig.GAME_WIDTH}
                height={gameConfig.GAME_HEIGHT}
                scaleX={gameConfig.GAME_SCALE}
                scaleY={gameConfig.GAME_SCALE}>
                <Layer>
                    <Rect
                        width={gameConfig.GAME_WIDTH}
                        height={gameConfig.GAME_HEIGHT}
                        fill="#000000"/>
                    <Spaceship
                        pos={spaceship.pos}
                        rot={spaceship.rot}
                    />
                    {laser.bolts.map((bolt, index) => {
                        return <LaserBolt
                            key={Math.random()}
                            rot={bolt.rot}
                            pos={bolt.pos}>
                        </LaserBolt>
                    })}
                    {asteroidField.asteroids.map((asteroid, index) => {
                        return <Asteroid
                            key={Math.random()}
                            rot={asteroid.rot}
                            pos={asteroid.pos}>
                        </Asteroid>
                    })}
                </Layer>
            </Stage>
        </div>
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.asteroids).focus();
        this.updateGame();

        // TODO: start should be triggered by a keypress
        this.props.dispatch(start());
    }
}

export default connect((state) =>({
    spaceship: state.spaceship,
    laser: state.laser,
    asteroidField: state.asteroidField
}))(Game);
