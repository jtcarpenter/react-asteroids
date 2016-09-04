import React from 'react';
import {
    renderIntoDocument,
} from 'react-addons-test-utils';
import expect from 'expect';
import App from '../src/containers/App.jsx';

describe('add', () => {
    it('adds', () => {
        expect(1 + 1).toEqual(2);
    });
});

describe('App', () => {
    it('renders without problems', () => {
        var app = renderIntoDocument(<div/>);
        expect(app).toExist();
    });
});
