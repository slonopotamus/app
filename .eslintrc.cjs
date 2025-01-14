const paths = require("path");
const {FindWVCNodeModule} = require("web-vcore/Scripts/@CJS/ModuleFinder");

module.exports = {
	extends: [
		FindWVCNodeModule("eslint-config-vbase/index.js"),
	],
	rules: {
		"import/no-restricted-paths": [
			"error",
			{
				basePath: __dirname,
				zones: [
					//{target: paths.join(__dirname, "Packages/common"), from: "web-vcore"},
					//{target: "./Packages/common", from: "web-vcore"},
					{target: "./Packages/common", from: "./node_modules/web-vcore/", except: ["./nm"]},
				],
			},
		],
		//"no-tabs": "error",
	},
	globals: {},
};