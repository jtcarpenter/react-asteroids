import React from 'react';
import {Line} from 'react-konva';

class Asteroid extends React.Component {

    render() {
        var {pos, rot, radius} = this.props;
        var unit = radius / 10;
        return (
            <Line
                x={pos.x}
                y={pos.y}
                points={
                    [
                        -(radius - (unit * 8)), -radius,
                        radius - (unit * 5), -(radius - unit),
                        radius, -(radius - (unit * 4)),
                        radius - (unit * 2), radius - (unit * 5),
                        radius - (unit * 4), radius,
                        -(radius - (unit * 8)), radius - unit,
                        -(radius - (unit * 2)), radius - (unit * 6),
                        -radius, -(radius - (unit * 6))
                    ]
                }
                closed="true"
                strokeWidth={1}
                stroke="#ffffff"
                rotation={rot}
            />
        )
    }
}

export default Asteroid;
