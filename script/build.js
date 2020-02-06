const package = require("./package.json");
const config = require("./webpack.config");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');



async function build() {
    try {
        const outputName = config.output.filename;
        console.time();
        console.log("Building...");

        // webpack
        console.log("Webpack...");
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

        // update version
        const v = package.version.split(".");
        v[2] = parseInt(v[2]) + 1;
        package.version = v.join(".");

        // add user script header
        console.log("Add userscript header...");
        const output = fs.readFileSync("../public/" + outputName);
        const code = 
`// ==UserScript==
// @name         DD Monitor Helper
// @namespace    ${package.repository}
// @version      ${package.version}
// @description  ${package.description}
// @author       ${package.author}
// @require      https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js
// @match        *://schedule.hololive.tv/simple
// @match        *://live.bilibili.com/*
// @match        *://localhost:8080/*
// @match        *://ddmonitor.github.io/*
// @grant        GM_xmlhttpRequest
// @connect      bilibili.com
// ==/UserScript==

`       + output.toString();
        
        
        fs.writeFileSync("../public/" + outputName, code);

        console.log("Update package.json...");
        fs.writeFileSync("./package.json", JSON.stringify(package, null, 2));

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

