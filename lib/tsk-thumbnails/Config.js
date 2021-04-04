'use strict'

module.exports = class Config
{
    sourceDir
    whitelist
    blacklist
    height
    width
    dstPathFn
    overwrite

    constructor (opts)
    {
        for (const key in this)
        {
            if (!opts.hasOwnProperty(key))
            {
                throw `missing property: '${ key }'`
            }
        }

        for (const key in opts)
        {
            if (!this.hasOwnProperty(key))
            {
                throw `unknown property: '${ key }'`
            }

            this[key] = opts[key]
        }

        // sourceDir

        for (const prop of ['sourceDir'])
        {
            if (typeof this[prop] !== 'string')
            {
                throw `config.${ prop }: must be a string`
            }

            if (process.platform === 'win32') this[prop] = this[prop].replace(/\\/g, '/')
            this[prop] = this[prop].replace(/^\//, '').replace(/\/$/, '')
        }

        // whitelist / blacklist

        for (const list of [this.whitelist, this.blacklist])
        {
            if (!(list instanceof Array))
            {
                throw `'whitelist' and 'blacklist' must be arrays of regular expressions`
            }

            for (const el of list)
            {
                if (!(el instanceof RegExp))
                {
                    throw `'whitelist' and 'blacklist' must be arrays of regular expressions`
                }
            }
        }

        // height/width

        for (const dim of [this.height, this.width])
        {
            if (dim !== undefined && (!Number.isInteger(dim) || dim < 1))
            {
                throw `'height' and 'width' must be integers > 0`
            }
        }

        if (!this.height && !this.width)
        {
            throw `'height' and 'width' can't both be undefined`
        }

        // dstPathFn

        if (typeof this.dstPathFn !== 'function')
        {
            throw `'dstPathFn' must be a function`
        }

        // overwrite

        if (typeof this.overwrite !== 'boolean')
        {
            throw `'overwrite' must be a boolean`
        }
    }
}