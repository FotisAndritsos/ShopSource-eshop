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
const viewItem = document.querySelector(".view-item");

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
              <i class="fas fa-eye view-btn" data-id=${product.id}></i>
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

      button.addEventListener("click", (event) => {
        //get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        //add product to  the cart

        cart.forEach((item, index) => {
          if (item.id === cartItem.id) {
            cartItem.amount = item.amount + 1;
            cart.splice(index, 1);
          }
        });

        cart = [...cart, cartItem];

        //save cart in local storage
        Storage.saveCart(cart);

        //set cart values
        this.setCartValues(cart);

        //display cart item
        this.addCartItem(cartItem);
        const yo = [...document.querySelectorAll(".cart-item-amount")];
        yo.forEach((item) => {
          let goDownOne = item.nextElementSibling;
          let cartCurrentAmm = item.innerHTML;
          let goDownOneID = goDownOne.dataset.id;
          if (goDownOneID === cartItem.id && cartCurrentAmm < cartItem.amount) {
            cartContainer.removeChild(
              goDownOne.parentElement.parentElement.parentElement
            );
          }
        });
      });
    });
  }
  getinfoButtons() {
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach((button) => {
      let id = button.dataset.id;

      button.addEventListener("click", (event) => {
        //get product from products
        let viewItemPro = { ...Storage.getProduct(id) };
        this.viewItemF(viewItemPro);

        viewItem.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-view-item")) {
        viewItem.classList.remove('active')
        let removeItem = event.target;
        viewItem.removeChild(removeItem.parentElement);
      }
        });
      });
    });
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
                    <i class="fas fa-chevron-left decrease" data-id=${item.id}></i>
                    <span class="cart-item-amount">${item.amount}</span>
                    <i class="fas fa-chevron-right increase" data-id=${item.id}></i>
                  </div>
                  <i class="fa fa-times close-cart-item" data-id=${item.id}></i>
                </div>`;
    cartContainer.appendChild(div);
  }
  viewItemF(item) {
    viewItem.classList.add('active')
    const div = document.createElement("div");
    div.classList.add("view-item-inside");
    div.innerHTML = `
                  <div class="view-item-img">
               <img src=${item.image} alt="" />
                  </div>
                  <div class="view-item-info">
                    <h1>${item.title} </h1>
                    <h2>$${item.price}</h2>
                  </div>
                  <i class="fa fa-times close-view-item"></i>
                
  `;
    viewItem.appendChild(div);
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

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  cartLogic() {
    //clear cart button
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    //cart functionality
    cartContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-cart-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContainer.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("increase")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.previousElementSibling.innerHTML = tempItem.amount;
      } else if (event.target.classList.contains("decrease")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.nextElementSibling.innerHTML = tempItem.amount;
        } else {
          cartContainer.removeChild(
            lowerAmount.parentElement.parentElement.parentElement
          );
          this.removeItem(id);
        }
      }
    });
  }
  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContainer.children.length > 0) {
      cartContainer.removeChild(cartContainer.children[0]);
    }
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    // let button = this.getSingeButton(id);
    // button.disabled = false;
  }
  // getSingeButton(id){
  //   return buttonsDOM.find(button => button.dataset.id
  //     === id);
  // }
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
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //set up application
  ui.setupAPP();

  //get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.getinfoButtons();
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
