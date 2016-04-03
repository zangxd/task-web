/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-21
 * @description: webpack config
 */

'use strict';

let path = require('path');
let glob = require('glob');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let pathMap = require('./src/pathmap.json');
let srcDir = path.resolve(process.cwd(), 'src');

const debug = process.env.NODE_ENV !== 'production';

let config = {
  entry:{
    index: './src/js/page/index.js'
  },
  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },
  resolve: {
      root: [srcDir, './node_modules'],
      alias: pathMap,
      extensions: ['', '.js', '.css', '.less', '.tpl', '.png', '.jpg']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less')
      }, {
        test: /\.html$/,
        loader: "html?attrs=img:src img:data-src"
      }, {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      }, {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
      }
    ]
  },
  plugins: [
    // 提供全局的变量，在模块中使用无需用require引入
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: ['index'],
      minChunks: 1 // 提取所有entry共同依赖的模块
    }),
    new ExtractTextPlugin('css/[name].css'),

    debug ? () => {} : new UglifyJsPlugin({ //压缩代码
      compress: {
        warnings: false
      },
      except: ['$super', '$', 'exports', 'require'] //排除关键字
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './views/index.html', //生成的html存放路径，相对于path
      template: './src/views/index.html', //html模板路径
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new webpack.HotModuleReplacementPlugin() //热加载

  ]
};
module.exports=config;
