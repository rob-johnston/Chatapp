let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry : './main.js',
    output : {
        path: __dirname + '/public/js',
        filename: 'react-app.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['react', 'es2015', 'stage-0']}
            }]
        },


};
