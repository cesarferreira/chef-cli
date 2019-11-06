#!/usr/bin/env node

"use strict";

const Chalk = require("chalk");
const Utils = require("./utils/utils");
const log = console.log;
const inquirer = require("inquirer");
const fuzzy = require("fuzzy");
const shell = require("shelljs");
const fs = require("fs");
var prompt = require("prompt");

const chef = require("cyberchef");
// setInterval(function() {}, 1000);
// import chef from "cyberchef";

function fuzzySearch(list, textToFind) {
    textToFind = textToFind || "";

    return new Promise(resolve => {
        var fuzzyResult = fuzzy.filter(textToFind, list);
        resolve(fuzzyResult.map(el => el.original));
    });
}

function getAppList() {
    // TODO could have a list of files that we REQUIRE and all have the same thing: EXECUTE(input)

    // result.push('finder')
    return ["To Base64", "From Base64", "To HEX", "From Hex"];
}

function showList(appList) {
    inquirer.registerPrompt(
        "autocomplete",
        require("inquirer-autocomplete-prompt")
    );
    inquirer
        .prompt({
            type: "autocomplete",
            name: "app",
            pageSize: 10,
            message: "Which operation",
            source: (answersSoFar, input) => {
                return fuzzySearch(appList, input);
            }
        })
        .then(answer => {
            inquirer
                .prompt([{
                    name: "data",
                    message: "source",
                    default: "Hello world!"
                }])
                .then(answers => {
                    console.info("Answers:", answers);
                    log(`from: ${answers.data} is ${chef.toBase64(answers.data)}`);
                });
        });
}

// Main code //
const self = (module.exports = {
    init: (input, flags) => {
        const appList = getAppList();
        showList(appList);
    }
});