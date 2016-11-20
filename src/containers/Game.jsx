import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Stage} from 'react-konva';
import Constellation from '../containers/Constellation.jsx';
import AsteroidField from '../components/AsteroidField.jsx';
import Dashboard from '../containers/Dashboard.jsx';
import * as keyCodes from '../constants/keyCodes.js';
import {screen} from '../helpers/gameHelpers.js';
import {
    rotateRight,
    rotateLeft,
    forward,
    stop,
    stopRotation,
    fire,
    update,
    asteroidHitTest,
    spaceshipHitTest
} from '../actions/gameActions.js';

class Game extends React.Component {

    constructor() {
        super();
        this.handleKeyDown  = this.handleKeyDown.bind(this);
        this.handleKeyUp    = this.handleKeyUp.bind(this);
        this.focus          = this.focus.bind(this);
    }

    handleKeyDown(event) {
        var rot, x, y, laserOrigin;
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
                ({rot, pos: {x, y}} = this.props.spaceship);
                laserOrigin = {rot, pos: {x, y}};
                this.props.dispatch(fire(laserOrigin));
                break;
            default:
                break;
        }
    }

    updateGame() {
        this.props.dispatch(asteroidHitTest());
        this.props.dispatch(spaceshipHitTest());
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

    static handleResize() {
        screen.resize();
    }

    render() {

        var {
            spaceship,
            laser,
            asteroidField,
            debris
        } = this.props;

        return (
            <div
                ref={ref => { this.gameRef = ref; }}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
            >
                <Stage
                    width={screen.width}
                    height={screen.height}
                >
                    <Constellation
                        width={screen.width}
                        height={screen.height}
                    />
                    <AsteroidField
                        spaceship={spaceship}
                        laser={laser}
                        asteroidField={asteroidField}
                        debris={debris}
                        width={screen.width}
                        height={screen.height}
                    />
                </Stage>
                <Dashboard
                    width={screen.width}
                    height={screen.height}
                    onStart={this.focus}
                />
            </div>
        )
    }

    focus() {
        ReactDOM.findDOMNode(this.gameRef).focus();
    }

    componentDidMount() {
        window.addEventListener('resize',  this.constructor.handleResize);
        this.updateGame();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.constructor.handleResize);
    }
}

export default connect((state) => ({
    spaceship: state.spaceship,
    laser: state.laser,
    asteroidField: state.asteroidField,
    debris: state.debris
}))(Game);
