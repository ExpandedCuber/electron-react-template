/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require("./webpack.rules");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  module: {
    rules: require("./webpack.rules"),
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
