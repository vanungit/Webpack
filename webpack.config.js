const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development' //true or false
module.exports = {
    context: path.resolve(__dirname, 'src'), //контекст с которово исползует
    mode: 'development',//по умолчанию режим
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    }, //точка входа
    output: {
        filename: '[name].[contenthash].js', //соберет все js получим один фаил... А [name] для  analytics для точка входа
        path: path.resolve(__dirname, 'dist')           //.../ contenrhash позволяет создават названия файла свизи с контеетом присуствуешим в файле
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: "all" //оптимизацыя
        }
    },
    devServer: {
        port: 4200, //webpack-dev-server npm i w.d.c
        open: true,
        hot:isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html' // синхронизирует html
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
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, //кагда встречаеть импорт css то исползуй определенный тип Loader-ов
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,// Webpack пропускает с право на лево css-loader позволяет понимат import-и
                        options: {            //style-loader дабавляет стил в html и устанавливаем их MiniCssExtractPlugin ето то же самое с
                            publicPath: 'public/path/to/',
                            hmr:isDev,    // в режиме разработки можем поменят оприделенные сушности без перезагруски
                            reloadALL:true
                        },
                    }, 'css-loader'// допуска расширениям
                ]
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
            }
        ]
    }
}
//