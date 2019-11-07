module.exports = {
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
}