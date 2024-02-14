const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Get meal list that matches with the ingredients
async function getMealList() {
    try {
        let searchInputTxt = document.getElementById('search-input').value.trim();
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
        const data = await response.json();

        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else {
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    } catch (error) {
        console.error('Error fetching meal list:', error);
    }
}

// Get recipe of the meal
async function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
            const data = await response.json();
            mealRecipeModal(data.meals);
        } catch (error) {
            console.error('Error fetching meal recipe:', error);
        }
    }
}

// Create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}


//Enable user manipulation of data within the API through the use of POST, PUT, or PATCH requests.

// Event listener for the form submission
document.getElementById('updateMealForm').addEventListener('submit', updateMealDetails);

// Function to handle form submission and make a PUT request
function updateMealDetails(e) {
    e.preventDefault();

    const mealId = document.querySelector('.meal-details-content .meal-item').dataset.id;
    const updatedMealData = {
        mealName: document.getElementById('mealName').value,
        category: document.getElementById('category').value,
        instructions: document.getElementById('instructions').value,
        imageUrl: document.getElementById('imageUrl').value,
    };

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`, {
        method: 'PUT',  // Use 'PUT' method for updating data
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMealData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response if needed
        console.log('Meal details updated:', data);
    });
}
