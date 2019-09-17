const path 						      = require('path');
const HtmlWebpackPlugin 		= require('html-webpack-plugin');

module.exports = {
  
  entry: {
    main: './scripts/index'
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },

  module: {
  	rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
        }
      },
      
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: { attrs: [':data-src']}
        }
      },

      {
        test: /\.scss$/, 
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html')
    })
  ],

  devServer: {
  	publicPath: '/',
    historyApiFallback: true,
  },

  stats: { children: false },
  watch: true,
  watchOptions: { poll: true }
};