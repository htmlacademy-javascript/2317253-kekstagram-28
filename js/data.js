import {getRandomInteger} from './util.js';
import {getRandomArrayElement} from './util.js';
import {generateCommentId} from './util.js';


const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Лето 2013',
  'Пляжная вечеринка',
  'Снежные горы',
  'Аттракцион невиданной щедрости',
  'Скачки на слонах',
];

const NAMES = [
  'Вася',
  'Рома',
  'Ксюша',
  'Федя',
  'Карина',
];

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(MESSAGES)
  ).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 5)}, createComment),
});

const getPictures = () => Array.from({length: 25}, (_, pictureIndex) =>
  createPicture(pictureIndex + 1)
);

export {getPictures};
