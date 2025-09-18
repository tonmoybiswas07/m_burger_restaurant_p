// console.log("js from another file");

let cart = [];
let total = 0;

const loadCategory = () => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const displayCategories = (card) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  card.forEach((element) => {
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
  <button id="category-btn${element.id}" onclick="loadFood(${element.id})" class="btn btn-block flex justify-center md:justify-start items-center py-4 shadow-lg btn-category">
            <img
              src="${element.categoryImg}"
              alt=""
              class="w-10"
            />${element.categoryName}
          </button>
  `;
    categoryContainer.append(categoryCard);
  });
};

// category by food
const loadFood = (id) => {
  document.getElementById("food-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");

  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
  const categoryBtns = document.querySelectorAll(".btn-category");
  categoryBtns.forEach((element) => {
    element.classList.remove("active");
  });

  const currentBtn = document.getElementById(`category-btn${id}`);
  currentBtn.classList.add("active");

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFood(data.foods));
};

const displayFood = (foods) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  foods.forEach((element) => {
    const foodCard = document.createElement("div");
    foodCard.innerHTML = `
     <div class="p-5 bg-white flex gap-3 shadow-xl rounded-xl">
            <div class="img flex-1">
              <img
                src="${element.foodImg}"
                
                onclick="handleModal(${element.id})"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover card-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold food-title">
                ${element.title}
              </h1>

              <div class="badge badge-warning">${element.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="food-price">${element.price}</span> BDT
                </h2>
              </div>

              <button onclick="addToCard(this)" class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
    `;

    foodContainer.append(foodCard);
  });
  document.getElementById("food-container").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");
};

// random food
const loadRandomFood = () => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/random`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayRandom(data.foods));
};
const displayRandom = (randomFoods) => {
  displayFood(randomFoods);
};

const handleModal = (modal) => {
  const url = ` https://taxi-kitchen-api.vercel.app/api/v1/foods/${modal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data.details));
};
const showModal = (modal) => {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = "";
  const modals = document.createElement("div");
  modals.innerHTML = `
   
        <div class="modal-box h-[700px] w-[700px] space-y-4">
          <div>
            <div class="title text-2xl my-2 font-bold">
              <h1>${modal.title}</h1>
            </div>
            <div class="image flex justify-center items-center">
              <img
                src="${modal.foodImg}"
                class="w-[300px] rounded-xl"
                alt=""
              />
            </div>
            <div class="flex justify-between items-center m-4">
              <div class="category text-2xl">
                <h1>
                  <span class="bg-[#FEBF00] p-4 rounded-xl"> ${modal.category} </span>
                </h1>
              </div>
              <div>
                <p class="text-2xl font-bold bg-[#FEBF00] p-2 rounded-xl">
                  <span>${modal.price}</span>
                </p>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-2xl font-bold">Area:${modal.area}</h2>
              </div>
              <div>
                <a href="${modal.video}" class="bg-[#FEBF00] p-4 rounded-xl text-2xl">
                  Show Video 
                </a>
              </div>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
   
  
  `;
  modalContainer.append(modals);
  modalContainer.showModal();
};

loadCategory();
loadRandomFood();

const addToCard = (btn) => {
  const cardBtn = btn.parentNode.parentNode;
  const cardTitle = cardBtn.querySelector(".food-title").innerText;
  const cardPrice = cardBtn.querySelector(".food-price").innerText;
  const cardPriceUpdated = Number(cardPrice);
  const cardImg = cardBtn.querySelector(".card-img").src;

  const updatedCard = {
    cardTitle: cardTitle,
    cardImg: cardImg,
    cardPriceUpdated: cardPriceUpdated,
  };
  cart.push(updatedCard);
  total = total + cardPriceUpdated;
  displayCart(cart);
  displayTotal(total);
};

const displayTotal = (value) => {
  document.getElementById("cartTotal").innerText = value;
};

const displayCart = (carts) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  carts.forEach((element) => {
    const cart = document.createElement("div");

    cart.innerHTML = `
   <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative mb-4">
            <div class="img">
              <img
                src="${element.cardImg}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-xs font-bold food-title">
                ${element.cardTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="food-price">${element.cardPriceUpdated}</span> BDT
                </h2>
              </div>
            </div>
            <div onclick="removeBtn(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
  `;
    cartContainer.append(cart);
  });
};
const removeBtn = (btn) => {
  const item = btn.parentNode;
  const foodTitle = item.querySelector(".food-title").innerText;
  const foodPrice = Number(item.querySelector(".food-price").innerText);
  cart = cart.filter((cartItem) => cartItem.cardTitle !== foodTitle);
  total = 0;
  cart.forEach((item) => (total += item.cardPriceUpdated));

  displayCart(cart);
  displayTotal(total);
};
