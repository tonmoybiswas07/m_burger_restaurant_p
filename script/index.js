// console.log("js from another file");
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
  <button onclick="loadFood(${element.id})" class="btn btn-block flex justify-center md:justify-start items-center py-4 shadow-lg btn-category">
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
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
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
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
                ${element.title}
              </h1>

              <div class="badge badge-warning">${element.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${element.price}</span> BDT
                </h2>
              </div>

              <button class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
    `;
    foodContainer.append(foodCard);
  });
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

loadCategory();
loadRandomFood();
