// app.js
import { fetchMealList, fetchMealDetails } from './api.js';
import { updateMealList, updateMealDetailsUI } from './ui.js';

const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', async () => {
    const searchInputTxt = document.getElementById('search-input').value.trim();
    try {
        const meals = await fetchMealList(searchInputTxt);
        updateMealList(meals);
    } catch (error) {
        console.error('Error in app.js:', error);
    }
});

const mealList = document.getElementById('meal');
mealList.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        const mealItem = e.target.parentElement.parentElement;
        try {
            const meal = await fetchMealDetails(mealItem.dataset.id);
            updateMealDetailsUI(meal);
        } catch (error) {
            console.error('Error in app.js:', error);
        }
    }
});

const recipeCloseBtn = document.getElementById('recipe-close-btn');
recipeCloseBtn.addEventListener('click', () => {
    const mealDetailsContent = document.querySelector('.meal-details-content');
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
