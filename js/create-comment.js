const WIDTH_VALUE = 35;
const HEIGHT_VALUE = 35;

const createPictureInComment = (data) => {
  const pictureImg = document.createElement('img');
  pictureImg.classList.add('social__picture');
  pictureImg.setAttribute('src', data.avatar);
  pictureImg.setAttribute('alt', data.name);
  pictureImg.setAttribute('width', WIDTH_VALUE);
  pictureImg.setAttribute('height', HEIGHT_VALUE);
  return pictureImg;
};

const createTextInComment = (data) => {
  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = data.message;
  return textComment;
};

const createCommentItem = (data) => {
  const eachCommentFragment = document.createDocumentFragment();
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentItem.append(createPictureInComment(data));
  commentItem.append(createTextInComment(data));
  eachCommentFragment.append(commentItem);
  return eachCommentFragment;
};

export { createCommentItem };
