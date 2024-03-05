function cardChange(card) {

    const img = document.querySelector("#Img")
    img.src = `../` + card.imageSrc

    const title = document.querySelector("#f-name")
    title.textContent = card.title

    const description = document.querySelector("#branches-p")
    description.textContent = card.description

    const price = document.querySelector("#price")
    price.textContent = card.price + " kzt"

    const bigDescription = document.querySelector("#description")
    bigDescription.textContent = card.bigDescription

    const cartItemAmount = document.createElement("div");
    cartItemAmount.classList.add("cart-item-amount");

    const button = document.querySelector(".cart_btn");
    if (isAddedToCart(card)) {
        button.textContent = "ADDED TO CART";
        button.enabled = false;
    } else {
        button.textContent = "ADD TO CART";
        button.addEventListener("click", () => {
            addCart(card);
        });
    }
    button.addEventListener("click", () => {
        window.location.href = `../cart/cart.html`;
    });

    countPtice()
}

function countPtice() {
    const cart_item = document.querySelector(".cart-item-amount");
    let count = 1;
    cart_item.children[0].addEventListener("click", () => {
        cart_item.children[1].textContent = count ? --count : 1
    })
    cart_item.children[2].addEventListener("click", () => {
        cart_item.children[1].textContent = ++count
    })
}

function addCart(card) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({...card, quantity: 1})
        localStorage.setItem("cart", JSON.stringify(cart))
}

function isAddedToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.find((p) => p.id == product.id)!= null;
  }

async function getCardData(type) {
    const url = "https://65d713c727d9a3bc1d7a186e.mockapi.io/meow/api/amour"
    const response = await fetch(url)
    const data = await response.json()
    const card = data[0][`${type}Data`]
    return card
}


async function changeElement(id, type) {
    try {
        const cards = await getCardData(type)
        const card = cards.find(item => item.id == Number(id))
        cardChange(card)
        addCart(card)
    }
    catch (err) {
        console.error('error');
    }
}

const url = window.location.href
let id = url.split('id=')[1]
id = id.split("&")[0]
const type = url.split('type=')[1]
changeElement(id, type)







