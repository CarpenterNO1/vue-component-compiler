'use strict'

const ora = require('ora')
const webpack = require('webpack')
const webpackConfig = require('./webpack.conf')
const spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, (err) => {
    spinner.stop()
    if (err) throw err
    console.log('  Build complete.\n')
})