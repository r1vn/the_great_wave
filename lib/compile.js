'use strict'

const fs = require('fs')

module.exports = function ()
{
    const root = process.cwd().replace(/\\/g, '/')
    const entries = require(`${ root }/tmp/entries.json`)

    // general preparation

    const displays = []
    const articles = []

    for (const entry of entries)
    {
        entry.url = entry.path
            .replace(/\.md$/i, '.html')
            .replace(/\.source\.html$/i, '.html')
            .replace(`source/`, '')
            .replace(/index\.html/, '')
        console.log(entry.url)

        if (entry.url.startsWith('gallery/'))
        {
            entry.type = `display`
            displays.push(entry)
        }
        else if (entry.url.startsWith('blog/'))
        {
            entry.type = 'article'
            articles.push(entry)
        }
        else
        {
            entry.type = `page`
        }

        if (!entry.title)
        {
            const match = entry.html.match(/<h1.*>(.*)<\/h1>/i)

            if (match)
            {
                entry.title = match[1]
            }
            else
            {
                throw `entry has no title: ${ entry.path }`
            }
        }
    }

    // validation

    for (const entry of displays)
    {
        if (!entry.title) throw `missing title in ${ entry.path }`
        if (!entry.date)  throw `missing date in ${ entry.path }`
        const time = new Date(entry.date).getTime()
        if (!time) throw `unparseable date in ${ entry.path }`
        entry.time = time

        const dir = entry.path.slice(0, entry.path.lastIndexOf('/'))
        if (!fs.existsSync(`${ dir }/original.jpg`)) throw `missing ${ dir }/original.jpg`
    }

    for (const entry of articles)
    {
        if (!entry.title) throw `missing title in ${ entry.path }`
        if (!entry.date)  throw `missing date in ${ entry.path }`
        const time = new Date(entry.date).getTime()
        if (!time) throw `unparseable date in ${ entry.path }`
        entry.time = time
    }

    //// generating pagination

    // gallery

    displays.sort((a, b) => b.time - a.time)
    const displaysEPP = 6
    const displaysPagecount = Math.ceil(displays.length / displaysEPP)

    for (let page = 0; page < displaysPagecount; page++)
    {
        let url, type, title, prev, next, items = []

        type = 'list_displays'
        title = 'gallery'
        url   = `gallery/${ page }/`

        if (page === 0)
        {
            prev = null
        }
        else if (page === 1)
        {
            prev = 'gallery/'
        }
        else
        {
            prev = `gallery/${ page - 1 }/`
        }

        if (page === displaysPagecount - 1)
        {
            next = null
        }
        else
        {
            next = `gallery/${ page + 1 }/`
        }

        for (const displayEntry of displays.slice(page * displaysEPP, page * displaysEPP + displaysEPP))
        {
            items.push(
                {
                    title: displayEntry.title,
                    url:   displayEntry.url,
                })
        }

        entries.push({ url, type, title, page, prev, next, items })

        // kludge: duplicating page 0 as /gallery/index.html
        if (page === 0) entries.push({ url: 'gallery/', type, title, page, prev, next, items })
    }

    console.log(`generated ${ displaysPagecount } gallery pages`)

    // blog

    articles.sort((a, b) => b.time - a.time)
    const articlesEPP = 20
    const articlesPagecount = Math.ceil(articles.length / articlesEPP)

    for (let page = 0; page < articlesPagecount; page++)
    {
        let url, type, title, prev, next, items = []

        type = 'list_articles'
        title = `blog`
        url = `blog/${ page }/`

        if (page === 0)
        {
            prev = null
        }
        else if (page === 1)
        {
            prev = 'blog/'
        }
        else
        {
            prev = `blog/${ page - 1 }/`
        }

        if (page === articlesPagecount - 1)
        {
            next = null
        }
        else
        {
            next = `blog/${ page + 1 }/`
        }

        for (const articleEntry of articles.slice(page * articlesEPP, page * articlesEPP + articlesEPP))
        {
            items.push(
                {
                    title: articleEntry.title,
                    date: articleEntry.date,
                    url: articleEntry.url,
                })
        }

        entries.push({ url, type, title, page, prev, next, items })

        // kludge: duplicating page 0 as blog/index.html
        if (page === 0) entries.push({ url: 'blog/', type, title, page, prev, next, items })
    }

    console.log(`generated ${ articlesPagecount } blog pages`)

    // recentDisplays (latest EPP displays)

    const recentDisplays = { items: [], more: displaysPagecount > 1 ? `gallery/1/` : null }

    for (const entry of displays.slice(0, displaysEPP))
    {
        recentDisplays.items.push(
            {
                title: entry.title,
                url:   entry.url
            })
    }

    // recentArticles (latest EPP articles)

    const recentArticles = { items: [], more: articlesPagecount > 1 ? `blog/1/` : null }

    for (const entry of articles.slice(0, articlesEPP))
    {
        recentArticles.items.push(
            {
                title: entry.title,
                url:   entry.url,
                date:  entry.date
            })
    }

    // assigning prev/next to individual entries

    for (const entries of [articles, displays])
    {
        for (let i = 0; i < entries.length; i++)
        {
            entries[i].prev = entries[i - 1] ? { title: entries[i - 1].title, url: entries[i - 1].url, date: entries[i - 1].date }: null
            entries[i].next = entries[i + 1] ? { title: entries[i + 1].title, url: entries[i + 1].url, date: entries[i + 1].date }: null
        }
    }

    //

    fs.writeFileSync(`${ root }/tmp/recentDisplays.json`, JSON.stringify(recentDisplays, null, 4))
    fs.writeFileSync(`${ root }/tmp/recentArticles.json`, JSON.stringify(recentArticles, null, 4))
    fs.writeFileSync(`${ root }/tmp/entries.json`, JSON.stringify(entries, null, 4))
}