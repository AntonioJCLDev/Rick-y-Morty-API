const search = document.getElementById("searchbar");
const estructura = document.querySelector("#estructura");
const prevPage = document.querySelector("#atras");
const infoPageDOM = document.querySelector("#info-pag");
const nextPage = document.querySelector("#siguiente");
const elsByPage = 20;
let currentPage = 1;

function getAllCharacters(currentPage) {
	const page = "?page=" + currentPage
    fetch(`https://rickandmortyapi.com/api/character${page}`)
		.then(res => res.json())
		.then(data => render(data))
}

function showNextPage() {
    currentPage += 1;
	getAllCharacters(currentPage)
}

function showPrevPage() {
	if(currentPage > 1){
		currentPage -= 1
		getAllCharacters(currentPage)		
	}
}

function render(data){
	document.querySelector("#estructura").innerHTML = ""
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
}

getAllCharacters(currentPage)