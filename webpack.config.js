const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", 
  entry: "./src/index.js", 
  output: {
    filename: "main.js", // Output bundle name
    path: path.resolve(__dirname, "dist"), 
    clean: true, 
  },
  devtool: "eval-source-map", 
  devServer: {
    static: "./dist", // Serve from the dist folder
    watchFiles: ["./src/template.html"], 
    open: true, 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", 
    }),
  ],
  module: {
    rules: [
      // CSS Loader
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], 
      },
      // HTML Loader
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // Image Asset Loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};