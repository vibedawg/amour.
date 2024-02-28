
function createCard(data) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("pic", "pic0");

    const image = document.createElement("img");
    image.src = data.imageSrc
    cardDiv.appendChild(image);

    const heartIcon = document.createElement("a");
    const icon = document.createElement("ion-icon");
    icon.setAttribute("name", "heart-outline");
    heartIcon.appendChild(icon);
    cardDiv.appendChild(heartIcon);

    const titleElement = document.createElement("h3");
    titleElement.textContent = data.title;
    cardDiv.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = data.description + ' - ' + data.price;
    cardDiv.appendChild(descriptionElement);

    const button = document.createElement("button");
    button.textContent = "Add to cart";
    if (isAddedToCart(data)) {
        button.textContent = "Added to cart";
        button.enabled = false;
      } else {
        button.textContent = "Add to cart";
        button.addEventListener("click", () => {
          addToCart(data);
        });
      }

    cardDiv.appendChild(button);

    return cardDiv;
}
function isAddedToCart(product) {
    const cart = JSON.parse(localStorage.getItem("")) || [];
    return cart.find((p) => p.id == product.id) != null;
  }


const container = document.querySelector(".range-card"); 
const lastContainer = document.querySelector(".holiday-cards")

const weddingUrl ="https://65d713c727d9a3bc1d7a186e.mockapi.io/meow/api/amour"

fetch(weddingUrl)
.then (res => res.json())
.then (data => data[0].weddingData)

.then (item => {
    item.forEach((product)=>{
        container.appendChild(createCard(product))
    })

})
.catch (err => console.log(err))



const holidayUrl = "https://65d713c727d9a3bc1d7a186e.mockapi.io/meow/api/amour"
fetch(holidayUrl)
.then (res => res.json())
.then (data => data[0].holidayData)

.then (item => {
    item.forEach((product)=>{
        lastContainer.appendChild(createCard(product))
    })

})
.catch (err => console.log(err))

