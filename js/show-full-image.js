import { createCommentItem } from './create-comment.js';
import { isEscapeKey } from './util.js';

const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsCountElement = document.querySelector('.comments-count');

const VISIBLE_COMMENTS = 5;
let shownComments = 0;
let loadMoreComments = null;

const renderComments = (data) => {
  shownComments += VISIBLE_COMMENTS;
  if (shownComments >= data.comments.length) {
    commentsLoader.classList.add('hidden');
    shownComments = data.comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < shownComments; i++) {
    const commentElement = createCommentItem(data.comments[i]);
    fragment.append(commentElement);
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCount.textContent = `${shownComments} из ${data.comments.length} комментариев`;
};

const addSomeComments = (data) => {
  renderComments(data);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullImage();
  }
};

const onClickButtonClose = (evt) => {
  evt.preventDefault();
  closeFullImage();
};

const openFullImage = (item, data) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture .big-picture__img img').setAttribute('src', data.url);
    document.querySelector('.big-picture .likes-count').textContent = data.likes;
    commentsCountElement.textContent = item.querySelector('.picture__comments').textContent;
    document.querySelector('.big-picture .social__caption').textContent = data.description;
    document.querySelector('.social__comments').innerHTML = '';
    renderComments(data);
    loadMoreComments = addSomeComments.bind(null, data);
    commentsLoader.addEventListener('click', loadMoreComments);
    document.addEventListener('keydown', onDocumentKeydown);
    closeButton.addEventListener('click', onClickButtonClose);
  });
};

function closeFullImage() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  shownComments = 0;
  commentsLoader.removeEventListener('click', loadMoreComments);
}

export { openFullImage };
