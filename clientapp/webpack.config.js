var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".ts"]
  },
  entry: {
    polyfills: "./deps/polyfills.ts",
    main: "./app/main.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"), // output directory
    filename: "[name].js" // name of the generated bundle
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.ts$/,
        loader: ["awesome-typescript-loader", "angular2-template-loader"]
      },
      {
        test: /\.ts$/,
        enforce: "pre",
        loader: "tslint-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.scss$/,
        loader: ["raw-loader", "sass-loader?sourceMap"]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body"
    }),

    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.resolve(__dirname, "src"),
      {}
    ),
    new FilterWarningsPlugin({
      exclude: /System.import/
    })
  ],
  devtool: "source-map",
  devServer: {
    historyApiFallback: true
  }
};
