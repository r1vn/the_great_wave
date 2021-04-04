'use strict'

module.exports = (entry) =>
{
    return `
    
    <div class="article">
    
        <div class="textblock">
            ${ entry.html }
        </div>
        
        <div class="prevnext">
            ${ entry.prev ?
               `<a href="${ entry.prev.url }" class="prev">
                    <div>${ entry.prev.date }</div>
                    <div>${ entry.prev.title }</div>
                </a>` : '<div class="prev invisible"></div>' }
            ${ entry.next ?
               `<a href="${ entry.next.url }" class="next">
                    <div>${ entry.next.date }</div>
                    <div>${ entry.next.title }</div>
                </a>` : '<div class="next invisible"></div>' }
        </div>
    </div>
    
    `
}