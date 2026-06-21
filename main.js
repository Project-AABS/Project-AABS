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
    // Track scroll position to detect direction
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN and past 100px — hide navbar
        header.classList.add("hide-nav");
    } else {
        // Scrolling UP — show navbar
        header.classList.remove("hide-nav");
    }

    // Update last position for next scroll event
    lastScrollY = currentScrollY;
});

   