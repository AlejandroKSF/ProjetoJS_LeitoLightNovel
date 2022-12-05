const urlParams = new URLSearchParams(window.location.search);
const ln = urlParams.get("ln");
const cap = urlParams.get("cap")
console.log(ln);
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_lightNovel')) ?? []
const setLocalStorage = (dblightNovel) => localStorage.setItem("db_lightNovel", JSON.stringify(dblightNovel))
const readlightNovel = () => getLocalStorage()
const dblightNovel = readlightNovel()
const EspConteudo = document.getElementById('conteudo');
EspConteudo.innerHTML = `${dblightNovel[ln].capitulo[cap].conteudo}`
console.log(dblightNovel[ln])