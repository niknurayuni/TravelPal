const mealSelect = document.querySelector("#mealSelect");

const getMealList = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Dutch"
  );
  const data = await response.json();
  console.log(data);

  const meals = data.meals;
  meals.forEach((meal) => {
    const option = document.createElement("option");
    option.value = meal.strMeal;
    option.text = meal.strMeal;
    mealSelect.appendChild(option);
  });
};

const getMealDetails = async (mealName) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  const data = await response.json();
  console.log(data);

  const mealDiv = document.createElement("div");
  mealDiv.setAttribute("id", "meal");

  const mealNameElement = document.createElement("h2");
  const mealNameNode = document.createTextNode(data.meals[0].strMeal);
  mealNameElement.appendChild(mealNameNode);

  const mealCategoryElement = document.createElement("h3");
  const mealCategoryNode = document.createTextNode(data.meals[0].strCategory);
  mealCategoryElement.appendChild(mealCategoryNode);

  const mealImageElement = document.createElement("img");
  mealImageElement.setAttribute("src", data.meals[0].strMealThumb);

  const mealInstructionsElement = document.createElement("p");
  const mealInstructionsNode = document.createTextNode(
    data.meals[0].strInstructions
  );

  const mealVideoElement = document.createElement("iframe");
  mealVideoElement.setAttribute("src", data.meals[0].strYoutube.replace("watch?v=", "embed/"));

  
  const mealIngredientsElement = document.createElement("ul");
  for (let i = 1; i <= 20; i++) {
    const ingredient = data.meals[0][`strIngredient${i}`];
    const measurement = data.meals[0][`strMeasure${i}`];
    if (ingredient !== "" && measurement !== "") {
      const ingredientItemElement = document.createElement("li");
      const ingredientTextNode = document.createTextNode(`${ingredient} - ${measurement}`);
      ingredientItemElement.appendChild(ingredientTextNode);
      mealIngredientsElement.appendChild(ingredientItemElement);
    }
  }

  mealInstructionsElement.appendChild(mealInstructionsNode);

  mealDiv.appendChild(mealNameElement);
  mealDiv.appendChild(mealCategoryElement);
  mealDiv.appendChild(mealImageElement);
  mealDiv.appendChild(mealInstructionsElement);
  mealDiv.appendChild(mealVideoElement);
  mealDiv.appendChild(mealIngredientsElement);

  document.querySelector("main").appendChild(mealDiv);
};

document.addEventListener("DOMContentLoaded", (e) => {
  getMealList();

  const cityForm = document.querySelector("#cityForm");
  cityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const mealName = mealSelect.value;
    if (mealName !== "") {
      const mealDiv = document.querySelector("#meal");
      if (mealDiv) {
        document.querySelector("main").removeChild(mealDiv);
      }
      getMealDetails(mealName);
    } else {
      console.log("You must select a meal");
    }
  });
});

anime.timeline({loop: true})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });