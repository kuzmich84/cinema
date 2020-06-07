export const getRandomIntegerNumber = (min, max) => min + Math.floor(max * Math.random());

export const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomFloatInRange = () =>(Math.random() * 10).toFixed(1);

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const createDescription = (description) => {
  let string = ``;
  for (let i = 0; i < 3; i++) {
    string += getRandomArrayItem(description) + ` `;
  }
  return string;
};
