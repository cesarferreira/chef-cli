#!/usr/bin/env node

"use strict";

const Chalk = require("chalk");
const log = console.log;
const fs = require("fs");

Array.prototype.subarray = function(start, end) {
    if (!end) {
        end = -1;
    }
    return this.slice(start, this.length + 1 - end * -1);
};

// Main code //
const self = (module.exports = {
    isEmpty: obj => {
        return Object.keys(obj).length === 0;
    },
    title: text => {
        log(``);
        log(Chalk.blue("==>") + Chalk.bold(` ${text}`));
    },
    titleError: text => {
        log(Chalk.red("==>") + Chalk.bold(` ${text}`));
    },
    fuzzySearch: (list, textToFind) => {
        textToFind = textToFind || "";

        return new Promise(resolve => {
            const fuzzy = require("fuzzy");
            var fuzzyResult = fuzzy.filter(textToFind, list);
            resolve(fuzzyResult.map(el => el.original));
        });
    },

    getRecipeFileList: path => {
        return fs
            .readdirSync(path)
            .filter(file => fs.statSync(path + "/" + file).isFile());
    },

    saveToFile: (content, filePath) => {
        fs.writeFileSync(filePath, content, "utf-8");
    },
    readFile: filePath => {
        return fs.readFileSync(filePath, "utf-8");
    }
});