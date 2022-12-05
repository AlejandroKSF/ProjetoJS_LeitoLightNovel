const urlParams = new URLSearchParams(window.location.search);
const ln = urlParams.get("ln");
console.log(ln);
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_lightNovel')) ?? []
const setLocalStorage = (dblightNovel) => localStorage.setItem("db_lightNovel", JSON.stringify(dblightNovel))
const readlightNovel = () => getLocalStorage()

const createRow = (lightNovel, index) => {
    const buscaT = readlightNovel()[ln]
    const titulo = document.createElement('div')
    titulo.innerHTML = `<p class="infobox-boldtext">${buscaT.nome}</p><p class="infobox-slimtext">${buscaT.descricao}</p>`
    document.querySelector('.box>.infobox').appendChild(titulo)

    const display = document.createElement('div')
    display.innerHTML = `<img class="display-nft" src="imagem/${buscaT.capa}" border="0">`
    document.querySelector('.display>.imagem').appendChild(display)

    const nomeDisplay = document.createElement('div')
    nomeDisplay.innerHTML = `<p>${buscaT.nome}</p>`
    document.querySelector('.info2>.nome').appendChild(nomeDisplay)

    const newRow = document.createElement('div')
    newRow.innerHTML = `<div class="item-title"><a href="leitura.html?ln=${ln}&cap=${index}"> Capítulo:  ${lightNovel.numero}</a></div><p class="item-date">Lançado em 2022</p>`
    document.querySelector('#conteudo>.nft').appendChild(newRow)
}
const update = () => {
    const dblightNovel = readlightNovel()[ln]
    dblightNovel.capitulo.forEach(createRow)
}
update()