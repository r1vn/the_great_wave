'use strict'

module.exports = (sideleftItems) =>
{
    if (!sideleftItems.items.length) return ``
    let output = ``
    output += `<div class="recent-displays">`

    for (const item of sideleftItems.items)
    {
        output += `
        
        <a class="recent-displays-link" href="${ item.url }">
            <img class="recent-displays-img" src="${ item.url }square.jpg" alt="${ item.title }">
            <div class="recent-displays-overlay">${ item.title}</div>
        </a>
        
        `
    }

    if (sideleftItems.more) output += `<a class="recent-displays-more" href="${ sideleftItems.more }">More</a>`
    output += `</div>`
    return output
}