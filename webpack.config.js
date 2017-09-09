//const argv = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');
const path = require('path');
const distPath = 'dist';
const publicPath = '';

const config = {
  entry: './index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
    },
	module: {
	    loaders: [
	      { test: /\.js$/, loader: 'babel-loader?presets[]=es2015', exclude: /node_modules/ },
	      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
	    ]
	  },

    plugins: []
};

//if (argv.watch) config.plugins.push(new DashboardPlugin());

module.exports = config;