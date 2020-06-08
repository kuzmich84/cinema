export const createUserProfileTemplate = (cards) => {
  const {totalWatched} = cards;
  let nameProfile = ``;
  if (totalWatched === 0) {
    nameProfile = ``;
  } else if (totalWatched >= 1 && totalWatched <= 10) {
    nameProfile = `Novice`;
  } else if (totalWatched >= 11 && totalWatched <= 20) {
    nameProfile = `Fan`;
  } else {
    nameProfile = `Movie Buff`;
  }

  return (`  <section class="header__profile profile">
    <p class="profile__rating">${nameProfile}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
};
