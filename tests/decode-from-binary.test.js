import test from "ava";

test("Encode to binary test", t => {
    const input = "01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100";
    const executedInput = require("../recipes/decode-binary").execute(input);
    const expectedResult = "Hello World";
    t.is(executedInput, expectedResult);
});