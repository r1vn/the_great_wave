'use strict'
const featured = require('./recent-displays')

module.exports = (sideleftItems) =>
{
    return `

<div class="sideleft">
    ${ featured(sideleftItems) }    
</div>

    `
}