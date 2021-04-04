'use strict'

const article = require('./article')
const display = require('./display')
const page = require('./page')
const list_articles = require('./list_articles')
const list_displays = require('./list_displays')

const entryTypeViews = { article, display, page, list_articles, list_displays }

module.exports = (entry) =>
{
    if (!entryTypeViews[entry.type])
    {
        throw new Error(`can't render center - unknown entry type ${ entry.type } in ${ entry.id }`)
    }

    return `\
    
    <div class="center">
        ${ entryTypeViews[entry.type](entry) }
    </div>
    
    `
}