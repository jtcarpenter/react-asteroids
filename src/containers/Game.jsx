import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {Rect, Stage} from 'react-konva';
import Constellation from '../containers/Constellation.jsx';
import AsteroidField from '../components/AsteroidField.jsx';
import Dashboard from '../containers/Dashboard.jsx';
import * as keyCodes from '../constants/keyCodes.js';
import * as gameConfig from '../constants/gameConfig.js';
import {
    rotateRight,
    rotateLeft,
    forward,
    stop,
    stopRotation,
    fire,
    update,
    asteroidHitTest
} from '../actions/gameActions.js';

class Game extends React.Component {

    constructor() {
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.focus = this.focus.bind(this);
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
        this.props.dispatch(asteroidHitTest());
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

        var {
            spaceship,
            laser,
            asteroidField
        } = this.props;

        var styles = {
            position: 'relative',
            width: gameConfig.GAME_WIDTH + 'px',
            height: gameConfig.GAME_HEIGHT + 'px',
            margin: '20px auto'
        }

        return <div
                ref="asteroids"
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                style={styles}>
            <Stage
                width={gameConfig.GAME_WIDTH}
                height={gameConfig.GAME_HEIGHT}
                scaleX={gameConfig.GAME_SCALE}
                scaleY={gameConfig.GAME_SCALE}>
                <Constellation
                    width={gameConfig.GAME_WIDTH}
                    height={gameConfig.GAME_HEIGHT}>
                </Constellation>
                <AsteroidField
                    spaceship={spaceship}
                    laser={laser}
                    asteroidField={asteroidField}
                    width={gameConfig.GAME_WIDTH}
                    height={gameConfig.GAME_HEIGHT}>
                </AsteroidField>
            </Stage>
            <Dashboard
                width={gameConfig.GAME_WIDTH}
                height={gameConfig.GAME_HEIGHT}
                onStart={this.focus}>
            </Dashboard>
        </div>
    }

    focus() {
        ReactDOM.findDOMNode(this.refs.asteroids).focus();
    }

    componentDidMount() {
        this.updateGame();
    }
}

export default connect((state) =>({
    spaceship: state.spaceship,
    laser: state.laser,
    asteroidField: state.asteroidField,
}))(Game);
