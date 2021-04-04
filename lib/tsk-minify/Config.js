'use strict'

module.exports = class Config
{
    js
    css
    html

    constructor (opts)
    {
        for (const key in this)
        {
            if (!opts.hasOwnProperty(key))
            {
                throw `missing property: ${ key }`
            }
        }

        for (const key in opts)
        {
            if (!this.hasOwnProperty(key))
            {
                throw `unknown property: ${ key }`
            }

            this[key] = opts[key]
        }

        // js/css/html

        for (const key of ['js', 'css', 'html'])
        {
            const prop = this[key]

            // enabled

            if (typeof prop.enabled !== 'boolean')
            {
                throw `config.${ key }.enabled must be a boolean`
            }

            if (!prop.enabled) continue

            // dir

            if (typeof prop.dir !== 'string')
            {
                throw `config.${ key }.dir: must be a string`
            }

            if (process.platform === 'win32') prop.dir = prop.dir.replace(/\\/g, '/')
            prop.dir = prop.dir.replace(/^\//, '').replace(/\/$/, '')

            // whitelist/blacklist

            for (const list of [prop.whitelist, prop.blacklist])
            {
                if (!(list instanceof Array))
                {
                    throw `'whitelist' and 'blacklist' in config.${ key } must be arrays of regular expressions`
                }

                for (const el of list)
                {
                    if (!(el instanceof RegExp))
                    {
                        throw `'whitelist' and 'blacklist' in config.${ key } must be arrays of regular expressions`
                    }
                }
            }

            // opts

            if (!prop.opts || prop.opts.constructor !== Object)
            {
                throw `config.${ key }.opts must be an object`
            }
        }
    }
}