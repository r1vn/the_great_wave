;(() =>
{
    const links = document.querySelectorAll(`.recent-articles > a`)

    for (const link of links)
    {
        if (link.pathname === window.location.pathname)
        {
            link.classList.add('active')
            break
        }
    }
})();