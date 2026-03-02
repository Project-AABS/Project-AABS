var swiper = new Swiper(".movieSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,               // infinite sliding
    autoplay: {
        delay: 9000,          // auto-slide every 2 sec
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


   