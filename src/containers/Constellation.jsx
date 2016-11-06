import React from 'react';
import {connect} from 'react-redux';
import {Layer, Rect} from 'react-konva';
import Star from '../components/Star.jsx';

class Constellation extends React.Component {
    render() {

        var {
            constellation,
            width,
            height
        } = this.props;

        return (
            <Layer>
                <Rect
                    width={width}
                    height={height}
                    fill="#000000"
                />
                {constellation.stars.map((star) => {
                    return (
                        <Star
                            key={Math.random()}
                            pos={star.pos}
                            radius={star.radius}
                            opacity={star.opacity}
                        />
                    )
                })}
            </Layer>
        )
    }
}

export default connect((state) => ({
    constellation: state.constellation
}))(Constellation);
