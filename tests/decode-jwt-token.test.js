import test from "ava";

test("Decode JWT Token test", t => {
    const input = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const executedInput = require("../recipes/decode-jwt-token.js").execute(input);
    const expectedResult = {
        "sub": "1234567890",
        "name": "John Doe",
        "iat": 1516239022
    };

    t.deepEqual(executedInput, expectedResult);
});