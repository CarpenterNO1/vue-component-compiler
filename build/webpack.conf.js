const path = require('path')
module.exports = {
    entry: [
        './server.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
}