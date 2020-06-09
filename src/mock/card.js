import {createDescription, getRandomArrayItem, getRandomInRange, getRandomEventTime} from "../utils/common";


const FILMS_NAMES = [`Интердевочка`, `Берегись автомобиля`, `Друзья`, `Трансформеры`, `Такси`,
  `Папины дочки`, `Брат`, `Бумер`, `Служебный роман`, `Чужой`,
  `Любовь и голуби`, `Альф`, `Елки`, `Семь жизней`, `Люди в черном`];

const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

export const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const GENRE = [`Action`,
  `Adventure`,
  `Animation`,
  `Biography`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Family`,
  `Fantasy`,
  `Film-noir`,
  `History`,
  `Horror`,
  `Music`,
  `Mystery`,
  `Romance`,
  `Sci-Fi`,
  `Sport`,
  `Thriller`,
  `War`,
  `Western`];


const NameOfDirectors = [
  `Frank Darabont`,
  `Francis Ford Coppola`,
  `Christopher Nolan`,
  `Sidney Lumet`,
  `Steven Spielberg`,
  `Peter Jackson`,
  `Quentin Tarantino`,
];

const NameOfWriters = [
  `Stephen King`,
  `Mario Puzo`,
  `Jonathan Nolan`,
  `Reginald Rose`,
  `Thomas Keneally`,
  `Fran Walsh`,
  `Roger Avary`,
];

const NameOfActors = [
  `Tim Robbins`,
  `Morgan Freeman`,
  `Marlon Brando`,
  `Al Pacino`,
  `Christian Bale`,
  `Liam Neeson`,
  `John Travolta`,
];

const Country = [
  `USA`,
  `France`,
  `Italy`,
  `Russia`,
  `Spain`,
  `Germany`,
];

const AgeDeclaimer = [
  `12+`,
  `14+`,
  `16+`,
  `18+`,
];

const WATCHLIST = [true, false];

const getRandomArray = (arr, count) => {
  const set = new Set();
  for (let i = 0; i < count; i++) {
    set.add(getRandomArrayItem(arr));
  }
  return Array.from(set);
};


function generateCard() {
  return {
    id: ``,
    comments: getRandomInRange(0, 1000),
    filmInfo: {
      title: getRandomArrayItem(FILMS_NAMES),
      alternativeTitle: getRandomArrayItem(FILMS_NAMES),
      rating: (Math.random() * 10).toFixed(1),
      poster: getRandomArrayItem(POSTERS),
      director: getRandomArrayItem(NameOfDirectors),
      writers: getRandomArray(NameOfWriters, getRandomInRange(1, 5)),
      actors: getRandomArray(NameOfActors, getRandomInRange(1, 5)),
      release: {
        date: Date.parse(getRandomEventTime(1910, 2020)),
        releaseCountry: getRandomArrayItem(Country),
      },
      runtime: getRandomInRange(1, 300),
      genre: getRandomArray(GENRE, getRandomInRange(1, 3)),
      description: createDescription(DESCRIPTION, getRandomInRange(1, 3)),
      ageDeclaimer: getRandomArrayItem(AgeDeclaimer)
    },
    userDetails: {
      personalRating: getRandomInRange(0, 50),
      watchlist: getRandomArrayItem(WATCHLIST),
      alreadyWatched: getRandomArrayItem(WATCHLIST),
      watchingDate: getRandomEventTime(2010, 2020),
      favorite: getRandomArrayItem(WATCHLIST),
    }
  };
}

// const generateCards = (count) => {
//   const arr = [];
//   const flags = new Set();
//   for (let i = 0; i < count; i++) {
//     let cardItem = generateCard();
//     if (flags.has(cardItem.title)) {
//       i--;
//     } else {
//       arr.push(cardItem);
//       flags.add(cardItem.title);
//     }
//   }
//   return arr;
// };
//
// const generateCards = (count) => {
//   let arr = [];
//   for (let i = 0; i < count; i++) {
//     arr.push(generateCard());
//   }
//   return arr;
// };

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCards, generateCard};

