const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = function (env, arg) {
  const requireBundleAnalyzerPlugin = !(
    env &&
    env.bundleAnalyzer &&
    env.bundleAnalyzer == "false"
  );
  const plugins = [];
  if (requireBundleAnalyzerPlugin) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
      },
    })
  );

  return merge(common(env, arg), {
    mode: "production",
    plugins: plugins,
  });
};
