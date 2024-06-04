const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './packages/main-app/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(
                __dirname,
                'packages/main-app/public/index.html'
            ),
            filename: 'index.html',
        }),
    ],
    resolve: {
        alias: {
            'component-app-1': path.resolve(
                __dirname,
                'packages/component-app-1/src'
            ),
            'component-app-2': path.resolve(
                __dirname,
                'packages/component-app-2/src'
            ),
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
}
