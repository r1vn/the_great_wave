;(() =>
{
    /// Bailing out if storage doesn't work

    try
    {
        sessionStorage.setItem('test', 'ok')
    }
    catch (e)
    {
        return
    }

    const scroller = document.querySelector('.sideleft')

    /// Getting

    const getScroll = () =>
    {
        const scroll = scroller.scrollTop
        sessionStorage.setItem('scroll2', scroll.toString())
        //console.log('saved ' + scroll)
    }

    window.addEventListener('beforeunload', getScroll)

    /// Setting

    const setScroll = () =>
    {
        const scroll = sessionStorage.getItem('scroll2')
        if (!scroll) return

        scroller.scrollTop = Number(scroll)
        //console.log('applied ' + scroll)
    }

    // Triggers on both mobile/desktop load, but only works on desktop
    //window.addEventListener('DOMContentLoaded', setScroll) // inconsistent for .sideleft for some reason
    window.addEventListener('DOMContentLoaded', setScroll)

    // Triggers only on mobile
    new MutationObserver(() => { console.log('mut'); setScroll() }).observe(scroller, { attributeFilter: [ "class" ] })
})();