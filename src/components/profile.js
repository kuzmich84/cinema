import {getRandomIntegerNumber} from '../utils/common';

const countFilm = getRandomIntegerNumber(0, 50 );
let nameProfile = ``;

if (countFilm === 0) {
  nameProfile = ``;
} else if (countFilm >= 1 && countFilm <= 10) {
  nameProfile = `Novice`;
} else if (countFilm >= 11 && countFilm <= 20) {
  nameProfile = `Fan`;
} else {
  nameProfile = `Movie Buff`;
}


export const createUserProfileTemplate = () => {
  return (`  <section class="header__profile profile">
    <p class="profile__rating">${nameProfile}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
};
