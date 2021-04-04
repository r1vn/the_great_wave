'use strict'

module.exports = (entry) =>
{
    return `
    
    <div class="page textblock">
        ${ entry.html }
    </div>
    
    `
}