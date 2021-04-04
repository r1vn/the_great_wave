'use strict'

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { xdDirScan } = require('./util/xdDirScan')
const { xdFileWrite } = require('./util/xdFileWrite')
const { xdStringFilter } = require('./util/xdStringFilter')
const Config = require('./Config')

module.exports = async function tskThumbnails (cfg)
{
    const config = new Config(cfg)
    if (process.argv.includes('-debug')) console.log(config)

    const cwd = process.platform === 'win32' ? process.cwd().replace(/\\/g, '/') : process.cwd()

    //

    const paths = xdDirScan(`${ cwd }/${ config.sourceDir }`, 'files')
        .map(path => `${ config.sourceDir }/${ path }`)
        .filter(path => xdStringFilter(path, { whitelist: config.whitelist, blacklist: config.blacklist }))

    let count = 0
    let skipped = 0
    const dsts = []

    for (const relpathSrc of paths)
    {
        const ppath = path.posix.parse(relpathSrc)
        const dir   = ppath.dir
        const name  = ppath.name
        const ext   = ppath.ext.replace(/^\.+/, '')
        const relpathDst = config.dstPathFn(dir, name, ext)
        console.log(`src: ${ relpathSrc }\ndst: ${ relpathDst }`)
        if (dsts.includes(relpathSrc)) throw `duplicate destination path`
        dsts.push(relpathSrc)

        const abspathSrc = `${ cwd }/${ relpathSrc }`
        const abspathDst = `${ cwd }/${ relpathDst }`

        if (config.overwrite || !fs.existsSync(abspathDst))
        {
            const input = fs.readFileSync(abspathSrc)

            try
            {
                await sharp(input)
                .resize(
                    {
                        width:  config.width,
                        height: config.height
                    })
                .toBuffer()
                .then(data => xdFileWrite(abspathDst, data))
            }
            catch (err)
            {
                throw `failed: ${ err.message || err }`
            }

            count++
        }
        else
        {
            console.log('skipped (exists)')
            skipped++
        }
    }
}