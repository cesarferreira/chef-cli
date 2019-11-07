#!/usr/bin/env node

"use strict";

const Chalk = require("chalk");
const Utils = require("./utils/utils");
const log = console.log;
const inquirer = require("inquirer");
const fuzzy = require("fuzzy");
const lodash = require("lodash");

const list = getList();

function fuzzySearch(list, textToFind) {
    textToFind = textToFind || "";

    return new Promise(resolve => {
        var fuzzyResult = fuzzy.filter(textToFind, list);
        resolve(fuzzyResult.map(el => el.original));
    });
}

async function showList(appList) {
    inquirer.registerPrompt(
        "autocomplete",
        require("inquirer-autocomplete-prompt")
    );
    inquirer
        .prompt({
            type: "autocomplete",
            name: "selectedOption",
            pageSize: 10,
            message: "Which operation",
            source: (answersSoFar, input) => {
                return fuzzySearch(appList, input);
            }
        })
        .then(answer => {
            inquirer
                .prompt([{
                    name: "input",
                    message: "input"
                }])
                .then(answers => {
                    handle(answers.input, answer.selectedOption)
                });
        });
}

async function handle(input, option) {
    var picked = lodash.filter(list, x => x.title === option)[0];

    let result = await picked.execute(input);

    log(`\n${Chalk.bold(input)} ${Chalk.green.bold(picked.title)} is ${Chalk.bold(result)}`);

}

function getList() {
    // TODO could have a list of files that we REQUIRE and all have the same thing: EXECUTE(input)

    // result.push('finder')
    // return [{title:"To Base64"}, "From Base64", "To HEX", "From Hex", "Pound to Euro"];
    return [{
        title: "Pound to Euro",
        execute: input => {
            var currencyConverter = require("ecb-exchange-rates");
            var settings = {};
            settings.fromCurrency = "GBP";
            settings.toCurrency = "EUR";
            settings.amount = input;
            settings.accuracy = 1;

            return new Promise((resolve, reject) => {
                currencyConverter.convert(settings, data => {
                    resolve(data.amount);
                });
            });
        }
    }];
}

// Main code //
const self = (module.exports = {
    init: async(input, flags) => {
        const appList = list.map(x => x.title);
        showList(appList);
    }
});