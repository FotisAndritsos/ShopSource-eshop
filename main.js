const menuBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.close');
const nav = document.querySelector('.nav');



menuBtn.addEventListener('click',()=>{
  nav.classList.toggle('active');
  menuBtn.classList.add("active");
  closeBtn.classList.add('active')
})
closeBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.classList.remove("active");
  closeBtn.classList.remove("active");
});


var mySwiper2 = new Swiper(".swiper-container.swiper2", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper2.swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next.swiper2",
    prevEl: " .swiper-button-prev.swiper2",
    disabledClass: ".swiper2 .swiper-button-disabled",
  },
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
        400: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        868: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      }
});
 
var mySwiper = new Swiper(".swiper-container.swiper1", {
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
    },
  },
});
mySwiper.on('slideChange',  function () {
 gsap.fromTo(".pame", { opacity: 0,y:-100 }, { opacity: 1,y:0, duration: 1});
 gsap.fromTo(".pamere", {x:-100 }, { x:0, duration: 1.5});
 gsap.fromTo(".btn", {y:100 }, { y:0, duration: 2});
  
    })


    
    