import React, {PropTypes, Component} from 'react';
import {Provider, connect} from 'react-redux';
import {Circle} from 'react-konva';

class Star extends React.Component {

    render() {
        var {pos, opacity, radius} = this.props;
        return <Circle
                x={pos.x}
                y={pos.y}
                radius={radius}
                fill="#ffffff"
                opacity={opacity}/>
    }
}

export default Star;
