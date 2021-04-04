'use strict'
const menu = require('./components/menu')
const center = require('./components/center')
const sideleft = require('./components/sideleft')
const sideright = require('./components/sideright')

const recentDisplays = require(`${ process.cwd() }/tmp/recentDisplays`)
const recentArticles = require(`${ process.cwd() }/tmp/recentArticles`)

module.exports = (entry) =>
{
    let output = `

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/the_great_wave/">
    <link rel="icon" type="image/png" href="assets/favicon.png">
    <title>${ entry.title } | 𝚃 𝙷 𝙴 𝙶 𝚁 𝙴 𝙰 𝚃 𝚆 𝙰 𝚅 𝙴 【 神 奈 川 沖 浪 裏 】</title>
    
    <link rel="stylesheet" href="assets/build.css">
    <script src="assets/build.js" defer></script>
</head>
<body>
    <div class="load displaynone"></div>

    <div class="main">  
        ${ menu() }
        ${ center(entry) }   
        ${ sideleft(recentDisplays) }
        ${ sideright(recentArticles) }
        
        <div class="crossburger-menu displaynone-d"></div>
        <div class="bg-0"></div>
        <div class="bg-1"></div>
        <div class="load displaynone"></div>
    </div>
   
</body>
</html>

    `.trim()

    // if (payload.debug)
    // {
    //     output += '<!--\n' + JSON.stringify(payload, null, 4) + '\n-->'
    // }

    return output
}