import './assets/css/style.css';
const axios = require('axios');
const resultado = document.querySelector('#resultado');

function requisicao(link) {
    axios.get(link,
    {
        headers: {
            Authorization: 'UevDqYPgv5SBhDuQdJnwWdyVJ51ouoLEJA61R2zp'
        }
    })
    .then(response => exibir(response.data)) 
    .catch(e => console.log(e));
}
requisicao('https://rickandmortyapi.com/api/character');

let i = 20;
function exibir(json) {
    console.log(json);

    const personagens = json.results;
    for(let personagem of personagens) {
        criaPersonagem(personagem.image, personagem.name);
        
        if(personagem.id === i) {
            i += 20;
            requisicao(json.info.next);
        }
    }
}

function criaPersonagem(img, nome) {
    const div = document.createElement('div');
    div.setAttribute('class', 'boxPers')
    
    const imgPers = criaImg(img);
    div.appendChild(imgPers);
    
    const nomePers = criaP(nome);
    div.appendChild(nomePers);
    
    resultado.appendChild(div);
}

function criaImg(img) {
    const image = document.createElement('img');
    image.setAttribute('src', img);
    return image;
}

function criaP(nome) {
    const p = document.createElement('p');
    p.setAttribute('class', nome.replace(' ', ''))
    p.innerText = nome;
    return p;
}