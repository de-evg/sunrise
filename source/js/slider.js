'use strict';

var pictureStorage = localStorage;
var slider = document.querySelector('#slider');
var slideList = slider.querySelector('.slider__list');


// var currentImgContainer = slider.querySelector('.slider__item--currentImg');
// var prevImgContainer = slider.querySelector('.slider__item--prevImg');
// var nextImgContainer = slider.querySelector('.slider__item--nextImg');
var getIdFromStorage = () => pictureStorage.getItem('images');
var getSrcFromStorage = () => pictureStorage.getItem('imgSources');
var imgId = JSON.parse(getIdFromStorage());
var imgSources = JSON.parse(getSrcFromStorage());

var ContainerPosition = {
  PREV: 'slider__item--prevImg',
  CURRENT: 'slider__item--currentImg',
  NEXT: 'slider__item--nextImg'
};

var genrateSLide = (imgSources) => {
  imgSources.forEach((img) => {
    let li = document.createElement('li');
    slideList.appendChild(li);
  });
}

var appendImg = (srcData) => {

  let srcKeys = Object.keys(srcData);
  srcKeys.forEach((key, i) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = srcData[key];
    img.id = key;
    img.width = 800;
    img.height = 600;
    img.classList.add('slider__img');
    li.appendChild(img);
    slideList.appendChild(li);
  });
};

var k = -50;
var currentImgNumber;
var setCurrentImg = (idData, containerPosition) => {
  let idKeys = Object.keys(idData);
  idKeys.forEach((key) => {
    let img = slideList.querySelector('#'+ idData[key].ID);
    img.parentNode.classList.add(containerPosition[key]);
    if (key ===  'CURRENT') {
      currentImgNumber = idData[key].ID.slice(3);
      k = k * currentImgNumber;
      let value = `translateX(${k}%)`;
      slideList.style.transform = value;
    }
  });
}

appendImg(imgSources);
setCurrentImg(imgId, ContainerPosition);
var slides = slideList.querySelectorAll('img');

let onImgClick = (evt) => {
  if (!slideList.classList.contains('slider__list--animation')) {
    slideList.classList.add('slider__list--animation');
  }
  if (evt.target.parentNode.classList.contains('slider__item--nextImg')) {
    if (slideList.style.transform) {
      k += -50;
    }
    let value = `translateX(${k}%)`;
    slideList.style.transform = value;
    evt.target.parentNode.classList.remove('slider__item--nextImg');
    let id = evt.target.id.slice(3);

    if (+id > 1) {
      let prevImgOldId = 'img' + (+id - 2);
      let prevOldSlide = slideList.querySelector('#' + prevImgOldId);
      prevOldSlide.parentNode.classList.remove('slider__item--prevImg');
    }

    let newNextImgId = 'img' + (+id + 1);
    if (newNextImgId.slice(3) < slides.length) {
      let newNextSlide = slideList.querySelector('#' + newNextImgId);
      newNextSlide.parentNode.classList.add('slider__item--nextImg');
    }

    let newPrevImgId = 'img' + (+id - 1);
    let newPrevSlide = slideList.querySelector('#' + newPrevImgId);
    newPrevSlide.parentNode.classList.remove('slider__item--currentImg');
    newPrevSlide.parentNode.classList.add('slider__item--prevImg');

    evt.target.parentNode.classList.add('slider__item--currentImg');

  }
  if (evt.target.parentNode.classList.contains('slider__item--prevImg')) {
    if (slideList.style.transform) {
      k += 50;
    }
    let value = `translateX(${k}%)`;
    slideList.style.transform = value;
    evt.target.parentNode.classList.remove('slider__item--prevImg');
    let id = evt.target.id.slice(3);
    let newNextImgId = 'img' + (+id + 1);

    if (+id < slides.length - 1) {
      let nextImgOldId = 'img' + (+id + 1);
      let nextOldSlide = slideList.querySelector('#' + nextImgOldId);
      nextOldSlide.parentNode.classList.remove('slider__item--nextImg');
    }

    let newNextSlide = slideList.querySelector('#' + newNextImgId);
    newNextSlide.parentNode.classList.remove('slider__item--currentImg');
    newNextSlide.parentNode.classList.add('slider__item--nextImg');


    let newPrevImgId = 'img' + (+id - 1);
    if (newPrevImgId.slice(3) >= 0) {
      let newPrevSlide = slideList.querySelector('#' + newPrevImgId);
      newPrevSlide.parentNode.classList.add('slider__item--prevImg');
    }

    evt.target.parentNode.classList.add('slider__item--currentImg');
  }
};

slider.addEventListener('click', onImgClick);
