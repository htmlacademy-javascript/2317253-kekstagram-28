
//Функция для генерации случайного числа
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export {getRandomInteger};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export {getRandomArrayElement};

const createIdGenerator = () => {
  let lastGenerateId = 0;

  return () => {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

const generateCommentId = createIdGenerator();

export {generateCommentId};
