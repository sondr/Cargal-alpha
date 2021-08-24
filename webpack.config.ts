//import ExtractTextPlugin from 'extract-text-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

let pkg = require('./package.json');
let year = new Date().getFullYear();

let copyright = `${pkg.name}.ts v${pkg.version}
Copyright (c) 2018-${year} ${pkg.author}
@license ${pkg.license}`;

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const demoDir = path.resolve(__dirname, 'demo');

function configure(env: any, args: any): webpack.Configuration {
  // let styleLoaders: webpack.Loader[] = [
  //   'css-loader?sourceMap&importLoaders=1',
  //   'postcss-loader?sourceMap',
  //   'sass-loader?sourceMap'
  // ];

  let isProduction = (args.mode === 'production');

  const cssRules = [
    {
      loader: 'css-loader',
      options: {
        esModule: false
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'autoprefixer',
            'cssnano'
          ]
        }
      }
    }
  ];
  
  const sassRules = [
    {
      loader: "sass-loader",
      options: {
        sassOptions: {
          includePaths: ['node_modules']
        }
      }
    }
  ];

  let config: webpack.Configuration = {
    entry: { 
      CarGal: [
        //'core-js',
        path.resolve(srcDir, 'index.ts')
      ],
      demo: path.resolve(demoDir, 'index.js')
  },
    output: {
      path: distDir,
      library: '[name]',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      filename: '[name].js'
      //filename: './[name].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.scss$/,
          use: isProduction ? 
          [{ loader: MiniCssExtractPlugin.loader }, ...cssRules, ...sassRules ] 
          : 
          ['style-loader', ...cssRules, ...sassRules]
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: 'file-loader?name=assets/[name]-[hash].[ext]'
        }
      ]
    },
    plugins: [
      <any>new webpack.BannerPlugin(copyright),
      new HtmlWebpackPlugin({
          inject: 'head',
          hash: true,
          template: 'demo/index.ejs',
          // favicon: 'assets/favicon.ico'
      }),
      ...when(isProduction, new MiniCssExtractPlugin({ // updated to match the naming conventions for the js files
        filename: isProduction ? '[name].[contenthash].bundle.css' : '[name].[hash].bundle.css',
        chunkFilename: isProduction ? '[name].[contenthash].chunk.css' : '[name].[hash].chunk.css'
      }), null)

    ]
  };

  // switch (args.mode) {
  //   case 'development':
  //       config.devtool = 'inline-source-map';
  //       break;

  //   case 'production':
  //       config.plugins!.push(<any>new ExtractTextPlugin('[name].css'));
  //       break;
  //}

  return config;
}

export default configure;