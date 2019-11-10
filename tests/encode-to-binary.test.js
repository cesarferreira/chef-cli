import test from "ava";

test("Encode to binary test", t => {
    const input = "Hello World";
    const executedInput = require("../recipes/encode-to-binary").execute(input);
    const expectedResult = "01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100";
    t.is(executedInput, expectedResult);
});