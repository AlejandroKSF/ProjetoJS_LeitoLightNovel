const getLocalStorage = () => JSON.parse(localStorage.getItem('db_lightNovel')) ?? []
const setLocalStorage = (dblightNovel) => localStorage.setItem("db_lightNovel", JSON.stringify(dblightNovel))
const readlightNovel = () => getLocalStorage()
const createRow = (lightNovel, index) => { //cria as linhas da tabela
    const newRow = document.createElement('div')
    newRow.innerHTML = `
    <div class=item>
    <a href="ViewlightNovel.html?ln=${index}">
    <img class="item-img" src="imagem/${lightNovel.capa}" alt="unsplash-OG44d93i-NJk" border="0">
    </a>
    <div class="item-title">
        <p>${lightNovel.nome}</p>
    </div>
    </div>
    `
    
    document.querySelector('#listIndex>div').appendChild(newRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('#listIndex>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readlightNovel()
    clearTable()
    dbClient.forEach(createRow)
}
updateTable()
