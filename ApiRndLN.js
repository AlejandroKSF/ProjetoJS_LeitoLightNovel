gerarValorAleatorio = () => {
    return Math.floor((Math.random()*100)-1);
}

const v1 = gerarValorAleatorio()

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e36fe66f09mshe82f8f16f109f47p103fe0jsndf564564ce55',
		'X-RapidAPI-Host': 'web-novel-api.p.rapidapi.com'
	}
};

fetch('https://web-novel-api.p.rapidapi.com/novels/0', options)
	.then(response => response.json())
    .then(response => x = response)
	.then(x => document.getElementById('titulov1').innerHTML = x.novels[v1].title + `<div class="infobox-slimtext">${x.novels[v1].description}</div>`)
	.catch(err => console.error(err));