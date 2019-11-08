module.exports = {
    title: "Decode Base64",
    execute: input => {
        return Buffer.from(input, 'base64').toString('ascii')
    }
}