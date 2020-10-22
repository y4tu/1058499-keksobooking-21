"use strict";

const ADS_NUMBER = 8;
const TITLES = [`Шейх`, `Лепс`, `Спарк`, `Ваниш`, `Афродита`, `Дженифер`, `Церцея`, `Бусилия`];
const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = 1200;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS = [`1`, `2`, `3`, `4`];
const GUESTS = [`2`, `4`, `6`, `8`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = [
  `Уютная и стильная квартира.`,
  `Апартаменты в стиле ЛОФТ.`,
  `Прекрасный частный домик.`,
  `Пентхаус в отеле.`
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const PRICE_MULTIPLIER = 10000;
const MAP_PIN_MAIN_OFFSET_X = 65;
const MAP_PIN_MAIN_OFFSET_Y = 65;
const TALE = 22;

let isPageActive = false;

const typeMap = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const map = document.querySelector(`.map`);
const similarPins = map.querySelector(`.map__pins`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const mapFilters = map.querySelector(`.map__filters`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
const mapFiltersControls = mapFilters.querySelectorAll(`.map__filter`);
const mapFiltersFieldset = mapFilters.querySelector(`.map__features`);
const mapPinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.querySelectorAll(`fieldset`);
const adFormInputAddress = adForm.querySelector(`input[name="address"]`);
const adFormSubmit = adForm.querySelector(`.ad-form__submit`);
const mapMainPin = map.querySelector(`.map__pin--main`);
const formInputTitle = adForm.querySelector(`select[name="title"]`);
const formInputAddress = adForm.querySelector(`input[name="address"]`);
const formInputType = adForm.querySelector(`select[name="type"]`);
const formInputPrice = adForm.querySelector(`select[name="price"]`);
const formInputTimeIn = adForm.querySelector(`select[name="timein"]`);
const formInputTimeOut = adForm.querySelector(`select[name="timeout"]`);
const formInputRooms = adForm.querySelector(`select[name="rooms"]`);
const formInputGuests = adForm.querySelector(`select[name="capacity"]`);
const housingRoomsOptions = formInputRooms.querySelectorAll(`option`);
const housingGuestsOptions = formInputRooms.querySelectorAll(`option`);
let cardPopupRef = null;

const getRandomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArray = (array) => {
  return array.slice(0, Math.floor(Math.random() * array.length));
};

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const getLocationX = () => getRandomInRange(MIN_LOCATION_X, MAX_LOCATION_X);

const getLocationY = () => getRandomInRange(MIN_LOCATION_Y, MAX_LOCATION_Y);

const calcAdAddress = () => {
  const x = Math.round(parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_OFFSET_X / 2);

  const y = Math.round(isPageActive ?
    parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_OFFSET_Y / 2 + TALE :
    parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_OFFSET_Y / 2);

  return `${x}, ${y}`;
};

const getPrice = () => Math.round(Math.random() * PRICE_MULTIPLIER);

const toggleAdFormElements = (nodes) => {
  nodes.forEach((node) => {
    node.disabled = !isPageActive;
  });
};

const activatePage = () => {
  isPageActive = true;

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  formInputAddress.value = calcAdAddress();

  toggleAdFormElements(adFormElements);
  toggleAdFormElements(mapFiltersControls);
};

const deActivatePage = () => {
  isPageActive = false;

  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);

  formInputAddress.value = calcAdAddress();

  toggleAdFormElements(adFormElements);
  toggleAdFormElements(mapFiltersControls);
};

const adFormValidation = () => {
  formInputTitle.addEventListener(`invalid`, () => {
    formInputTitle.addEventListener(`input`, () => {

    });
  });
  formInputRooms.addEventListener(`invalid`, (evt) => {
    evt.preventDefault();
    if (housingRoomsOptions.textContent === `1 комната` && housingGuestsOptions.textContent !== `для 1 гостя`) {
      formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
    } else if (housingRoomsOptions.textContent === `2 комнаты` && housingGuestsOptions.textContent !== `для 2 гостей`) {
      formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
    } else if (housingRoomsOptions.textContent === `3 комнаты` && housingGuestsOptions.textContent !== `для 3 гостей`) {
      formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
    } else if (housingRoomsOptions.textContent === `100 комнат` && housingGuestsOptions.textContent !== `не для гостей`) {
      formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
    } else {
      formInputRooms.setCustomValidity(``);
    }
  });
};

const onFormSubmit = () => {
  adFormSubmit.addEventListener(`submit`, () => {
    adFormValidation();
  });
};

const removeCard = () => {
  if (cardPopupRef) {
    map.removeChild(cardPopupRef);
    cardPopupRef = null;
    document.removeEventListener(`keydown`, onEscKeydownRemoveCard);
  }
};

const onEscKeydownRemoveCard = (evt) => {
  if (evt.key === `Escape`) {
    removeCard();
  }
};

const generateAds = (number) => {
  const ads = [];

  for (let i = 0; i < number; i++) {
    const data = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },
      offer: {
        title: getRandomArrayElement(TITLES),
        address: `${getLocationX()}` + `, ${getLocationY()}`,
        price: getPrice(),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomArrayElement(ROOMS),
        guests: getRandomArrayElement(GUESTS),
        checkin: getRandomArrayElement(CHECKIN),
        checkout: getRandomArrayElement(CHECKOUT),
        features: getRandomArray(FEATURES),
        description: getRandomArrayElement(DESCRIPTION),
        photos: getRandomArray(PHOTOS),
      },
      location: {
        x: getLocationX(),
        y: getLocationY()
      }
    };
    ads.push(data);
  }

  return ads;
};

const createPin = (ad) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  const image = pinElement.querySelector(`img`);

  image.src = ad.author.avatar;
  image.alt = ad.offer.title;
  pinElement.style = `left: ${ad.location.x}px; top: ${ad.location.y}px;`;

  const addCardToPin = () => {

    removeCard();

    return createCard(ad);
  };

  pinElement.addEventListener(`click`, () => {
    map.insertBefore(addCardToPin(), mapFiltersContainer);
  });

  pinElement.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      map.insertBefore(addCardToPin(), mapFiltersContainer);
    }
  });

  return pinElement;
};

const createCard = (ad) => {

  const {author, offer} = ad;

  const {avatar} = author;

  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer;

  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(`.popup__avatar`);
  const titleElement = cardElement.querySelector(`.popup__title`);
  const addressElement = cardElement.querySelector(`.popup__text--address`);
  const offerPriceElement = cardElement.querySelector(`.popup__text--price`);
  const typeElement = cardElement.querySelector(`.popup__type`);
  const capacityElement = cardElement.querySelector(`.popup__text--capacity`);
  const timeElement = cardElement.querySelector(`.popup__text--time`);
  const descElement = cardElement.querySelector(`.popup__description`);
  const featuresElement = cardElement.querySelector(`.popup__features`);
  const photosElement = cardElement.querySelector(`.popup__photos`);
  const photoElement = cardElement.querySelector(`.popup__photo`);
  const closeElement = cardElement.querySelector(`.popup__close`);

  imageElement.src = avatar;
  titleElement.textContent = title;
  addressElement.textContent = address;
  offerPriceElement.textContent = price + `₽/ночь`;
  typeElement.textContent = typeMap[type];
  capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  descElement.textContent = description;
  featuresElement.innerHTML = ``;
  photosElement.innerHTML = ``;

  for (let i = 0; i < features.length; i++) {
    const featureItem = document.createElement(`li`);

    featureItem.classList.add(`popup__feature`, `popup__feature--${features[i]}`);

    featuresElement.append(featureItem);
  }

  for (let i = 0; i < photos.length; i++) {
    const photoItem = photoElement.cloneNode();
    photoItem.src = `${photos[i]}`;
    photosElement.append(photoItem);
  }

  closeElement.addEventListener(`click`, removeCard);
  document.addEventListener(`keydown`, onEscKeydownRemoveCard);

  cardPopupRef = cardElement;

  return cardElement;
};

const renderPins = (array) => {
  if (map.classList.contains(`map--faded`)) {
    const fragment = document.createDocumentFragment();

    array.forEach((item) => fragment.appendChild(createPin(item)));

    similarPins.appendChild(fragment);
  }
};

const ads = generateAds(ADS_NUMBER);

deActivatePage();

mapMainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0 && isPageActive !== true) {
    renderPins(ads);
    activatePage();
    calcAdAddress();
  }
});

mapMainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter` && isPageActive !== true) {
    renderPins(ads);
    activatePage();
    calcAdAddress();
  }
});
