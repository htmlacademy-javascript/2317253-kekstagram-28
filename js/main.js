import { renderThumbnails } from './show-thumbnails.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { onFormSubmit, hideModal, showFullSuccessMessage, showFullErrorMessage } from './edit-form.js';
import { initFilterListeners } from './filter.js';
import './upload-photo.js';

const RENDER_PHOTOS_DELAY = 500;

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showFullSuccessMessage();
  } catch {
    showFullErrorMessage();
  }
});

try {
  const data = await getData();
  renderThumbnails(data);
  initFilterListeners(data, debounce(renderThumbnails, RENDER_PHOTOS_DELAY));
} catch (err) {
  showAlert(err.message);
}
