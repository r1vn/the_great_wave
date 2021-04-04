'use strict'
const recent = require('./recent-articles')

module.exports = (siderightItems) =>
{
    return `

<div class="sideright">
    ${ recent(siderightItems) }
</div>

    `
}