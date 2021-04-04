'use strict' // 2021-02-10 14.23

const fs = require('fs')
const xdDirScan = require('./util/xdDirScan')
const xdFileWrite = require('./util/xdFileWrite')
const xdStringFilter = require('./util/xdStringFilter')
const Config = require('./Config')

module.exports = function tsk_minify (cfg)
{
    const config = new Config(cfg)
    if (process.argv.includes('-debug')) console.log(config)

    const cwd = process.platform === 'win32' ? process.cwd().replace(/\\/g, '/') : process.cwd()

    //

    let beep = 0 // yes

    for (const type of ['js', 'css', 'html'])
    {
        if (!config[type].enabled) continue
        if (beep++) console.log()

        const paths = xdDirScan(`${ cwd }/${ config[type].dir }`, 'files')
            .map(path => `${ config[type].dir }/${ path }`)
            .filter(path => xdStringFilter(path, { whitelist: config[type].whitelist, blacklist: config[type].blacklist }))

        if (!paths.length)
        {
            console.log(`${ paths.length } ${ type.toUpperCase() } ${ paths.length === 1 ? 'file' : 'files' }`)
            continue
        }

        //

        let fn
        if (type === 'js')
        {
            const minjs = require('babel-minify')
            fn = src => minjs(src, config.js.opts).code
        }
        else if (type === 'css')
        {
            const mincss = require('clean-css')
            const minifier = new mincss(config.css.opts)
            fn = src => minifier.minify(src).styles
        }
        else
        {
            const minhtml = require('html-minifier').minify
            fn = src => minhtml(src, config.html.opts)
        }

        //

        for (const relpath of paths)
        {
            console.log(relpath)
            const abspath = `${ cwd }/${ relpath }`
            const src = fs.readFileSync(abspath, 'utf8')
            const min = fn(src)
            xdFileWrite(abspath, min)
        }

        console.log(`${ paths.length } ${ type.toUpperCase() } ${ paths.length === 1 ? 'file' : 'files' }`)
    }
}