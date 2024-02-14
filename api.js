// api.js
export async function fetchMealList(searchInputTxt) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Error fetching meal list:', error);
        throw error;
    }
}

export async function fetchMealDetails(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching meal details:', error);
        throw error;
    }
}
