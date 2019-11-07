var currencyConverter = require("ecb-exchange-rates");
var settings = {};
settings.fromCurrency = "GBP";
settings.toCurrency = "EUR";
settings.amount = 2;
settings.accuracy = 2;

currencyConverter.convert(settings, function(data) {
    console.log(JSON.stringify(data));
});