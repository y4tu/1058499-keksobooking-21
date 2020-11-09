(()=>{"use strict";(()=>{const e=(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e);window.util={isPageActive:!1,getRandomInRange:e,getRandomArray:e=>e.slice(0,Math.floor(Math.random()*e.length)),getRandomArrayElement:e=>e[Math.floor(Math.random()*e.length)],getLocation:(t,o)=>e(t,o),getPrice:e=>Math.round(Math.random()*e),toggleAdFormElements:(e,t)=>{for(let o=0;o<e.length;o++)e[o].disabled=!t}}})(),window.debounce={execute:e=>{let t=null;return o=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(o)}),300)}}},(()=>{const e="https://21.javascript.pages.academy/keksobooking",t=(e,t,o)=>{e.addEventListener("load",(()=>{200===e.status?t(e.response):o(`Статус ответа: ${e.status} ${e.statusText}.`)})),e.addEventListener("error",(function(){o("Произошла ошибка соединения.")})),e.addEventListener("timeout",(function(){o(`Запрос не успел выполниться за ${e.timeout} мс.`)})),e.timeout=1e4};window.backend={download:(o,n)=>{const r=new XMLHttpRequest;r.responseType="json",t(r,o,n),r.open("GET",e+"/data"),r.send()},upload:(o,n,r)=>{const a=new XMLHttpRequest;a.responseType="json",t(a,n,r),a.open("POST",e),a.send(o)}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form-header__input"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector(".ad-form__input"),r=document.querySelector(".ad-form__photo");let a=!1;const s=(t,o)=>{const n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){a=!0;const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result,o.style="height: auto"})),e.readAsDataURL(n)}};t.addEventListener("change",(()=>{s(t,o)})),n.addEventListener("change",(()=>{const e=(()=>{r.style="display: flex; justify-content: center; align-items: center;";const e=document.createElement("img");r.appendChild(e);const t=r.querySelector("img");return t.classList.add("visually-hidden"),t.width=60,t.src="#",t})();s(n,e),a&&e.classList.remove("visually-hidden")})),window.photos={resetAvatar:()=>{o.src="img/muffin-grey.svg"},resetImagePreview:()=>{const e=r.querySelector("img");r.contains(e)&&r.removeChild(e)}}})(),(()=>{const e=document.querySelectorAll("select"),t=document.querySelectorAll("input"),o=document.querySelector("textarea"),n=document.querySelector(".map").querySelector(".map__pin--main"),r=document.querySelector(".ad-form"),a=r.querySelector("#address"),s=r.querySelector("#title"),l=r.querySelector("#type"),i=r.querySelector("#price"),d=r.querySelector("#timein"),c=r.querySelector("#timeout"),u=r.querySelector("#room_number"),p=r.querySelector("#capacity"),m={bungalow:0,flat:1e3,house:5e3,palace:1e4},y=(e,t)=>{const o=Math.round(e+32.5),n=Math.round(window.util.isPageActive?t+32.5+22:t+32.5);a.value=`${o}, ${n}`},w=e=>{c.value=e.target.value,d.value=e.target.value},v=()=>{100==+u.value&&0!=+p.value?u.setCustomValidity("Не для гостей"):100!=+u.value&&0==+p.value||0!=+p.value&&+u.value<+p.value?u.setCustomValidity("Слишком мало места"):u.setCustomValidity(""),u.reportValidity()};s.addEventListener("change",(e=>{0===e.target.value.length?s.setCustomValidity("Введите заголовок!"):e.target.value.length<30?s.setCustomValidity("Не менее 30 символов!"):e.target.value.length>100?s.setCustomValidity("Не более 100 символов!"):s.setCustomValidity("")})),i.addEventListener("change",(()=>{i.min=m[l.value],i.max=1e6,i.placeholder=m[l.value],i.value<+i.min||i.value>+i.max?i.setCustomValidity(`От ${i.min} до ${i.max}`):i.setCustomValidity("")})),d.addEventListener("change",w),c.addEventListener("change",w),u.addEventListener("change",v),p.addEventListener("change",v),r.addEventListener("submit",v),window.form={calcAdAddress:y,enableForm:()=>{r.classList.remove("ad-form--disabled"),y(parseInt(n.style.left,10),parseInt(n.style.top,10)),window.util.toggleAdFormElements(e,window.util.isPageActive),window.util.toggleAdFormElements(t,window.util.isPageActive),o.disabled=!window.util.isPageActive},disableForm:()=>{r.classList.add("ad-form--disabled"),y(parseInt(n.style.left,10),parseInt(n.style.top,10)),window.util.toggleAdFormElements(e,window.util.isPageActive),window.util.toggleAdFormElements(t,window.util.isPageActive),o.disabled=!window.util.isPageActive},onRoomsInput:v}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#error").content.querySelector(".error"),o=document.querySelector("#success").content.querySelector(".success");window.messages={showErrorMessage:o=>{e.appendChild(t.cloneNode(!0)),document.querySelector(".error__message").textContent=o;const n=document.querySelector(".error"),r=()=>{e.removeChild(n),document.removeEventListener("keydown",a)},a=t=>{"Escape"===t.key&&e.contains(n)&&r()};n.addEventListener("click",(()=>{e.contains(n)&&r()})),document.addEventListener("keydown",a)},showSuccessMessage:()=>{e.appendChild(o.cloneNode(!0));const t=document.querySelector(".success"),n=()=>{e.removeChild(t),document.removeEventListener("keydown",r)},r=o=>{"Escape"===o.key&&e.contains(t)&&n()};t.addEventListener("click",(()=>{e.contains(t)&&n()})),document.addEventListener("keydown",r)}}})(),(()=>{const e=Math.floor(75.5),t=Math.floor(575.5),o=Math.floor(-32.5),n=Math.floor(1167.5);window.dragAndDrop={moveElement:(r,a)=>{r.addEventListener("mousedown",(r=>{r.preventDefault();let s={x:r.clientX,y:r.clientY};const l=function(r){r.preventDefault();let l=s.x-r.clientX,i=s.y-r.clientY;s={x:r.clientX,y:r.clientY},parseInt(a.style.top,10)>t?a.style.top=t+"px":parseInt(a.style.top,10)<e?a.style.top=e+"px":a.style.top=a.offsetTop-i+"px",parseInt(a.style.left,10)>n?a.style.left=n+"px":parseInt(a.style.left,10)<o?a.style.left=o+"px":a.style.left=a.offsetLeft-l+"px",window.form.calcAdAddress(parseInt(a.style.left,10),parseInt(a.style.top,10))},i=function(e){e.preventDefault(),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",i)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",i)}))}}})(),(()=>{const e="any",t=document.querySelector(".map").querySelector(".map__filters"),o=t.querySelector("#housing-type"),n=t.querySelector("#housing-price"),r=t.querySelector("#housing-rooms"),a=t.querySelector("#housing-guests"),s=t=>{switch(n.value){case e:return!0;case"low":return t.offer.price<1e4;case"middle":return t.offer.price<=5e4&&t.offer.price>=1e4;case"high":return t.offer.price>5e4}return!1},l=t=>+r.value===t.offer.rooms||r.value===e,i=t=>a.value<=t.offer.guests||a.value===e,d=e=>{const o=t.querySelectorAll(".map__checkbox:checked");return Array.from(o).every((t=>e.offer.features.includes(t.value)))},c=t=>{const n=[];let r=0;for(let c=0;c<t.length&&(r++,a=t[c],(o.value===a.offer.type||o.value===e)&&s(t[c])&&l(t[c])&&i(t[c])&&d(t[c])&&n.push(t[c]),5!==r);c++);var a;return n};t.addEventListener("change",window.debounce.execute((()=>{const e=c(window.data);window.pin.render(e)}))),window.filter={getOffers:c}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector("#card").content.querySelector(".map__card"),o={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"};let n=null;const r=()=>{n&&(e.removeChild(n),n=null,document.removeEventListener("keydown",a),window.pin.dropActiveClass())},a=e=>{"Escape"===e.key&&r()};window.card={create:e=>{const{author:s,offer:l}=e,{avatar:i}=s,{title:d,address:c,price:u,type:p,rooms:m,guests:y,checkin:w,checkout:v,features:f,description:g,photos:h}=l,_=t.cloneNode(!0),S=_.querySelector(".popup__avatar"),q=_.querySelector(".popup__title"),E=_.querySelector(".popup__text--address"),L=_.querySelector(".popup__text--price"),x=_.querySelector(".popup__type"),A=_.querySelector(".popup__text--capacity"),C=_.querySelector(".popup__text--time"),k=_.querySelector(".popup__description"),M=_.querySelector(".popup__features"),b=_.querySelector(".popup__photos"),P=_.querySelector(".popup__photo"),I=_.querySelector(".popup__close");S.src=i,q.textContent=d,E.textContent=c,L.textContent=u+"₽/ночь",x.textContent=o[p],A.textContent=`${m} комнаты для ${y} гостей`,C.textContent=`Заезд после ${w}, выезд до ${v}`,k.textContent=g,M.innerHTML="",b.innerHTML="";for(let e=0;e<f.length;e++){const t=document.createElement("li");t.classList.add("popup__feature","popup__feature--"+f[e]),M.append(t)}for(let e=0;e<h.length;e++){const t=P.cloneNode();t.src=""+h[e],b.append(t)}if(I.addEventListener("click",r),document.addEventListener("keydown",a),n=_,_.hasChildNodes()){const e=_.childNodes;for(let t=2;t<e.length;t++)""===e[t].textContent&&_.removeChild(e[t])}return _},remove:r}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pins"),o=e.querySelector(".map__filters-container"),n=document.querySelector("#pin").content.querySelector(".map__pin");let r=null;const a=()=>{t.querySelectorAll(".map__pin").forEach((e=>{e.classList.contains("map__pin--active")&&e.classList.remove("map__pin--active")}))},s=t=>{const s=n.cloneNode(!0),l=s.querySelector("img");r=s,l.src=t.author.avatar,l.alt=t.offer.title,s.style=`left: ${t.location.x}px; top: ${t.location.y}px;`;const i=()=>(window.card.remove(),window.card.create(t));return s.addEventListener("click",(()=>{e.insertBefore(i(),o),a(),s.classList.add("map__pin--active")})),s.addEventListener("keydown",(t=>{"Enter"===t.key&&(e.insertBefore(i(),o),a(),s.classList.add("map__pin--active"))})),s},l=()=>{const e=document.querySelectorAll(".map__pin");document.querySelector(".map__pin--main").style="left: 570px; top: 375px;";for(let o=1;o<e.length;o++)t.removeChild(e[o])};window.pin={dropActiveClass:a,create:s,render:e=>{window.card.remove(),l();const o=document.createDocumentFragment();e.forEach((e=>o.appendChild(s(e)))),t.appendChild(o)},remove:l}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pin--main"),o=document.querySelector(".ad-form"),n=document.querySelector(".ad-form__reset"),r=document.querySelector(".map__filters"),a=e.querySelector(".map__filters");let s=null;const l=e=>{window.data=e;const t=window.filter.getOffers(e);window.pin.render(t,s)},i=e=>{p(),window.messages.showErrorMessage(e)},d=()=>{c(),window.messages.showSuccessMessage()},c=()=>{o.reset(),a.reset(),window.photos.resetAvatar(),window.photos.resetImagePreview(),p()},u=()=>{window.util.isPageActive=!0,e.classList.remove("map--faded"),window.backend.download(l,i),window.form.enableForm()},p=()=>{window.util.isPageActive=!1,e.classList.add("map--faded"),window.pin.remove(),window.card.remove(),window.form.disableForm()};t.addEventListener("mousedown",(e=>{0===e.button&&!0!==window.util.isPageActive&&u()})),t.addEventListener("keydown",(e=>{"Enter"===e.key&&!0!==window.util.isPageActive&&u()})),o.addEventListener("submit",(e=>{e.preventDefault(),o.checkValidity()&&window.backend.upload(new FormData(o),d,i)})),n.addEventListener("click",(e=>{e.preventDefault(),c()})),n.addEventListener("keydown",(e=>{e.preventDefault(),"Enter"===e.key&&c(e)})),r.addEventListener("click",(e=>{s=e.target})),p(),window.dragAndDrop.moveElement(t,t)})()})();