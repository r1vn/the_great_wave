;(() =>
{
    const links = document.querySelectorAll(`.menu-links a`)

    for (const link of links)
    {
        if (link.pathname === window.location.pathname)
        {
            link.classList.add('active')
            break
        }
    }
})();