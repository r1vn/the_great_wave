'use strict'

module.exports = entry =>
{
    let output = '<div class="list_displays">'

    for (let i = 0; i < entry.items.length; i++)
    {
        output += `<a href="${ entry.items[i].url }" class="aimg"><img src="${ entry.items[i].url }square.jpg"></a>`
    }

    output += `
    
    <div class="prevnext">
        ${ entry.prev ? `<a href="${ entry.prev }" class="prev">&lt;</a>` : '<div class="prev invisible"></div>' }
        ${ entry.next ? `<a href="${ entry.next }" class="next">&gt;</a>` : '<div class="next invisible"></div>' }
    </div>
    
    `
    output += `</div>`
    return output
}