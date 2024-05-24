//////////////////////////////////////////////////////////////////////////////////////////
const getSmsTaskPath = function (smstask) {
  const DRIVE = "M:";
  const taskPath = path.resolve(DRIVE, smstask);
  const jsPath = path.resolve(
    path.resolve(taskPath, "JS_V3"), "smartpass"
  );
  if (!fs.existsSync(jsPath)) {
    throw "JS path not found: " + jsPath;
  }
  return jsPath;
};
const envOptString = function (env, name) {
  var value = env ? env[name] : "";
  value = value || "";
  // ensure it is string
  return value.toString().trim();
};
//////////////////////////////////////////////////////////////////////////////////
const fs = require("fs");
const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function (env, argv) {
  console.log("process.NODE_ENV=" + process.NODE_ENV);
  //console.log(argv.mode);
  const SMS_TASK = envOptString(env, "sms_task");
  const entryProfile = envOptString(env, "entryProfile");
  const OUTPUT_PATH =
    SMS_TASK == "" ? path.resolve(__dirname, "dist") : getSmsTaskPath(SMS_TASK);
  const transpileOnly = argv.mode != "production";
  //const transpileOnly = false;

  console.log("sms_task        = " + SMS_TASK);
  console.log("output.path     = " + OUTPUT_PATH);
  console.log("transpileOnly   = " + transpileOnly);
  console.log("entryProfile    = " + entryProfile);

  let entry = {
  main: "./src/main.tsx",
	ajax: "./src/testajax.tsx",
	offerAndCollection: "./src/com/smartone/page/OfferAndCollection/Standalone.tsx",
	review: "./src/com/smartone/page/Review/Standalone.tsx",
	thankyou: "./src/com/smartone/page/ThankYou/Standalone.tsx",
	fulfillment: "./src/fulfillmentMain.tsx",
    vendor: ["react", "react-dom", "react-intl", "styled-components"],
  };
  if(entryProfile == "main") {
		entry = {
			"offer-build": "./src/main.tsx",
		};
	}
  if(entryProfile == "fulfillment") {
		entry = {
			"fulfill-build": "./src/fulfillmentMain.tsx"
		};
	}

  return {
    entry: entry,
    output: {
      path: OUTPUT_PATH,
    }, 
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            // transpileOnly:true => disable type checker, editor can handle type checker
            // this is to speed up development, do not do this for production build
            transpileOnly: transpileOnly,
          },
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
				{
						test: /\.css$/i,
						use: ['style-loader', 'css-loader', 'postcss-loader'],
				},
      ],
    },
    resolve: {
			plugins: [new TsconfigPathsPlugin()],
			modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            name: "vendor",
            test: "vendor",
            enforce: true,
          },
        },
      },
      runtimeChunk: false,
    },
  };
};
