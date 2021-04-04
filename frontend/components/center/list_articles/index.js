'use strict'

module.exports = entry =>
{
    let output = '<div class="list_articles"><div class="list">'

    for (let i = 0; i < entry.items.length; i++)
    {
        output += `
        <a href="${ entry.items[i].url }" class="alink">
            <div class="title">${ entry.items[i].title }</div>
            <div class="date">${ entry.items[i].date }</div>
        </a>`
    }

    output += `
    </div>
    <div class="prevnext">
        ${ entry.prev ?
           `<a href="${ entry.prev }" class="prev">&lt;</a>` : `<a href="blog" class="prev" style="visibility: hidden;">&lt;</a>` }
        ${ entry.next ?
           `<a href="${ entry.next }" class="next">&gt;</a>` : `<a href="blog" class="next" style="visibility: hidden;">&gt;</a>` }
    </div>
    
    `

    output += `</div>`
    return output
}