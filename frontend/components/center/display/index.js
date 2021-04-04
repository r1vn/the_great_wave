'use strict'

module.exports = (entry) =>
{
    return `
    
    <div class="display">
    
        <div class="item">
            <a href="${ entry.url }original.jpg"><img src="${ entry.url }preview.jpg" alt="${ entry.title }"></a>
        </div>
        
        <div class="text textblock">
            ${ entry.html }
        </div>
    
        ${ prevnext(entry) }
        
    </div>
        
    `
}

function prevnext (entry)
{
    let html = `<div class="prevnext">`

    if (entry.prev)
    {
        html += `<a href="${ entry.prev.url }" class="prev"><img src="${ entry.prev.url }square.jpg" alt="${ entry.title }"></a>`
    }
    else
    {
        html += `<div class="prev invisible"></div>`
    }

    html += `<div class="divider"></div>`

    if (entry.next)
    {
        html += `<a href="${ entry.next.url }" class="next"><img src="${ entry.next.url }square.jpg" alt="${ entry.title }"></a>`
    }
    else
    {
        html += `<div class="next invisible"></div>`
    }

    html += `</div>`

    return html
}