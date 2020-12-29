//3.04 time
// variables
const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".close");
const nav = document.querySelector(".nav");
const cartShow = document.querySelector(".cart-show");
const closeCart = document.querySelector(".close-cart");
const cartIcon = document.querySelector(".cart-icon");
//spec
const productsDOM = document.querySelector(".swiper-wrapper.swiper2");
const cartValue = document.querySelector(".cart-value");
const cartTotal = document.querySelector(".total-amount");
const cartContainer = document.querySelector(".cart-container");
const clearCartBtn = document.querySelector(".clear-cart");

cartIcon.addEventListener("click", () => {
  cartShow.classList.add("active");
});
closeCart.addEventListener("click", () => {
  cartShow.classList.remove("active");
});
//cart
let cart = [];
let buttonsDOM = [];
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
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      // let inCart = cart.find(item=>item.id === id);

      button.addEventListener("click", (event) => {
        //get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        //add product to  the cart
        cart = [...cart, cartItem];
        //save cart in local storage
        Storage.saveCart(cart);
        //set cart values
        this.setCartValues(cart);
        //display cart item
        this.addCartItem(cartItem);
        //show the cart
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerHTML = parseFloat(tempTotal.toFixed(2));
    cartValue.innerHTML = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
    <div class="left-side-cart">
                  <div class="cart-img-cont">
                    <img src=${item.image} alt="" />
                  </div>
                  <div class="cart-info">
                    <h4>${item.title} </h4>
                    <p>$${item.price}</p>
                  </div>
                </div>
                <div class="right-side-cart">
                  <div class="cart-counter">
                    <span><i class="fas fa-chevron-left decrease" data-id=${item.id}></i></span>
                    <span class="cart-item-amount">${item.amount}</span>
                    <span><i class="fas fa-chevron-right increase" data-id=${item.id}></i></span>
                  </div>
                  <i class="fa fa-times close-cart-item" data-id=${item.id}></i>
                </div>`;
                cartContainer.appendChild(div);
                
  }
  setupAPP(){
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
  }
  populateCart(cart){
    cart.forEach(item =>this.addCartItem(item));
  }
  cartLogic(){
    //clear cart button
    clearCartBtn.addEventListener('click',()=>{
this.clearCart()
    })
    //cart functionality
}
  clearCart(){
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id))
  }
  removeItem(id){
    cart = cart.filter(item =>item.id !==id);
  }
}
//local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart(){
    return localStorage.getItem('cart')?
    JSON.parse(localStorage.getItem('cart')):[];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //set up application
  ui.setupAPP();

  //get all products
  products.getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    })
    .then(() => {
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
