var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HappyPack = require('happypack');
var path = require('path');
var defaultSettings = require('./defaults');
var filePath = defaultSettings.filePath;

var project = require('./project.config');
var __LOCAL__ = project.globals.__LOCAL__;
var __DEV__ = project.globals.__DEV__;
var __QAIF__ = project.globals.__QAIF__;
var __QAFC__ = project.globals.__QAFC__;
var __PRE__ = project.globals.__PRE__;
var __ONLINE__ = project.globals.__ONLINE__;

var primaryColor = '@purple-6';
// var primaryColor = '#F8CF00';
var headingColor = 'fade(#000, 100%)';
var textColor = 'fade(#000, 85%)';
var textColorSecondary = 'fade(#000, 65%)';

var webpackConfig = {
  entry: {
    app: defaultSettings.filePath.srcPath + '/index.jsx',
  },
  output: {
    path: filePath.build,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].map',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 文件扩展名自动填充为 js 或 jsx
    alias: {
      'components': path.join(__dirname, '../src/javascript/components'),
      'page':       path.join(__dirname, '../src/javascript/page'),
      'extend':     path.join(__dirname, '../src/javascript/extend'),
      'constants':  path.join(__dirname, '../src/javascript/extend/constants'),
      'scss':       path.join(__dirname, '../src/scss'),
      'states':     path.join(__dirname, '../src/javascript/states'),
      'pages':      path.join(__dirname, '../src/jipei-statementsPages'),
      'src':        path.join(__dirname, '../src'),
      'images':     path.join(__dirname, '../res/images'),
      'data':       path.join(__dirname, '../src/javascript/data'),
      'fonts':      path.join(__dirname, '../res/fonts'),
      'jquery':     path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js'),
    }
  },
  module: {
    rules: []
  },
  plugins: []
};

if (__LOCAL__) {
  webpackConfig.cache = true;
  webpackConfig.devtool = 'inline-source-map';   // 映射代码到其原始位置
  webpackConfig.devServer = {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    publicPath: filePath.publicPath,
    port: defaultSettings.port,
    disableHostCheck: true, // 必须同时设置disableHostCheck host两个属性，
    host: "0.0.0.0",        // 才能用ip代替localhost访问
    openPage: '/Login',
  };

  webpackConfig.module.noParse = [
    path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
  ];

  webpackConfig.module.rules.push(
    {
      enforce: "pre",
      //检测文件类型
      test: /\.(js|jsx)$/,
      //检测文件位置
      include: path.join(__dirname, '../src'),
        //使用eslint-loader
      use: 'eslint-loader'
    }, {
      test: /.jsx?$/,
      use: [
        {
          loader: 'react-hot-loader',
        }, {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0', 'stage-1'],
            cacheDirectory: true,
            // plugins: [require('babel-plugin-transform-object-rest-spread')]
          },
        }, {
          loader: 'webpack-module-hot-accept',
        }
      ],
      exclude: /node_modules/,
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader?{"modifyVars":{"primary-color":"' + primaryColor +
        '","heading-color":"' + headingColor +
        '","text-color":"' + textColor +
        '","text-color-secondary":"' + textColorSecondary +
        '"}}'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=compressed',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=1&name=res/[name].[hash:8].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }
  );

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css', {
      allChunks : true
    }),
    new webpack.DefinePlugin(project.globals),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template : defaultSettings.filePath.srcPath + '/index.html',
      hash     : false,
      favicon  : path.join(__dirname, '../res/images/favicon.ico'),
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    })
  );

} else {
  webpackConfig.entry.vendor = ['react', 'react-dom', 'jquery', 'babel-polyfill'];

  // webpackConfig.devtool = false;
  webpackConfig.devtool = 'source-map';   // 映射代码到其原始位置
  webpackConfig.cache = false;

  webpackConfig.module.rules.push(
    {
      test: /.jsx?$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=jsx',
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
          }, {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': primaryColor,
                // 'heading-color': headingColor,
                // 'text-color': textColor,
                // 'text-color-secondary': textColorSecondary,
              },
            },
          },
        ],
      }),
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
            },
          },
        ],
      }),
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'postcss-loader',
          }, {
            loader: 'css-loader',
          },
        ],
      })
    }, {
      test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
      use: 'url-loader?limit=1&name=res/[name].[hash].[ext]'
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }
  );

  webpackConfig.plugins.push(
    new HappyPack({
      id: 'jsx',
      loaders: [ 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&presets[]=stage-1' ],
      threads: 1,
    }),
    new ExtractTextPlugin({
        filename: '[name].[contenthash:8].bundle.css',
        allChunks: true,
    }),
    new webpack.DefinePlugin(project.globals),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.[hash].js",
      chunks: defaultSettings.chunks
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template : defaultSettings.filePath.srcPath + '/index.html',
      chunks: ['vendor', 'app'],
      favicon  : path.join(__dirname, '../res/images/favicon.ico'),
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),   // webpack 3.0, 作用域提升, 让打包出来的代码更小、运行的更快
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,     // 多进程压缩, 加速
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          reserved: ['$super', '$', 'exports', 'require']     // 不丑化
        },
        output: {
          comments: false,    // 不保留注释
        },
        compress: {
          warnings: false,
          drop_console: true,   // 丢弃console.*语句
          pure_funcs: ['console.log'],    // 丢弃conso.log语句前检测其是否会产生任何副作用（压缩将会更慢）
        },
        warnings: false,
      },
    })
  );
}

module.exports = webpackConfig;