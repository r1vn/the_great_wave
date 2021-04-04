'use strict'

/* xdFileWrite 2020-08-26 14.47 */
const fs = require('fs');
function xdFileWrite(path, data) {
    if (process.platform === 'win32')
        path = path.replace(/\\/g, '/');
    path = path.replace(/\/$/, '');
    const dir = path.slice(0, path.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    else if (!fs.statSync(dir).isDirectory()) {
        throw new Error(`failed to write file "${path}": "${dir}" is not a directory`);
    }
    fs.writeFileSync(path, data);
}

module.exports = function write ()
{
    const root = process.cwd().replace(/\\/g, '/')
    const entries = require(`${ root }/tmp/entries.json`)

    const urls = {}

    for (const entry of entries)
    {
        console.log(entry.url)
        // output/index.html has an empty url. this is fine
        if (entry.url !== '' && (entry.url.startsWith('/') || !entry.url.endsWith('/'))) throw `bad URL`
        if (urls[entry.url]) throw `duplicate URL`
        urls[entry.url] = true
        if (!entry.output) throw `entry doesn't have output`
    }

    for (const entry of entries)
    {
        const outputPathAbs = `${ root }/output/${ entry.url }/index.html`
        xdFileWrite(outputPathAbs, entry.output)
    }

    console.log(`${ entries.length } entries`)
    fs.writeFileSync(`${ root }/tmp/entries.json`, JSON.stringify(entries, null, 4))
}