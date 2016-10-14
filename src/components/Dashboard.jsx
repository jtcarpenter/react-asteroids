import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Radium from 'radium';
import {
    start
} from '../actions/gameActions.js';
import * as gameStates from '../constants/gameStates.js';

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

        var style = {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            color: 'white',
            fontFamily: 'Courier New, Courier, monospace'
        }
        var navStyle = {
            textAlign: 'center',
            display: 'block',
            width: width + 'px',
            height: '40px',
            marginTop: '10px'
        }
        var playBtnStyles = {
            'show': {
                background: 'transparent',
                padding: '15px 50px',
                border: '1px solid white',
                color: 'white',
                fontSize: '20px',
                display: 'block',
                marginTop: height / 4,
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
        }

        var playBtnStyle = dashboard.gameState === gameStates.STOPPED ?
            playBtnStyles.show: playBtnStyles.hide;

        return <div
            style={style}>
            <div
                width={width}
                style={navStyle}>
                [&#x25C0;]
                [&#x25B2;]
                [&#x25B6;] to move
                [SPACE] to shoot
            </div>
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
