const url = fetch("https://rickandmortyapi.com/api/character");
const search = document.getElementById("searchbar");
const estructura = document.querySelector("#estructura");
const botonAtrasDOM = document.querySelector("#atras");
const infoPagDOM = document.querySelector("#info-pag");
const botonSiguiente = document.querySelector("#siguiente");
const elementosPorPagina = 20
let paginaActual = 1;
const baseDeDatos = url;

function avanzarPagina() {
    paginaActual = paginaActual + 1;
    renderizar();
}

function retrocederPagina() {
    paginaActual = paginaActual - 1;
    renderizar();
}

function obtenerRebanadaDeBaseDeDatos(pagina = 1) {
	const corteDeInicio = (paginaActual - 1) * elementosPorPagina;
	const corteDeFinal = corteDeInicio + elementosPorPagina;
	return baseDeDatos.slice(corteDeInicio, corteDeFinal);
}

function obtenerPaginasTotales() {
    console.log(baseDeDatos.then(response => response.json()))
    console.log(baseDeDatos.then(response => response.json()).length)
	return Math.ceil(baseDeDatos.then(response => response.json()).length / elementosPorPagina);
}

function gestionarBotones() {
    if (paginaActual === 1) {
        botonAtrasDOM.setAttribute("disabled", true);
    } else{
        botonAtrasDOM.removeAttribute("disabled");
    }




}



function getCharacters(done){

    const results = url

    results
        .then(res => res.json())
        .then(data => {
            done(data)
        });
}

getCharacters(data => {
    
    data.results.forEach((personaje) => {
        
        const article = document.createRange().createContextualFragment(`
        <article class = "article">
            <div class="image-container">
                <img src="${personaje.image}" alt="personaje">
            </div>
            <h2 id = "name">${personaje.name}</h2>
            <p><span class="span-status">${personaje.status}</span></p>
        </article>
        `);

        const main = document.querySelector("main");

        main.append(article);
    });
});


botonAtrasDOM.addEventListener("click", obtenerPaginasTotales())