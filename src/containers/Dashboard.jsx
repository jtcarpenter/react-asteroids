import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Radium from 'radium';
import {
    start
} from '../actions/gameActions.js';
import * as gameStates from '../constants/gameStates.js';
import * as gameConfig from '../constants/gameConfig.js';

const style = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    color: 'white',
    fontFamily: 'Courier New, Courier, monospace'
};
const navStyle = {
    textAlign: 'center',
    display: 'block',
    width: gameConfig.GAME_WIDTH,
    height: '40px',
    marginTop: '10px'
};
const messagestyle = {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    height: 20,
    marginTop: gameConfig.GAME_HEIGHT / 4
};
const playBtnStyles = {
    'show': {
        background: 'transparent',
        padding: '15px 50px',
        border: '1px solid white',
        color: 'white',
        fontSize: '20px',
        display: 'block',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Courier New, Courier, monospace',
        ':hover': {
            background: 'white',
            color: 'black',
            cursor: 'pointer'
        }
    },
    'hide': {
        display: 'none'
    }
};

class Dashboard extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.dispatch(start());
        this.props.onStart();
    }

    render() {

        var {
            width,
            height,
            dashboard
        } = this.props;

        var playBtnStyle = dashboard.gameState === gameStates.STOPPED ?
            playBtnStyles.show: playBtnStyles.hide;

        return <div
            style={style}>
            <div
                width={width}
                style={navStyle}>
                &#x21E6;
                &#x21E7;
                &#x21E8; to move
                [SPACE] to shoot
            </div>
             <p style={messagestyle}>{dashboard.message}</p>
            <button
                onClick={this.handleClick}
                style={playBtnStyle}>
                Play
            </button>
        </div>
    }
}

export default connect((state) =>({
    dashboard: state.dashboard
}))(Radium(Dashboard));
