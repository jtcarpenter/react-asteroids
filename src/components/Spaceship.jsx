import React, {PropTypes, Component} from 'react';
import * as types from '../constants/actionTypes';
import {Provider, connect} from 'react-redux';
import {Line} from 'react-konva';

class Spaceship extends React.Component {

    render() {
        var {pos, rot, radius} = this.props;
        return <Line
                x={pos.x}
                y={pos.y}
                points={
                    [
                        -(radius *2), -radius,
                        radius * 2, 0,
                        -(radius * 2), radius,
                        -radius, 0
                    ]
                }
                strokeWidth={1}
                stroke="#ffffff"
                closed="true"
                rotation={rot}/>
    }
}

export default Spaceship;
