// NOT WORK on iOS!!!
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'src/phaser.js');
// var phaser = path.join(phaserModule, 'dist/phaser.min.js'); // change it to src/phaser.js to use non minify version
var version = JSON.stringify(require('./package.json').version);

// increment build number
let buildNumber = fs.readFileSync('./BUILD_NUMBER').toString();
++buildNumber;
fs.writeFileSync('BUILD_NUMBER', buildNumber);

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
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
        ]
        // vendor: ['pixi']

    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: './',
        filename: 'js/bundle.js'
    },
    plugins: [
        definePlugin,
        new CleanWebpackPlugin(['build']),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        /* new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    }), */
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' /* chunkName= */, filename: 'js/vendor.bundle.js' /* filename= */ }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // path.resolve(__dirname, 'build', 'index.html'),
            template: './src/index.html',
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true
            },
            hash: true
        }),
        new CopyWebpackPlugin([
            {from: 'assets', to: 'assets'}
        ])
        // new ZipPlugin({
        //     path: './',
        //     pathPrefix: '',
        //     filename: 'build.zip',
        //     fileOptions: {
        //         mtime: new Date(),
        //         mode: 0o100664,
        //         compress: true,
        //         forceZip64Format: true
        //     },
        // })
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        // alias: {
        //     'phaser': phaser
        // }
    },
    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')},
            {test: /phaser-split\.js$/, use: 'raw-loader'},
            {test: [/\.vert$/, /\.frag$/], use: 'raw-loader'}
        ]
    },
    optimization: {
        // splitChunks: {
        //     chunks: 'all'
        // },
        minimize: true
    }
    /* node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
    resolve: {
        alias: {
            'phaser': phaser
        }
    } */
};
