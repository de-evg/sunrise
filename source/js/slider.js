var pictures = document.querySelectorAll('.gallery-list__item--img');
var slider = document.querySelector('#slider');
console.log(pictures);
document.addEventListener('click', function (evt) {
  console.log(evt.target);
});
pictures.forEach((picture) => picture.addEventListener('click', onPictureClick));

var picturesListElement = document.querySelector('.gallery__list gallery-list');

var onPictureClick = (evt) => {
  console.log(evt.target);
  if (!slider.classList.contains('.slider--show')) {
      slider.classList.add('slider--show');
  }
}
