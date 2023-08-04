const estructura = document.querySelector("#estructura");
const prevPageButton = document.querySelector("#atras");
const infoPagDOM = document.querySelector("#info-pag-up");
const infoPagDOM2 = document.querySelector("#info-pag-down");
const nextPageButton = document.querySelector("#siguiente");
const elsByPage = 20
let currentPage = 1;

function pageNumber (currentPage) {
    infoPagDOM.innerHTML = currentPage
    infoPagDOM2.innerHTML = currentPage

}

function getAllCharacters(currentPage) {
    const page = "?page=" + currentPage
    fetch("https://rickandmortyapi.com/api/character" + page)
        .then(res => res.json())
        .then(data => render(data))
}

function showNextPage() {
    if(currentPage < 42) {
        currentPage += 1;
        getAllCharacters(currentPage);
    }
}

function showPrevPage() {
    if (currentPage > 1) {
        currentPage -= 1;
        getAllCharacters(currentPage);
    }
}

function refreshPage(){
    location.reload();
}

function render(data) {
    document.querySelector("#estructura").innerHTML = ""
    data.results.forEach((personaje) => {
        
        const article = document.createRange().createContextualFragment(`
        <article class = "article p-0.5 shadow-sm shadow-white hover:scale-105 hover:ease-in duration-200 cursor-pointer">
            <div class="image-container flex">
                <img class="w-full" src="${personaje.image}" alt="personaje">
            </div>
            <h2 id = "name">${personaje.name}</h2>
            <p><span class="span-status">${personaje.status}</span></p>
        </article>
        `);

        const main = document.querySelector("main");

        main.append(article);
    });

    pageNumber(currentPage)
}

function infoCharacter() {
    
}

getAllCharacters(currentPage)