var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'src/phaser.js');

let buildNumber = fs.readFileSync('./BUILD_NUMBER').toString();
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    CANVAS_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    VERSION: JSON.stringify(require('./package.json').version),
    BUILD_NUMBER: buildNumber,
    BUILD_TIME: Date.now()
});

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.js')
        ],
        vendor: [
            'phaser']
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        definePlugin,
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './dist']
            }
        })
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')},
            {test: /phaser-split\.js$/, use: ['expose-loader?Phaser']},
            {test: [/\.vert$/, /\.frag$/], use: 'raw-loader'}
        ]
    }
};
