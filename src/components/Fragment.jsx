import React, {PropTypes, Component} from 'react';
import {Provider, connect} from 'react-redux';
import {Line} from 'react-konva';

class Fragment extends React.Component {

    render() {
        var {pos, rot, radius} = this.props;
        return <Line
                x={pos.x}
                y={pos.y}
                points={
                    [
                        -(radius * 2), -radius,
                        radius * 2, -radius,
                        radius, radius
                    ]
                }
                strokeWidth={1}
                closed="true"
                stroke="#ffffff"
                rotation={rot}/>
    }
}

export default Fragment;
