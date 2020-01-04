const package = require("./package.json");
const config = require("./webpack.config");
const webpack = require("webpack");
const fs = require("fs");
const chalk = require('chalk');

async function build() {
    try {
        console.time();
        console.log("Building...");
        config.mode = "production";
        await new Promise((resolve, reject) => {
            webpack(config).run((err, s) => {
                if (err) {
                    reject(err);
                }
                const status = s.toJson();
                if (s.hasWarnings()) {
                    console.warn(status.warnings.join("\n"))
                }
                if (s.hasErrors()) {
                    const status = s.toJson();
                    reject(new Error(status.errors.join("\n")));
                }
                console.log("\noutputs: ");
                console.log(status.assets.map(a => `${a.name}\t${(a.size / 1024).toFixed(3)}KB`).join("\n"))
                resolve();
            });
        });

        const output = fs.readFileSync("./dist/index.js");
        const code = 
`// ==UserScript==
// @name         DD Monitor Helper
// @namespace    http://tampermonkey.net/
// @version      ${package.version}
// @description  ${package.description}
// @author       ${package.author}
// @match        *://schedule.hololive.tv/simple
// @match        *://live.bilibili.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

`       + output.toString();
        fs.writeFileSync("./dist/index.js", code);

        console.log(chalk.green("Build SUCCESS"));
        console.timeEnd();
    } catch (error) {
        console.log(chalk.red("Build FAILED"));
        console.error(error);
        console.timeEnd();
        process.exit(-1);
    }
}

build();

