var path = require('path');
module.exports = {
    entry: './src/index.js',
    optimization: {
		// We no not want to minimize our code.
		minimize: true
	},
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules', 'react')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|ttf|eot|woff2?)$/,
                use: 'url-loader',
            },
        ]
    },
    externals: {
        'react': 'commonjs react'
    }
};