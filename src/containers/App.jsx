import React, {PropTypes, Component} from 'react';
import {Provider, connect} from 'react-redux';
import Counter from '../components/Counter.jsx';

class App extends React.Component {

    render() {
        return <div>
            <Counter></Counter>
        </div>
    }
}

export default App;
