var pictureStorage = localStorage;

var galleryElement = document.querySelector('.gallery-list');
var pictures = document.querySelectorAll('.picture__img');
pictures.forEach((picture, i) => picture.id = i);
var onPictureClick = (evt) => {

  if (evt.target.tagName === 'IMG') {

    let images = {};
    let currentImg = evt.target.cloneNode(true);
    let currentTitle = evt.target.parentNode.querySelector('.picture__title').textContent;
    console.log(currentTitle);
    images['CURRENT'] = {
      SRC: currentImg.src,
      TITLE: currentTitle
    };

    if (+evt.target.id > 0) {
      let prevImg = pictures[evt.target.id - 1].cloneNode(true);
      images['PREVIOUS'] = {
        SRC: prevImg.src
      };
    }
    if (+evt.target.id < pictures.length - 1) {
      let nextImg = pictures[+evt.target.id + 1].cloneNode(true);
      images['NEXT'] = {
        SRC: nextImg.src
      };
    }
    let data = JSON.stringify(images);
    pictureStorage.setItem('images', data);
  }
}

galleryElement.addEventListener('click', onPictureClick);
