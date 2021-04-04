;(() =>
{
    const load = document.querySelector('.load')
    load.classList.remove('displaynone')
    window.addEventListener('load', () => load.classList.add('displaynone'))
    window.addEventListener('beforeunload', () => load.classList.remove('displaynone'))
})();

