/**
 * Created by Digital Awesome.
 * https://digitalaweso.me
 * User: Oren Reuveni
 * Date: 15/07/2017
 * Time: 6:23
 */
var path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = env => {
    return {
        devServer: {
            contentBase: path.join(__dirname, "public"),
        },
        entry: './js/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public'),
            publicPath: path.join(__dirname, 'public'),
        },
        module: {
            rules: [
                {test: /\.html$/, use: 'raw-loader', exclude: /node_modules/},
                {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
                {test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/},
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({use: ["css-loader"]})
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({use: ["css-loader", "sass-loader"]}),
                    exclude: /node_modules/
                },
                {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.png($|\?)|\.gif($|\?)/, use: 'url-loader'}
            ]
        },
        target: "web",
        devtool: 'source-map',
        plugins: [
            new ExtractTextPlugin('styles.min.css'),
            new OptimizeCssAssetsPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                comments: false,
                sourceMap: true,
                minimize: false
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
        ]
    }
};