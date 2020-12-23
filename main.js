

var mySwiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    disabledClass: ".swiper-button-disabled",
  },
  autoplay: {
    delay: 5000,
  },
  on: {
    init: function () {

      gsap.fromTo(
        ".pame",
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 1 }
      );
      gsap.fromTo(".pamere", { x: -100 }, { x: 0, duration: 1.5 });
      gsap.fromTo(".btn", { y: 100 }, { y: 0, duration: 2 });
      }
    },
  });
mySwiper.on('slideChange',  function () {
 gsap.fromTo(".pame", { opacity: 0,y:-100 }, { opacity: 1,y:0, duration: 1});
 gsap.fromTo(".pamere", {x:-100 }, { x:0, duration: 1.5});
 gsap.fromTo(".btn", {y:100 }, { y:0, duration: 2});
  
    })