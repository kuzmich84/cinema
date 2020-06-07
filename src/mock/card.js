import {createDescription, getRandomArrayItem, getRandomInRange, getRandomFloatInRange} from "../utils/common";


const FILMS_NAMES = [`Интердевочка`, `Берегись автомобиля`, `Друзья`, `Трансформеры`, `Такси`,
  `Папины дочки`, `Брат`, `Бумер`, `Служебный роман`, `Чужой`,
  `Любовь и голуби`, `Альф`, `Елки`, `Семь жизней`, `Люди в черном`];

const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const DESCRIPTION = [
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

const AgeCertificats = [
  `12+`,
  `14+`,
  `16+`,
  `18+`,
];

function generateCard() {
  return {
    title: getRandomArrayItem(FILMS_NAMES),
    poster: getRandomArrayItem(POSTERS),
    description: createDescription(DESCRIPTION),
    year: getRandomInRange(1900, 2020),
    duration: {
      hours: getRandomInRange(0, 5),
      minutes: getRandomInRange(0, 59)
    },
    rating: (Math.random() * 10).toFixed(1),
    genre: getRandomArrayItem(GENRE),
    comments: getRandomInRange(0, 1000),
    directors: getRandomArrayItem(NameOfDirectors),


  };
}

const generateCards = (count) => {
  const arr = [];
  const flags = new Set();
  for (let i = 0; i < count; i++) {
    let generateC = generateCard();
    if (flags.has(generateC.title)) {
      i--;
    } else {
      arr.push(generateC);
      flags.add(generateC.title);
    }
  }
  return arr;
};


export {generateCard, generateCards};

