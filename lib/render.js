'use strict'

const fs = require('fs')

module.exports = function ()
{
    const root = process.cwd().replace(/\\/g, '/')
    const entries = require(`${ root }/tmp/entries.json`)

    console.log('rendering...')

    const frontend = require(`${ root }/frontend`)

    for (const entry of entries)
    {
        entry.output = frontend(entry)
    }

    console.log(`rendered ${ entries.length } entries`)

    fs.writeFileSync(`${ root }/tmp/entries.json`, JSON.stringify(entries, null, 4))
}