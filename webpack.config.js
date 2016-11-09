const path = require('path');
const webpack = require('webpack');
const WebpackStripLoader = require('strip-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, 'src/'),
    public: path.join(__dirname, 'public'),
    dist: path.join(__dirname, 'dist'),
    template: path.join(__dirname, 'index.html'),
};

config = {
    entry: {
        app: PATHS.src + '/index.js'
    },
    output: {
        path: PATHS.public,
        filename: 'bundle.js',
        publicPath: 'http://localhost:3333/',
    },
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        port: 3333,
        contentBase: PATHS.public
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: PATHS.src,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: []
}

if (process.env.NODE_ENV === 'prod') {
    config.output.path = PATHS.dist;
    config.output.publicPath = '/';

    config.module.loaders.push(stripLoader = {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: WebpackStripLoader.loader('console.log')
    });
    config.plugins.push(new CleanWebpackPlugin([PATHS.dist], {
        root: __dirname,
        verbose: true,
        dry: false
    }));
    config.plugins.push(new HtmlWebpackPlugin({
        hash: false,
        title: 'Asteroids',
        filename: 'index.html',
        template: PATHS.template,
    }));
}

else {
    config.plugins.push(new HtmlWebpackPlugin({
        hash: true,
        title: 'Asteroids',
        filename: 'index.html',
        template: PATHS.template,
    }));
}

module.exports = config;