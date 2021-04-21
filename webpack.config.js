const Dotenv = require('dotenv-webpack');
var TSLintPlugin = require('tslint-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
var argv = require('yargs').argv;

var debug = argv.debug !== undefined;
const lint = argv["linting"];

var config = [
   {
      entry: {
         server: [
            __dirname + '/src/server.ts'
         ],
     },
     mode: debug ? 'development' : 'production',
     output: {
         path: __dirname + '/dist',
         filename: '[name].js',
         devtoolModuleFilenameTemplate: debug ? '[absolute-resource-path]' : '[]'
     },
     externals: [nodeExternals()],
     devtool: 'source-map',
     resolve: {
         extensions: [".ts", ".tsx", ".js"],
         alias: {}
     },
     target: 'node',
     node: {
         __dirname: false,
         __filename: false,
     },
     module: {
         rules: [{
             test: /\.tsx?$/,
             exclude: [/lib/, /dist/],
             loader: "ts-loader"
         }]
     },
     plugins: []
      // entry: {
      //    server: [
      //       __dirname + '/src/server.ts'
      //   ],
      // },
      // output: {
      //    path: __dirname + '/dist',
      //    publicPath: '/',
      //    filename: 'bundle.js'
      // },
      // devServer: {
      //    contentBase: './dist',
      // },
      // module: {
      //    rules: [
      //       {
      //          test: /\.(ts|tsx)$/,
      //          exclude: /node_modules/,
      //          loader: "ts-loader"
      //       }
      //    ]
      // },
      // plugins: [],
   },
   {
      entry: {
         client: [
             // __dirname + '/src/app/scripts/client.ts'
             __dirname + '/src/app.ts'
         ]
     },
     mode: debug ? 'development' : 'production',
     output: {
         path: __dirname + '/dist/web/scripts',
         filename: '[name].js',
         libraryTarget: 'umd',
         publicPath: '/scripts/'
     },
     externals: {},
     devtool: 'source-map',
     resolve: {
         extensions: [".ts", ".tsx", ".js"],
         alias: {}
     },
     target: 'web',
     module: {
         rules: [{
                 test: /\.tsx?$/,
                 exclude: [/lib/, /dist/],
                 loader: "ts-loader",
                 options: {
                     configFile: "tsconfig-client.json"
                 }
             },
             {
                 test: /\.(eot|svg|ttf|woff|woff2)$/,
                 // loader: 'file-loader?name=public/fonts/[name].[ext]'
                 loader: 'file-loader',
                 options: {
                     name: "[name].[ext]",
                     public: "./fonts/",
                     outputPath: "../fonts"
                 }
             },
             {
                 test: /\.css$/,
                 use: [
                   'style-loader',
                   'css-loader'
                 ]
             }    
         ]
     },
     plugins: [
         new Dotenv({
             systemvars: true
         })
     ],
     performance: {
         maxEntrypointSize: 400000,
         maxAssetSize: 400000,
         assetFilter: function(assetFilename) {
             return assetFilename.endsWith('.js');
         }
     }
   //    entry: {
   //       client: [
   //           // __dirname + '/src/app/scripts/client.ts'
   //           __dirname + '/src/app.ts'
   //       ]
   //   },
   //    output: {
   //       path: __dirname + '/dist',
   //       publicPath: '/',
   //       filename: 'bundle.js'
   //    },
   //    devServer: {
   //       contentBase: './dist',
   //    },
   //    module: {
   //       rules: [
   //          {
   //             test: /\.(ts|tsx)$/,
   //             exclude: /node_modules/,
   //             loader: "ts-loader"
   //          }
   //       ]
   //    },
   //    plugins: [],
   }
];

if (lint !== false) {
   config[0].plugins.push(new TSLintPlugin({
       files: ['./src/*.ts']
   }));
   config[1].plugins.push(new TSLintPlugin({
       // files: ['./src/app/scripts/**/*.ts', './src/app/scripts/**/*.tsx']
       files: ['./src/**/*.ts', './src/**/*.tsx']
   }));
}

module.exports = config;