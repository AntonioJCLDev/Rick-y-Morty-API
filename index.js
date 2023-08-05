const estructura = document.querySelector("#estructura");
const prevPageButton = document.querySelector("#atras");
const infoPagDOM = document.querySelector("#info-pag-up");
const infoPagDOM2 = document.querySelector("#info-pag-down");
const nextPageButton = document.querySelector("#siguiente");
const elsByPage = 20;
let currentPage = 1;

function pageNumber(currentPage) {
  infoPagDOM.innerHTML = currentPage;
  infoPagDOM2.innerHTML = currentPage;
}

function modalCharacter(content) {
  const modalContainer = document.getElementById("modalContainer")

  modalContainer.innerHTML = content;

  document.body.classList.add("body-modal-open");

  modalContainer.firstElementChild.classList.add("modal-open");
}
function removeModalCharacter() {
  const modal = document.querySelector(".modal");

  if (modal) {
    modal.remove();

    document.body.classList.remove("body-modal-open");
  }
}

function getAllCharacters(currentPage) {
  const page = "?page=" + currentPage;
  fetch("https://rickandmortyapi.com/api/character" + page)
    .then((res) => res.json())
    .then((data) => render(data));
}

function showNextPage() {
  if (currentPage < 42) {
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

function refreshPage() {
  location.reload();
}

function render(data) {
  document.querySelector("#estructura").innerHTML = "";
  data.results.forEach((personaje) => {
    const article = document.createRange().createContextualFragment(`
        <article class = "article p-0.5 shadow-sm shadow-white hover:scale-105 hover:ease-in duration-200 cursor-pointer" onclick="modalCharacter()">
            <div class="image-container flex">
                <img class="w-full" src="${personaje.image}" alt="personaje">
            </div>
            <h2 id = "name">${personaje.name}</h2>
            <p><span class="span-status">${personaje.status}</span></p>
        </article>
        `);

    article.querySelector(".article").addEventListener('click', () => {
      const modalContent = infoCharacter(personaje);
      modalCharacter(modalContent);
    });

    const main = document.querySelector("main");
    main.append(article);
  });

  pageNumber(currentPage);
}

function infoCharacter(personaje) {
  const modalContent = `
      <section class="modal fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex">
        <div class="modal-container w-11/12 max-w-sm max-h-full rounded-xl py-12 px-10 bg-slate-800 m-auto grid gap-4 items-center">
          <img class="modal-img w-60 max-w-lg block m-auto" src="${personaje.image}" alt="character-image">
          <h2 class="modal-name text-4xl">${personaje.name}</h2>
          <p class="modal-id text-2xl">ID: ${personaje.id}</p>
          <p class="modal-gender text-2xl">Gender: ${personaje.gender}</p>
          <p class="modal-species text-2xl">Species: ${personaje.species}</p>
          <p class="modal-status text-2xl">Status: ${personaje.status}</p>
          <button class="modal-close text-white bg-slate-500 py-4 px-12 border-2 border-solid rounded-md inline-block font-light"onclick="removeModalCharacter()">Close</button>
        </div>
      </section>
    `;
    return modalContent;
};


getAllCharacters(currentPage);
