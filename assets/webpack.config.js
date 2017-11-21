'use strict'

// Modules
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const CopyWebpackPlugin = require("copy-webpack-plugin");
const VENDOR_LIBS = ['vue'];

// NEW
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionPlugin = require("compression-webpack-plugin");


function resolve(dir)
{
    return path.join(__dirname, dir)
}


module.exports = {
    entry:
    {
        app: './src/main.js'
        // vendor: VENDOR_LIBS
    },
    output:
    {
        path: path.resolve(__dirname, '../priv/static'),
        filename: 'js/[name].js',
        publicPath: './dist'
    },
    module:
    {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:
                {
                    loaders:
                    {}
                }
            },




            {
                test: /\.(scss|sass|css)$/,
                include: [
                    path.resolve(__dirname, "sass")
                ],

                use: ExtractTextPlugin.extract(         // extract to external file
                {
                    fallback: 'style-loader',           // inject CSS into page
                    use: [
                    {
                        loader: 'css-loader',           // translates CSS into CommonJS modules
                        options:
                        {
                            importLoaders: 1
                        }
                    },


                    {
                        loader: 'postcss-loader',       // run postcss actions
                        options:
                        {
                            plugins: function()
                            {
                                return [

                                    require('postcss-import'), 
                                    require('postcss-cssnext'), 
                                    require('precss'),
                                    require('postcss-sorting')({
                                        order: [ 
                                            "custom-properties"
                                            // "dollar-variables",
                                            // "declarations",
                                            // "rules",                                      
                                            // "at-rules"
                                          
                                          ],

                                        "properties-order": [
                                            "alphabetical"
                                        ]
                                    }),
                                    require('uncss').postcssPlugin({

                                        html: [ 
                                            'http://localhost:4000' 
                                        ],

                                        ignore: [
                                        /nav/,
                                        /navbar/, 
                                        /media/,
                                        /dropdown/,
                                        /collapse/,
                                        /collapsing/, 
                                        /Toggle/,
                                        /click/, 
                                        /hover/,
                                        /card/,
                                        /card-body/,
                                        /carousel/,
                                        '.hidden-xs',
                                        '.fade' 
                                        ],
                                        media: [
                                        '(min-width: 576px)',
                                        '(min-width: 768px)',
                                        '(min-width: 992px)',
                                        '(min-width: 1200px)'
                                        ],
                                        //timeout: 500,
                                        report: true

                                    }),


                                    require('cssnano')({            // CSS Minifier
                                        preset: ['default', {
                                            discardComments: {
                                                removeAll: true
                                            },
                                        }]
                                    })

                                ];
                            }
                        }
                    },


                    {
                        loader: 'sass-loader'           // compiles SASS to CSS
                    }]
                })
            },





            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                use: [
                {
                    loader: 'url-loader',
                    options:
                    {
                        limit: 10000
                    }
                }, 'image-webpack-loader']
            }
        ]
    },
    plugins: [

        // CSS extraction
        // Find files transformed by loader, then save to external file style.css
        new ExtractTextPlugin(
        {
            filename: 'css/app.css',
            allChunks: true
        }),

        // Code-splitting
        // Create a separate file (known as a chunk), consisting of common modules shared between multiple entry points. 
        new webpack.optimize.CommonsChunkPlugin(
        {
            names: ['vendor']
        }),
        new webpack.ProvidePlugin(
        {   
            // inject ES5 modules as global vars
            $: ['jquery/dist/jquery.slim.min.js'],
            jQuery: ['jquery/dist/jquery.slim.min.js'],
            JQuery: ['jquery/dist/jquery.slim.min.js'],
            Popper: ['popper.js/dist/umd/popper.min.js']
        }),
        new CopyWebpackPlugin([
        {
            from: "./static"
        }]),




        // turn this off before running the production version
        // , new BundleAnalyzerPlugin()

        
    ],
    resolve:
    {
        extensions: ['.js', '.vue', '.json', '.css', '.scss', '.styl'],
        alias:
        {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'Popper': 'popper.js',
            'jquery': 'jquery',
            '$': 'jquery'
        }
    }
};



if (process.env.NODE_ENV === 'production')
{
    module.exports.plugins.push(

        // html-critical-webpack-plugin is an ES6 aware minifier from Babel
        new MinifyPlugin({
            booleans: true,
            builtIns: true,
            consecutiveAdds: true,
            deadcode: true,
            evaluate: true,
            flipComparisons: true,
            guards: true,
            infinity: true,
            memberExpressions: true,
            numericLiterals: true,
            propertyLiterals: true,
            removeConsole: true,
            removeDebugger: true,
            simplify: true
         }),


        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0
        })


    )
};

