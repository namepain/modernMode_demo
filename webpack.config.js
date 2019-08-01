const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isModern = process.env.MODERN_BUILD === 'modern'
console.log('🍌', isProd)
console.log('🍌🍌', isModern)

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: '#source-map',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: isModern ? '[name]_[hash:8]_modern.js' : '[name]_[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src'),
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', {
                        "targets": {
                          "esmodules": isModern // core
                        }
                      }],
                      ['@babel/preset-react', {
                        useBuiltIns: true
                      }]
                    ],
                    plugins:[
                      '@babel/plugin-syntax-dynamic-import'
                    ],

                  }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: isModern ? './dist/index.html' : './public/index.html' // core
        }),
        // 帮助我们给 script 上加入自定义的 attr
        new ScriptExtHtmlWebpackPlugin({ // core
            custom: !isModern ? [
                {
                  test: /\.js$/,
                  attribute: 'nomodule'
                }
            ] : undefined,
            module: isModern ? 'modern' : undefined
        })
    ]
}