#!/usr/bin/env node

"use strict";

const Chalk = require("chalk");
const Utils = require("./utils/utils");
const log = console.log;
const inquirer = require("inquirer");
const fuzzy = require("fuzzy");
const lodash = require("lodash");
const fs = require('fs')

const recipeFolder = `${__dirname}/recipes/`
const recipeList = getRecipeFileList(recipeFolder).map(r => require(`${recipeFolder}/${r}`))


// Main code //
const self = (module.exports = {
    init: async(input, flags) => {
        showRecipeList(recipeList.map(x => x.title));
    }
});

function fuzzySearch(list, textToFind) {
    textToFind = textToFind || "";

    return new Promise(resolve => {
        var fuzzyResult = fuzzy.filter(textToFind, list);
        resolve(fuzzyResult.map(el => el.original));
    });
}

function getRecipeFileList(path) {
    return fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path + '/' + file).isFile();
    });
}

async function showRecipeList(recipes) {
    inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));
    inquirer.prompt({
        type: "autocomplete",
        name: "selectedOption",
        pageSize: 10,
        message: "Which operation",
        source: (answersSoFar, input) => {
            return fuzzySearch(recipes, input);
        }
    }).then(answer => {
        inquirer
            .prompt([{
                name: "input",
                message: "Input"
            }])
            .then(answers => {
                handle(answers.input, answer.selectedOption);
            });
    });
}

async function handle(input, option) {
    var picked = lodash.filter(recipeList, x => x.title === option)[0];

    let result = await picked.execute(input);

    log(`\n${Chalk.bold(input)} ${Chalk.green.bold(picked.title)} is ${Chalk.bold(result)}`);
}