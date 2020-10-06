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
const RANDOM_ARRAY_MULTIPLIER = 10;
const PRICE_MULTIPLIER = 10000;
const PIN_OFFSET_X = 25;
const PIN_OFFSET_Y = 70;

const map = document.querySelector(`.map`);
const similarPins = map.querySelector(`.map__pins`);
const mapFilter = map.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

const getRandomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArray = (array) => {
  return array.slice(0, Math.floor(Math.random() * array.length * RANDOM_ARRAY_MULTIPLIER));
};

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];
const getLocationX = () => getRandomInRange(MIN_LOCATION_X, MAX_LOCATION_X);
const getLocationY = () => getRandomInRange(MIN_LOCATION_Y, MAX_LOCATION_Y);
const getPrice = () => Math.round(Math.random() * PRICE_MULTIPLIER);
const getDescription = () => getRandomArrayElement(DESCRIPTION);
const getFeature = () => getRandomArray(FEATURES);
const getPhoto = () => getRandomArray(PHOTOS);

const generateAds = (number) => {
  const ads = [];

  for (let i = 0; i < number; i++) {
    ads.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
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
        features: getFeature(),
        description: getDescription(),
        photos: getPhoto(),
      },
      location: {
        x: getLocationX(),
        y: getLocationY()
      }
    });
  }

  return ads;
};

map.classList.remove(`map--faded`);

const createPin = (ad) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  const image = pinElement.querySelector(`img`);

  image.src = ad.author.avatar;
  image.alt = ad.offer.title;
  pinElement.style = `left: ${getLocationX() - PIN_OFFSET_X}px; top: ${getLocationY() - PIN_OFFSET_Y}px;`;

  return pinElement;
};

const createCard = (ad) => {
  console.log(ad);

  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(`.popup__avatar`);
  const title = cardElement.querySelector(`.popup__title`);
  const address = cardElement.querySelector(`.popup__text--address`);
  const offerPrice = cardElement.querySelector(`.popup__text--price`);
  const type = cardElement.querySelector(`.popup__type`);
  const capacity = cardElement.querySelector(`.popup__text--capacity`);
  const time = cardElement.querySelector(`.popup__text--time`);
  const desc = cardElement.querySelector(`.popup__description`);
  const featureItem = cardElement.querySelector(`.popup__feature`);
  const currentFeatures = getFeature();
  const photos = cardElement.querySelector(`.popup__photos`);
  const photoItem = cardElement.querySelector(`.popup__photo`);
  const currentPhotos = getPhoto();

  image.src = ad.author.avatar;
  title.textContent = ad.offer.title;
  address.textContent = ad.offer.address;
  offerPrice.textContent = ad.offer.price + `₽/ночь`;
  type.textContent = ad.offer.type;
  capacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  time.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  desc.textContent = ad.offer.description;

  for (let i = 0; i < currentFeatures.length; i++) {
    featureItem.textContent = currentFeatures[i];
  }

  for (let j = 0; j < currentPhotos.length; j++) {
    photoItem.src = currentPhotos[j];
  }

  return cardElement;
};


const renderPins = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach((item) => fragment.appendChild(createPin(item)));

  similarPins.appendChild(fragment);
};

const renderCard = (item) => {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(createCard(item));

  map.insertBefore(fragment, mapFilter);
};

const ads = generateAds(ADS_NUMBER);
renderPins(ads);
renderCard(ads[0]);
