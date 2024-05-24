const config = require("./webpack.config.js");

module.exports = function (env, arg) {
  return config(env, arg);
};
