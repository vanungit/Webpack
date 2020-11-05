const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssertsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development' //true or false
const isPro = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all" //оптимизацыя
        }
    }
    if (isPro) {
        config.minimizer = [
            new OptimizeCssAssertsWebpackPlugin(), //  если в процесе development то оптимизуй css
            new TerserWebpackPlugin()
        ]
    }
    return config
}
const cssLoader = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,// Webpack пропускает с право на лево css-loader позволяет понимат import-и
            options: {            //style-loader дабавляет стил в html и устанавливаем их MiniCssExtractPlugin ето то же самое с
                publicPath: 'public/path/to/',
                hmr: isDev,    // в режиме разработки можем поменят оприделенные сушности без перезагруски
                reloadALL: true
            },
        }, 'css-loader'// допуска расширениям
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}
const babelOptions = preset=>{
   const opts = {
        presets: [
            '@babel/preset-env',
        ],
            plugins:['@babel/plugin-proposal-class-properties']
    }
    if(preset){
        opts.presets.push(preset)
    }
    return opts
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
//.../ hash позволяет создават названия файла свизи с контеетом присуствуешим в файле А [name] для  analytics для точка входа
module.exports = {
    context: path.resolve(__dirname, 'src'), //контекст с которово исползует
    mode: 'development',//по умолчанию режим
    entry: {
        main: ['@babel/polyfill','./index.jsx'],
        analytics: './analytics.ts'
    }, //точка входа
    output: {
        filename: filename('js'), //соберет все js получим один фаил...
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devtool: isDev?'source-map':'', //webpack> configuration?devtool  map
    devServer: {
        port: 4200, //webpack-dev-server npm i w.d.c
        open: true,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html', // синхронизирует html
            minify: {
                collapseWhitespace: isPro //if productions оптимизукт html
            }
        }),
        new CleanWebpackPlugin(),      //кеширует dist
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/ico.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, //кагда встречаеть импорт css то исползуй определенный тип Loader-ов
                use: cssLoader()
            },
            {
                test: /\.less$/,
                use: cssLoader('less-loader')
            },
            {
                test: /\.s[ac]ss$/, //либо sass, scss... npm i -D node-sass sass-loader
                use: cssLoader('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|wof|wof2)$/,
                use: ['file-loader']
            },
            {
                test: /\.(xml)$/,
                use: ['xml-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            },
        ]
    }
}
//