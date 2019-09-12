'use strict';

var pictureStorage = localStorage;
pictureStorage.clear();
var galleryElement = document.querySelector('.gallery-list');
var pictures = document.querySelectorAll('.picture__img');
var pictureSources = {};
pictures.forEach((picture, i) => {
  let srcKey = 'img' + i;
  picture.id = srcKey;
  pictureSources[srcKey] = picture.src;
});
var picturesSrcData = JSON.stringify(pictureSources);
pictureStorage.setItem('imgSources', picturesSrcData);

var onPictureClick = (evt) => {

  if (evt.target.tagName === 'IMG') {

    let images = {};
    let currentImg = evt.target.cloneNode(true);
    let currentTitle = evt.target.parentNode.querySelector('.picture__title').textContent;
    console.log(currentTitle);
    images['CURRENT'] = {
      ID: currentImg.id,
      TITLE: currentTitle
    };

    if (+evt.target.id.slice(3) > 0) {
      let prevImg = pictures[(+evt.target.id.slice(3) - 1)].cloneNode(true);
      images['PREV'] = {
        ID: prevImg.id
      };
    }
    if (+evt.target.id.slice(3) < pictures.length - 1) {
      let nextImg = pictures[(+evt.target.id.slice(3) + 1)].cloneNode(true);
      images['NEXT'] = {
        ID: nextImg.id
      };
    }
    let data = JSON.stringify(images);
    pictureStorage.setItem('images', data);
  }
}

galleryElement.addEventListener('click', onPictureClick);
