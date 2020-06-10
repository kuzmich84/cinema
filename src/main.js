import {generateCards} from "./mock/card";
import {render, RenderPosition, remove} from "./utils/render";
import FilmContainerComponent from "./components/filmContainer";
import SiteMenuComponent from "./components/menu";
import UserProfileComponent from "./components/profile";
import SortComponent from "./components/sort";
import StatisticComponent from "./components/statistic";
import FooterStatisticComponent from "./components/footerStatistic";
import PageController from "./controllers/PageController";

const FILM_COUNT = 15;
const cards = generateCards(FILM_COUNT).map((item, index) => {
  item.id = index;
  return item;
});


// формирует данные для статистики
const statisticData = (arr) => {
  const cardsFilterWatched = arr.filter((card) => card.userDetails.alreadyWatched);
  const cardsFilterWatchlist = arr.filter((card) => card.userDetails.watchlist);
  const cardsFilterFavorite = arr.filter((card) => card.userDetails.favorite);
  return {
    totalWatched: cardsFilterWatched.length,
    totalWatchedTime: cardsFilterWatched.reduce((sum, current) => sum + current.filmInfo.runtime, 0),
    totalWatchlist: cardsFilterWatchlist.reduce((sum, current) => sum + current.userDetails.watchlist, 0),
    totalWatchFavorite: cardsFilterFavorite.reduce((sum, current) => sum + current.userDetails.favorite, 0)
  };
};


console.log(cards);


const header = document.querySelector(`.header`);
render(header, new UserProfileComponent(statisticData(cards)), RenderPosition.BEFOREEND);


const siteMainElement = document.querySelector(`.main`);
const siteMenuComponent = new SiteMenuComponent(statisticData(cards));
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const sortComponent = new SortComponent();
render(siteMainElement, sortComponent, RenderPosition.BEFOREEND);

const filmContainerComponent = new FilmContainerComponent();
render(siteMainElement, filmContainerComponent, RenderPosition.BEFOREEND);

// Отрисует боард с карточками
const pageController = new PageController(filmContainerComponent);
pageController.render(cards);

const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(cards), RenderPosition.BEFOREEND);

const showStat = (evt) => {
  evt.preventDefault();
  remove(filmContainerComponent);
  remove(sortComponent);
  render(siteMainElement, new StatisticComponent(statisticData(cards)), RenderPosition.BEFOREEND);
  siteMenuComponent.removeShowStatClickHandler(showStat);
};
siteMenuComponent.setShowStatClickHandler(showStat);


console.log(statisticData(cards));

