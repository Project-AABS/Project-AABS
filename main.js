var swiper = new Swiper(".movieswiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,              
    autoplay: {
        delay: 9000,          
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

var swiper = new Swiper(".home", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
     
    });
    
var swiper = new Swiper(".offers", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
     
    });
    

   