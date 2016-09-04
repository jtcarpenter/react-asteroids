import React, {PropTypes, Component} from 'react';
import * as types from '../constants/actionTypes';
import {Provider, connect} from 'react-redux';
import {increment, decrement} from '../actions/counterActions';

class Counter extends React.Component {

    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    render() {
        const {counter} = this.props;
        return <div>
            counter: {counter}
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
        </div>
    }

    increment() {
        this.props.dispatch(increment());
    }

    decrement() {
        this.props.dispatch(decrement());
    }
}

export default connect((state) =>(
    {counter: state.counter,}
))(Counter);
