function createCartItem(cartItemData) {
  const { imageSrc, title, description, price, quantity } = cartItemData;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const cartItemLeft = document.createElement("div");
  cartItemLeft.classList.add("cart-item-left");

  const img = document.createElement("img");
  img.src = "../" + imageSrc;
  img.alt = "";

  const cartItemLeftActions = document.createElement("div");
  cartItemLeftActions.classList.add("cart-item-left-actions");

  const itemNameLink = document.createElement("a");
  itemNameLink.href = "#";
  itemNameLink.textContent = title + " - " + description;

  const cartItemAmount = document.createElement("div");
  cartItemAmount.classList.add("cart-item-amount");

  const trashButton = document.createElement("button");
  trashButton.innerHTML =
    cartItemData.quantity > 1
      ? '<ion-icon name="remove"></ion-icon>'
      : '<ion-icon name="trash-outline"></ion-icon>';
  trashButton.addEventListener("click", () => decreaseQuantity(cartItemData));

  const amountText = document.createElement("p");
  amountText.textContent = quantity;

  const addButton = document.createElement("button");
  addButton.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
  addButton.addEventListener("click", () => increaseQuantity(cartItemData));

  cartItemAmount.appendChild(trashButton);
  cartItemAmount.appendChild(amountText);
  cartItemAmount.appendChild(addButton);

  cartItemLeftActions.appendChild(itemNameLink);
  cartItemLeftActions.appendChild(cartItemAmount);

  cartItemLeft.appendChild(img);
  cartItemLeft.appendChild(cartItemLeftActions);

  const cartItemRight = document.createElement("div");
  cartItemRight.classList.add("cart-item-right");

  const closeButton = document.createElement("button");
  closeButton.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  closeButton.addEventListener("click", () => removeProduct(cartItemData));

  const priceText = document.createElement("p");
  priceText.textContent = getPrice(price * quantity) + " ₸";

  cartItemRight.appendChild(closeButton);
  cartItemRight.appendChild(priceText);

  cartItem.appendChild(cartItemLeft);
  cartItem.appendChild(cartItemRight);

  return cartItem;
}

function getPrice(price) {
  let priceStr = String(price);
  if (priceStr.length > 4) {
    const priceSlices = [];
    for (let i = priceStr.length - 3; i >= 0; i -= 3) {
      priceSlices.unshift(priceStr.slice(i > 0 ? i : 0, i + 3));
      priceStr = priceStr.slice(0, i);
    }
    priceSlices.unshift(priceStr);
    priceStr = priceSlices.join(" ");
  }
  return priceStr;
}

function removeProduct(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id != product.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function increaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // if (product.quantity > 1) {
  cart = cart.map((p) =>
    p.id == product.id ? { ...p, quantity: p.quantity + 1 } : p
  );
  // } 
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function decreaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (product.quantity > 1) {
    cart = cart.map((p) =>
      p.id == product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
  } else {
    cart = cart.filter((p) => p.id !== product.id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function getPrices() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length == 0) {
    return {
      productsPrice: 0,
      deliveryPrice: 0,
      totalPrice: 0,
    };
  }
  let productsPrice = 0;
  cart.forEach(
    (cartItem) => (productsPrice += cartItem.price * cartItem.quantity)
  );
  const deliveryPrice = productsPrice > 20000 ? 0 : 1000;
  const totalPrice = productsPrice + deliveryPrice;
  return {
    productsPrice,
    deliveryPrice,
    totalPrice,
  };
}

function getCartSize() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.length;
}

const cart = localStorage.getItem("cart");
const cartItems = JSON.parse(cart) || [];
for (const item of cartItems) {
  const card = createCartItem(item);
  document.querySelector(".cart-items").appendChild(card);
}

const clearCartButton = document.querySelector("#clear-cart");
clearCartButton.addEventListener("click", () => {
  localStorage.removeItem("cart");
  window.location.reload();
});

{
  const prdPriceText = document.querySelector("#products-price");
  const delPriceText = document.querySelector("#delivery-price");
  const totalPriceText = document.querySelector("#total-price");
  const { productsPrice, deliveryPrice, totalPrice } = getPrices();
  prdPriceText.textContent = getPrice(productsPrice) + " ₸";
  delPriceText.textContent = getPrice(deliveryPrice) + " ₸";
  totalPriceText.textContent = getPrice(totalPrice) + " ₸";

  const purchaseBtn = document.querySelector(".cart-right button");
  if (totalPrice > 0) {
    purchaseBtn.classList.remove("inactive");
  } else {
    purchaseBtn.classList.add("inactive");
  }
}

const cartSize = document.querySelector("#cart-size");
cartSize.textContent = getCartSize();
const displaycartDiv = document.querySelector(".display-cart");
if (getCartSize() == 0) {
  displaycartDiv.classList.add("hidden");
} else {
  displaycartDiv.classList.remove("hidden");
}

