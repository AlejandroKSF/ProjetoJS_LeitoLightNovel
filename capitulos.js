'use strict'
const urlParams = new URLSearchParams(window.location.search);
const ln = urlParams.get("ln");

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_lightNovel')) ?? []
const setLocalStorage = (dblightNovel) => localStorage.setItem("db_lightNovel", JSON.stringify(dblightNovel))
const readlightNovel = () => getLocalStorage()

const deletelightNovel = (index) => {
    const dblightNovel = readlightNovel()
    dblightNovel[ln].capitulo.pop(index)
    setLocalStorage(dblightNovel)
}

const createlightNovel = (lightNovel) => {
    const dblightNovel = getLocalStorage()
    dblightNovel[ln].capitulo.push (lightNovel)
    setLocalStorage(dblightNovel)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('capitulo').dataset.index = 'new'
}

const createRow = (lightNovel, index) => { //cria as linhas da tabela
    const newRow = document.createElement('tr') 
    newRow.innerHTML = `
        <td onclick="editlightNovel(${index})">${lightNovel.numero}</td>
        <td class="red">
        
        <a type="button" class="infobox-explorebtn selected" id="delete-${index}" >Excluir</a>
        </td>
    `
    document.querySelector('#tablelightNovel>tbody').appendChild(newRow)
}

const savelightNovel = () => { //Insert de nova lightNovel
    debugger
    if (isValidFields()) {
        const lightNovel = { //dados cedidos no model
            numero: document.getElementById('capitulo').value,
            conteudo: document.getElementById('conteudo').value
        }
        
        const index = document.getElementById('capitulo').dataset.index
        createlightNovel(lightNovel)
        updateTable()
        closeModal()
    }
}
const clearTable = () => {
    const rows = document.querySelectorAll('#tablelightNovel>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readlightNovel()[ln]
    clearTable()
    dbClient.capitulo.forEach(createRow)
}

const fillFields = (lightNovel,index) => {
    document.getElementById('capitulo').value = lightNovel.capitulo[index].numero
    //document.getElementById('data').value = lightNovel.data
    document.getElementById('conteudo').value = lightNovel.capitulo[index].conteudo
    document.getElementById('capitulo').dataset.index = lightNovel.index
}
const editlightNovel = (index) => {
    const lightNovel = readlightNovel()[ln]
    lightNovel.index = index
    fillFields(lightNovel,index)
    openModal()
}
const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action != 'edit') {
            const lightNovel = readlightNovel()[ln]
            const response = confirm(`Deseja realmente excluir o capítulo ${lightNovel.capitulo[index].numero} da light novel ${lightNovel.nome}`)
            if (response) {
                deletelightNovel(ln)
                updateTable()
            }
        }
    }
}

updateTable()
document.getElementById('cadastrarlightNovel')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', savelightNovel)

document.querySelector('#tablelightNovel>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)