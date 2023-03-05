// функция для проверки длины строки
//принимает строку и макс. длину
//если строка <= макс. длины - true иначе false
const isLengthString = (string, length) => {
  if (string.length <= length) {
    return true;
  }
  return false;
};

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

