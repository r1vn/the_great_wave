;(() =>
{
    const links = document.querySelectorAll(`.recent-displays > a`)

    for (const link of links)
    {
        if (link.pathname === window.location.pathname)
        {
            link.classList.add('active')
            break
        }
    }
})();