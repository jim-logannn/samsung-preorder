const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const apiMocker = require('mocker-api');

const handsetData = require("./data/static/handsetData.json");
const offerData = require("./data/static/offerData.json");
const storeData = require("./data/static/storeData.json");
const voucherData = require("./data/static/voucherData.json");
const orderData = require("./data/static/orderData.json");
const fulfillOrderData = require("./data/static/fulfillOrderData.json")
const caseInfoData = require("./data/static/caseInfoData.json")
const specialItemData = require("./data/static/specialItemData.json")

module.exports = function (env, arg) {
  return merge(common(env, arg), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
				apiMocker(devServer.app, path.resolve(__dirname, './mock/index.js'), {
					changeHost: true,
				})
				return middlewares
			},
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: process.env.PORT,
    },
    plugins: [
		// ajax
		new HtmlWebpackPlugin({
			filename: "ajax.html",
			template: path.resolve(__dirname, "./template/ajax.html"),
			chunks: ["ajax"],
		}),

      // hello react
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "./template/index.html"),
        chunks: ["main"],
      }),
			new HtmlWebpackPlugin({
        filename: "offerAndCollection.html",
        template: path.resolve(__dirname, "./template/offerAndCollection.html"),
        chunks: ["offerAndCollection"],
      }),
			new HtmlWebpackPlugin({
        filename: "review.html",
        template: path.resolve(__dirname, "./template/review.html"),
        chunks: ["review"],
      }),
			new HtmlWebpackPlugin({
        filename: "thankyou.html",
        template: path.resolve(__dirname, "./template/thankyou.html"),
        chunks: ["thankyou"],
      }),
			new HtmlWebpackPlugin({
        filename: "fulfillment.html",
        template: path.resolve(__dirname, "./template/fulfillment.html"),
        chunks: ["fulfillment"],
				templateParameters: {
					'handsetData': JSON.stringify(handsetData),
					'offerData': JSON.stringify(offerData),
					'storeData': JSON.stringify(storeData),
					'voucherData': JSON.stringify(voucherData),
					'orderData': JSON.stringify(orderData),
          'fulfillOrderData': JSON.stringify(fulfillOrderData),
          'caseInfoData': JSON.stringify(caseInfoData),
					'specialItemData': JSON.stringify(specialItemData)
				},
      })
    ],
  });
};
