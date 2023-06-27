const url = fetch("https://rickandmortyapi.com/api/character");
const search = document.getElementById("searchbar")



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
