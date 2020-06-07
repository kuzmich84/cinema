import {createFilmCardTemplate} from "./components/card";
import {createMenuTemplate} from "./components/menu";
import {createFilmsContainer} from "./components/filmContainer";
import {createSortTemplate} from "./components/sort";
import {createButtonShowMoreTemplate} from "./components/button";
import {createUserProfileTemplate} from "./components/profile";
import {createFilmsExtraContainer} from "./components/extra";
import {generateCards} from "./mock/card";

// функция для отрисовки компонент
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILM_COUNT = 5;
const EXTRA_COUNT = 2;


const header = document.querySelector(`.header`);
render(header, createUserProfileTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainer(), `beforeend`);
const filmsList = document.querySelector(`.films-list`);


const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(), `beforeend`);
}

function renderFilmCard(container, count) {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardTemplate(), `beforeend`);
  }
}

render(filmsList, createButtonShowMoreTemplate(), `beforeend`);

const films = document.querySelector(`.films`);

for (let i = 0; i < EXTRA_COUNT; i++) {
  render(films, createFilmsExtraContainer(), `beforeend`);
}

const filmsListContainerExtra = document.querySelectorAll(`.films-list__container`);

Array.from(filmsListContainerExtra).slice(1).forEach((element) => renderFilmCard(element, 2));

const arr = generateCards(15).map((item, index) => {
  item.id = index;
  return item;
});

console.log(arr);
