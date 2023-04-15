import { isEscapeKey } from './util.js';
import { resetScale } from './scale-image.js';
import { resetEffects } from './effects-image.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_TEXT = 'Неправильно прописаны хештеги';

const form = document.querySelector('.img-upload__form'); //Поле для загрузки нового изображения на сайт
const submitButton = form.querySelector('.img-upload__submit'); //кнопка опубликовать
const hashtagField = document.querySelector('.text__hashtags'); //поле для хештэга
const commentField = document.querySelector('.text__description'); //поле для коммента
const fileField = document.querySelector('#upload-file'); //Изначальное состояние поля для загрузки изображения
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');

const successElement = document.querySelector('#success').content.querySelector('.success'); //попап об успешной загрузке изображения
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button'); //кнопка круто

const errorElement = document.querySelector('#error').content.querySelector('.error'); //попап с ошибкой загрузки изображения
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button'); //кнопка Попробовать ещё раз

//  добавляет попапам success u error класс hidden
const hideModalMessage = () => {
  successElement.classList.add('hidden');
  errorElement.classList.add('hidden');
};

//добавляет попапам success u error класс hidden и удаляет обработчик событий при нажатии на кнопку круто
const onCloseButtonClick = () => {
  console.log("Тест");
  hideModalMessage();
  successButtonElement.removeEventListener('click', onCloseButtonClick);
};

const onBodyClick = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
    document.removeEventListener('click', onBodyClick);
  }
};

const onEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
    document.removeEventListener('keydown', onEscPress);
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  //successButtonElement.addEventListener('click', onCloseButtonClick);
  console.log("Тест2");
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isInFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInFocused()) {
    evt.preventDefault();
    const hasHiddenPopup = document.querySelector('.error');
    if (!hasHiddenPopup) {
      hideModal();
    }
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const isValidTag = (tag) => HASHTAGS_RULES.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAGS_ERROR_TEXT
);

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const showSuccessMessage = () => {
  console.log("showsuccess");
  //successButtonElement.addEventListener('click', onCloseButtonClick);
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(successElement);
      successButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onBodyClick);
    } else {
      const successElementClone = document.querySelector('.success');
      successElementClone.classList.remove('hidden');
      successButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onBodyClick);
    }
  };
};
const showFullSuccessMessage = showSuccessMessage();

const showErrorMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(errorElement);
      errorButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onBodyClick);
    } else {
      const errorElementClone = document.querySelector('.error');
      errorElementClone.classList.remove('hidden');
      errorButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onBodyClick);
    }
  };
};
const showFullErrorMessage = showErrorMessage();

const onFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      /*successButtonElement.addEventListener('click', onCloseButtonClick);
      errorButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onBodyClick);*/
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export { onFormSubmit, hideModal, showFullSuccessMessage, showFullErrorMessage };
