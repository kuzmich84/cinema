import {generateCards} from "./mock/card";
import {render, RenderPosition} from "./utils/render";
import UserProfileComponent from "./components/profile";
import FooterStatisticComponent from "./components/footerStatistic";
import PageController from "./controllers/PageController";
import {statisticData} from "./utils/common";
import MoviesModel from "./models/movies";
import FilterController from "./controllers/FilterController";

const FILM_COUNT = 15;
const cards = generateCards(FILM_COUNT).map((item, index) => {
  item.id = index;
  return item;
});

const header = document.querySelector(`.header`);
render(header, new UserProfileComponent(statisticData(cards)), RenderPosition.BEFOREEND);


const siteMainElement = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

// Отрисует боард с карточками
const pageController = new PageController(siteMainElement, moviesModel);
pageController.render();

const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(cards), RenderPosition.BEFOREEND);


