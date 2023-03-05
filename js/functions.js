// функция для проверки длины строки
//принимает строку и макс. длину
//если строка <= макс. длины - true иначе false
const isLengthString = (string, length) => {
  if (string.length <= length) {
    return true;
  }
  return false;
};
// Cтрока короче 20 символов
isLengthString('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
isLengthString('проверяемая строка', 18); // true
// Строка длиннее 10 символов
isLengthString('проверяемая строка', 10); // false


//Функция для проверки, является ли строка палиндромом
const isPalindrom = (string) => {
  const tempString = string
    .replaceAll(' ', '')
    .toLowerCase();
  const newString = string
    .replaceAll(' ', '')
    .toLowerCase()
    .split('')
    .reverse()
    .join('');
  return tempString === newString;
};

// Строка является палиндромом
isPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrom('ДовОд'); // true
// Это не палиндром
isPalindrom('Кекс'); // false
// Это палиндром
isPalindrom('Лёша на полке клопа нашёл '); // true


// Функция, которая принимает строку
//извлекает содержащиеся в ней цифры от 0 до 9
//возвращает их в виде целого положительного числа
//если нет цифр, возвращает Nan
// принимает число, а не только строку


const chooseNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

chooseNumber('2023 год'); // 2023

chooseNumber('ECMAScript 2022'); // 2022

chooseNumber('1 кефир, 0.5 батона'); // 105

chooseNumber('агент 007'); // 7

chooseNumber('а я томат'); // NaN

chooseNumber(2023); // 2023

chooseNumber(-1); // 1

chooseNumber(1.5); // 15


//Функция принимает три параметра:
//исходную строку
//минимальную длину
//строку с добавочными символами
//возвращает исходную строку, дополненную указанными символами до заданной длины
//символы добавляются в начало строки
//если исходная строка превышает заданную длину, она не должна обрезаться
//если «добивка» слишком длинная, она обрезается с конца

const myPadstar = (string, minLength, pad) => {
  const actualPad = minLength - string.length;

  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

// Добавочный символ использован один раз
myPadstar('1', 2, '0'); // '01'
// Добавочный символ использован три раза
myPadstar('1', 4, '0'); // '0001'
// Добавочные символы обрезаны с конца
myPadstar('q', 4, 'werty'); // 'werq'
// Добавочные символы использованы полтора раза
myPadstar('q', 4, 'we'); // 'wweq'
// Добавочные символы не использованы, исходная строка не изменена
myPadstar('qwerty', 4, '0'); // 'qwerty'
