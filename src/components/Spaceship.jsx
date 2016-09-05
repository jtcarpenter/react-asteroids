import React, {PropTypes, Component} from 'react';
import * as types from '../constants/actionTypes';
import {Provider, connect} from 'react-redux';
import {Layer, Rect, Line, Stage, Group} from 'react-konva';

class Spaceship extends React.Component {

    render() {
        const {pos, rot} = this.props;
        return <Line
                x={pos.x}
                y={pos.y}
                points={[-20, -10, 20, 0, -20, 10, -10, 0]}
                strokeWidth={1}
                stroke="#ffffff"
                closed="true"
                rotation={rot}/>
    }
}

export default Spaceship;
