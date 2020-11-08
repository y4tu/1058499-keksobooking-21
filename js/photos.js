'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_AVATAR = `img/muffin-grey.svg`;
const MAX_PHOTO_PREVIEW_WIDTH = 60;

const avatarChooser = document.querySelector(`.ad-form-header__input`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const photoChooser = document.querySelector(`.ad-form__input`);
const photoPreview = document.querySelector(`.ad-form__photo`);

let flag = false;

const onPhotoChange = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    flag = true;

    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
      preview.style = `height: auto`;
    });
    reader.readAsDataURL(file);
  }
};

const preparePreview = () => {
  photoPreview.style = `display: flex; justify-content: center; align-items: center;`;

  const image = document.createElement(`img`);

  photoPreview.appendChild(image);

  const photoPreviewImage = photoPreview.querySelector(`img`);

  photoPreviewImage.classList.add(`visually-hidden`);
  photoPreviewImage.width = MAX_PHOTO_PREVIEW_WIDTH;
  photoPreviewImage.src = `#`;

  return photoPreviewImage;
};

const resetAvatar = () => {
  avatarPreview.src = DEFAULT_AVATAR;
};

const resetImagePreview = () => {
  const photoPreviewImage = photoPreview.querySelector(`img`);
  if (photoPreview.contains(photoPreviewImage)) {
    photoPreview.removeChild(photoPreviewImage);
  }
};

avatarChooser.addEventListener(`change`, () => {
  onPhotoChange(avatarChooser, avatarPreview);
});
photoChooser.addEventListener(`change`, () => {
  const photoPreviewImage = preparePreview();
  onPhotoChange(photoChooser, photoPreviewImage);
  if (flag) {
    photoPreviewImage.classList.remove(`visually-hidden`);
  }
});

window.photos = {
  resetAvatar,
  resetImagePreview,
};
