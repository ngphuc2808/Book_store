$(document).ready(function(){
  $('.slider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    draggable: true,
    dots: true,
    arrows: true,
    nextArrow: `<button class="slick-next"><i class="fa-solid fa-angle-right"></i></button>`,
    prevArrow: `<button class="slick-prev"><i class="fa-solid fa-angle-left"></i></button>`
  });
  $('.favorite-rating').rateYo({
    rating: 0,
    spacing: '3px',
    starWidth: '14px',
    starHeight: '14px',
    numStars: 5,
    minValue: 0,
    maxValue: 5,
    normalFill: '#999',
    ratedFill: '#c92127',
  });
});


