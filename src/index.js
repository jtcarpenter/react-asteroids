import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import {Provider} from 'react-redux';
import appStore from './store/appStore';

ReactDOM.render(
    <Provider store={appStore}>
        <App/>
    </Provider>,
    document.getElementById('app'));
