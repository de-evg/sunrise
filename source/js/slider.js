var pictureStorage = localStorage;
var slider = document.querySelector('#slider');
var currentImgContainer = slider.querySelector('.slider__item--currentImg');
var prevImgContainer = slider.querySelector('.slider__item--prevImg');
var nextImgContainer = slider.querySelector('.slider__item--nextImg');
var getSrcFromStorage = () => pictureStorage.getItem('images');
var imgSources = JSON.parse(getSrcFromStorage());
var ImgContainer = {
  CURRENT: currentImgContainer,
  PREVIOUS: prevImgContainer,
  NEXT: nextImgContainer
}
console.log(imgSources);

var srcKeys = Object.keys(imgSources);
srcKeys.forEach((key) => {
  var img = document.createElement('img');
  img.src = imgSources[key].SRC;
  img.width = 1024;
  img.height = 768;
  img.classList.add('slider__img');
  ImgContainer[key].appendChild(img);
  if (key === 'CURRENT') {
    var title = document.createElement('h2');
    title.textContent = imgSources[key].TITLE;
    title.classList.add('picture__title');
    ImgContainer[key].appendChild(title);
  }
  pictureStorage.clear();
});
