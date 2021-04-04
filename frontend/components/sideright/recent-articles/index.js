'use strict'

module.exports = (siderightItems) =>
{
    if (!siderightItems.items.length) return ''

    let output = ``
    output += `<div class="recent-articles">`
    siderightItems.items.forEach(item =>
    {
        output += `
        
        <a href="${ item.url }">
            <div>${ item.date }</div>
            <div>${ item.title }</div>
        </a>
        
        `
    })
    if (siderightItems.more) output += `<a class="recent-articles-more" href="${ siderightItems.more }">More</a>`
    output += `</div>`

    return output
}