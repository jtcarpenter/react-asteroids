import React from 'react';
import {Line} from 'react-konva';

class LaserBolt extends React.Component {

    render() {
        var {pos, rot, radius} = this.props;
        return (
            <Line
                x={pos.x}
                y={pos.y}
                points={[-radius, 0, radius * 2, 0]}
                strokeWidth={radius}
                stroke="#ffffff"
                rotation={rot}
            />
        )
    }
}

export default LaserBolt;
