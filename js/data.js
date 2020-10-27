'use strict';

(() => {
  const ADS_NUMBER = 8;
  const TITLES = [`Шейх`, `Лепс`, `Спарк`, `Ваниш`, `Афродита`, `Дженифер`, `Церцея`, `Бусилия`];
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
  const MIN_LOCATION_X = 0;
  const MAX_LOCATION_X = 1200;
  const MIN_LOCATION_Y = 130;
  const MAX_LOCATION_Y = 630;
  const PRICE_MULTIPLIER = 10000;

  const generateAds = (number) => {
    const ads = [];

    for (let i = 0; i < number; i++) {
      const data = {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`,
        },
        offer: {
          title: window.util.getRandomArrayElement(TITLES),
          address: `${window.util.getLocation(MIN_LOCATION_X, MAX_LOCATION_X)}` +
            `, ${window.util.getLocation(MIN_LOCATION_Y, MAX_LOCATION_Y)}`,
          price: window.util.getPrice(PRICE_MULTIPLIER),
          type: window.util.getRandomArrayElement(TYPES),
          rooms: window.util.getRandomArrayElement(ROOMS),
          guests: window.util.getRandomArrayElement(GUESTS),
          checkin: window.util.getRandomArrayElement(CHECKIN),
          checkout: window.util.getRandomArrayElement(CHECKOUT),
          features: window.util.getRandomArray(FEATURES),
          description: window.util.getRandomArrayElement(DESCRIPTION),
          photos: window.util.getRandomArray(PHOTOS),
        },
        location: {
          x: window.util.getLocation(MIN_LOCATION_X, MAX_LOCATION_X),
          y: window.util.getLocation(MIN_LOCATION_Y, MAX_LOCATION_Y),
        }
      };
      ads.push(data);
    }

    return ads;
  };

  const ads = generateAds(ADS_NUMBER);

  window.data = {
    ads,
    generateAds,
  };
})();
