#!/usr/bin/env node

"use strict";

const Chalk = require("chalk");
const Utils = require("./utils/utils");
const log = console.log;
const inquirer = require("inquirer");
const lodash = require("lodash");
const fs = require("fs");

const recipeFolder = `${__dirname}/../recipes/`;
const recipeList = Utils.getRecipeFileList(recipeFolder).map(r => require(`${recipeFolder}/${r}`));

// Main code //
const self = (module.exports = {
    init: async(input, flags) => {
        const first = input[0];
        const params = input.subarray(1, input.length);

        switch (first.toLowerCase()) {
            case "create":
            case "new":
                handleCreate(params);
                break;

            default:
                showRecipeList(recipeList.map(x => x.title));
        }
    }
});


function handleCreate(params) {
    if (params.length > 1) {
        Utils.titleError(`Only 1 parameter allowed, example:\n create "Pound to Euro"`);
    } else {

        const source = `module.exports = {
    title: "{{title}}",
    execute: input => {
        return new Promise((resolve, reject) => {
            // TODO calculations with 'input'
            resolve(42);
        });
    }
}`;

        const Handlebars = require('handlebars');
        const fileName = params[0].toLowerCase().split(" ").join("-") + ".js";
        const filePath = recipeFolder + fileName

        const template = Handlebars.compile(source);

        fs.writeFile(filePath, template({ title: params[0] }), err => {
            if (err) {
                return console.error(`Failed to create file: ${err.message}.`);
            }
            log(`\nCreated ${Chalk.green(fileName)} @ ${recipeFolder}`);
        });
    }
}

async function showRecipeList(recipes) {
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
            source: (answersSoFar, input) => Utils.fuzzySearch(recipes, input)
        })
        .then(answer => {
            inquirer
                .prompt([{
                    name: "input",
                    message: "Input"
                }])
                .then(answers => {
                    const input = answers.input;
                    const option = answer.selectedOption;

                    (async() => {
                        var recipe = lodash.filter(recipeList, x => x.title === option)[0];

                        let result = await recipe.execute(input);
                        log(`\
                                                    n$ { Chalk.bold(input) }
                                                    $ { Chalk.green.bold(recipe.title) }
                                                    is $ { Chalk.bold(result) }
                                                    `);
                    })();
                });
        });
}