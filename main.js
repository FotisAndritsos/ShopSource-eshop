// variables
const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".close");
const nav = document.querySelector(".nav");
//spec
const productsDOM = document.querySelector(".swiper-wrapper.swiper2");

//cart
let cart = [];

//getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();

      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
//display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <div class="swiper-slide swiper2">
            <div class="img-area">
              <img src=${product.image} alt="" />
            </div>
            <div class="body-area">
              <h3>${product.title}</h3>
              <p>$${product.price}</p>
            </div>
            <div class="hidden-option">
              <i class="fas fa-eye"></i>
              <i class="fas fa-shopping-cart bag-btn" data-id=${product.id}></i>
            </div>
          </div>
      `;
    });
    productsDOM.innerHTML = result;
  }
  getBagButtons(){
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach(btn => {
      btn.addEventListener("click",(event)=>{
        console.log(event.target);
      })
    })
  }
}
//local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //get all products

  products.getProducts().then((products) => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(()=>{
    ui.getBagButtons();
  }).then(()=>{
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
        },
      },
    });

  });
});






menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.classList.add("active");
  closeBtn.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.classList.remove("active");
  closeBtn.classList.remove("active");
});

// var mySwiper2 = new Swiper(".swiper-container.swiper2", {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: ".swiper2.swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next.swiper2",
//     prevEl: " .swiper-button-prev.swiper2",
//     disabledClass: ".swiper2 .swiper-button-disabled",
//   },
//   autoplay: {
//     delay: 5000,
//   },
//   breakpoints: {
//     400: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     868: {
//       slidesPerView: 3,
//       spaceBetween: 40,
//     },
//   },
// });

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
mySwiper.on("slideChange", function () {
  gsap.fromTo(
    ".pame",
    { opacity: 0, y: -100 },
    { opacity: 1, y: 0, duration: 1 }
  );
  gsap.fromTo(".pamere", { x: -100 }, { x: 0, duration: 1.5 });
  gsap.fromTo(".btn", { y: 100 }, { y: 0, duration: 2 });
});
