import test from "ava";

test("Kilometers to Miles test", t => {
    const input = 1;
    const executedInput = require("../recipes/kilometers-to-miles").execute(input);
    const expectedResult = 0.621371;
    t.is(executedInput, expectedResult);
});