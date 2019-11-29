module.exports = {
    title: "Decode JWT Token",
    execute: input => {
        var jwt = require('jsonwebtoken');

        var decoded = jwt.decode(input);
        // console.log(decoded.foo) 
        return decoded

        // return new Promise((resolve, reject) => {
        //     // TODO calculations with 'input'
        //     resolve(42);
        // });
    }
}