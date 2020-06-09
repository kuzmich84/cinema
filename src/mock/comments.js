import {getRandomArrayItem, getRandomEventTime} from "../utils/common";
import {DESCRIPTION} from "./card";

const Authors = [`Dima`, `Vasya`, `Petya`, `Julia`, `Jane`, `John`, `Robert`, `Stas`, `Trump`];
const Emoji = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`, `trophy.png`];

const generateComment = function () {
  const authorName = getRandomArrayItem(Authors);
  return {
    author: authorName,
    id: Authors.indexOf(authorName),
    comment: getRandomArrayItem(DESCRIPTION),
    date: Date.parse(getRandomEventTime(2015, 2020)),
    emotion: getRandomArrayItem(Emoji)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
