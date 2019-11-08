module.exports = {
    title: "Encode Base64",
    execute: input => {
        return Buffer.from(input).toString('base64');
    }
}