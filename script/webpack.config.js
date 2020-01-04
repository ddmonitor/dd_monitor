const path = require("path");
const webpack = require('webpack');
module.exports = {
    entry: './index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: 
`// ==UserScript==
// @name         DD Monitor Helper - dev
// @namespace    http://tampermonkey.net/
// @version      6.6.6
// @description  DD Monitor Helper - development mode
// @author       LoveKicher
// @match        *
// @grant        GM_xmlhttpRequest
// ==/UserScript==

`,
            entryOnly: true,
            raw: true
        })
    ]
};
