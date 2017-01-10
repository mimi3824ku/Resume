/**
 * Created by Administrator on 2017/1/10.
 */
module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
        ]
    }
}