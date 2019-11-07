#!/usr/bin/env node

"use strict";

const Chalk = require("chalk");
const Utils = require("./utils/utils");
const log = console.log;
const inquirer = require("inquirer");
const lodash = require("lodash");
const fs = require('fs');

const recipeFolder = `${__dirname}/../recipes/`
const recipeList = Utils.getRecipeFileList(recipeFolder).map(r => require(`${recipeFolder}/${r}`))

// Main code //
const self = (module.exports = {
    init: async(input, flags) => {
        showRecipeList(recipeList.map(x => x.title));
    }
});

async function showRecipeList(recipes) {
    inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));
    inquirer.prompt({
        type: "autocomplete",
        name: "selectedOption",
        pageSize: 10,
        message: "Which operation",
        source: (answersSoFar, input) => Utils.fuzzySearch(recipes, input)
    }).then(answer => {
        inquirer.prompt([{
                name: "input",
                message: "Input"
            }])
            .then(answers => {
                const input = answers.input;
                const option = answer.selectedOption;

                (async() => {
                    var recipe = lodash.filter(recipeList, x => x.title === option)[0];

                    let result = await recipe.execute(input);
                    log(`\n${Chalk.bold(input)} ${Chalk.green.bold(recipe.title)} is ${Chalk.bold(result)}`);
                })()
            });
    });
}