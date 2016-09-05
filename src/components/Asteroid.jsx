import React, {PropTypes, Component} from 'react';
import {Provider, connect} from 'react-redux';
import {Layer, Rect, Line, Stage, Group} from 'react-konva';

class Asteroid extends React.Component {

    render() {
        const {pos, rot} = this.props;
        return <Line
                x={pos.x}
                y={pos.y}
                points={
                    [
                        -10, -50,
                        25, -45,
                        50, -30,
                        40, 25,
                        20, 50,
                        -10, 45,
                        -40, 20,
                        -50, -20
                    ]
                }
                closed="true"
                strokeWidth={1}
                stroke="#ffffff"
                rotation={rot}/>
    }
}

export default Asteroid;
