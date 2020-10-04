"use strict";

const ADS_NUMBER = 8;
const TITLES = [`Шейх`, `Лепс`, `Спарк`, `Ваниш`, `Афродита`, `Дженифер`, `Церцея`, `Бусилия`];
const MIN_LOCATIONS_X = 100;
const MAX_LOCATIONS_X = 1000;
const MIN_LOCATIONS_Y = 130;
const MAX_LOCATIONS_Y = 630;
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
const map = document.querySelector(`.map`);
const similarPins = map.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);


const locationX = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const locationY = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getTitle = () => TITLES[Math.floor(Math.random() * TITLES.length)];
const getLocationX = () => locationX(MIN_LOCATIONS_X, MAX_LOCATIONS_X);
const getLocationY = () => locationY(MIN_LOCATIONS_Y, MAX_LOCATIONS_Y);
const getPrice = () => Math.round(Math.random() * 10000);
const getType = () => TYPES[Math.floor(Math.random() * TYPES.length)];
const getRoom = () => ROOMS[Math.floor(Math.random() * ROOMS.length)];
const getGuest = () => GUESTS[Math.floor(Math.random() * GUESTS.length)];
const getCheckin = () => CHECKIN[Math.floor(Math.random() * CHECKIN.length)];
const getCheckout = () => CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)];

const getFeatures = () => {
  const currentFeatures = [];

  for (let i = 0; i < FEATURES.length - 3; i++) {
    currentFeatures[i] = FEATURES[Math.floor(Math.random() * FEATURES.length)];
  }

  return currentFeatures;
};

const getDescription = () => DESCRIPTION[Math.floor(Math.random() * DESCRIPTION.length)];
const getPhotos = () => PHOTOS[Math.floor(Math.random() * PHOTOS.length)];

const generateAds = (number) => {
  const ads = [];

  for (let i = 0; i < number; i++) {
    ads.push({
      author: {
        avatar: `img/avatars/user0` + (i + 1).toString() + `.png`
      },
      offers: {
        title: getTitle(),
        address: `${getLocationX()}` + `, ${getLocationY()}`,
        price: getPrice(),
        type: getType(),
        rooms: getRoom(),
        guests: getGuest(),
        checkin: getCheckin(),
        checkout: getCheckout(),
        features: getFeatures(),
        description: getDescription(),
        photos: getPhotos(),
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
  image.alt = ad.offers.title;
  pinElement.style = `left: ${getLocationX() + 20}px; top: ${getLocationY() + 40}px;`;

  return pinElement;
};

const renderPins = (array) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createPin(array[i]));
  }

  similarPins.appendChild(fragment);
};

const ads = generateAds(ADS_NUMBER);
renderPins(ads);

/*  {
    "author": {
    "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
    "offer": {
        "title": строка, заголовок предложения
        "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        "price": число, стоимость
        "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
        "rooms": число, количество комнат
        "guests": число, количество гостей, которое можно разместить
        "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
          "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
          "description": строка с описанием,
          "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    "location": {
    "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    "y": случайное число, координата y метки на карте от 130 до 630.
  }
  }*/
