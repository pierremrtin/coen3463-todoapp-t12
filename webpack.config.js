const path = require('path');
const webpack = require('webpack');

new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),

new webpack.optimize.UglifyJsPlugin()

module.exports = {
    entry:{
       app: './app/index'
    },
    output:{
        path: path.join(__dirname, '/public/javascripts'),
        publicPath: "/",
        filename: '[name].bundle.js'
    },
    module:{
        loaders:[
            {   
                test: /\.js$/,
                exclude:'/node_modules',
                loader:'babel-loader',
                query: {
                    presets: ['latest', 'react', 'es2015']
                }
            },
            {test: /\.css$/, loader:'style-loader!css-loader'}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
} 