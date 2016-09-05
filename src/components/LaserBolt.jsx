import React, {PropTypes, Component} from 'react';
import {Provider, connect} from 'react-redux';
import {Layer, Rect, Line, Stage, Group} from 'react-konva';

class LaserBolt extends React.Component {

    render() {
        const {pos, rot} = this.props;
        return <Line
                x={pos.x}
                y={pos.y}
                points={[-1, 0, 2, 0]}
                strokeWidth={1}
                stroke="#ffffff"
                rotation={rot}/>
    }
}

export default LaserBolt;
