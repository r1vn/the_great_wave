;(() =>
{
    const crossburger = document.querySelector('.crossburger-menu')
    const menu = document.querySelector('.menu')

    crossburger.addEventListener('click', () =>
    {
        crossburger.classList.toggle('cross')
        menu.classList.toggle('displaynone-m')
    })
})();