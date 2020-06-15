import {FilterType} from "./common";

export const getWatchlistCards = (cards) => cards.filter((card) => card.userDetails.watchlist);
export const getAlreadyWatchedCards = (cards) => cards.filter((card) => card.userDetails.alreadyWatched);
export const getFavoriteCards = (cards) => cards.filter((card) => card.userDetails.favorite);

export const getCardsByFilter = (cards, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return cards;
    case FilterType.WATCHLIST:
      return getWatchlistCards(cards);
    case FilterType.HISTORY:
      return getAlreadyWatchedCards(cards);
    case FilterType.FAVORITES:
      return getFavoriteCards(cards);
  }

  return cards;
};
