// Import modules
import { fetchDataAndRender } from './apiService.js';

// Event listener or initialization logic
document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndRender();
});

// Function to fetch data and render on the page
export async function fetchDataAndRender() {
    try {
        const data = await fetchDataFromAPI(); // Assuming you have a function to fetch data
        // Render data on the page
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Function to fetch data from the external API
async function fetchDataFromAPI() {
    const apiUrl = 'https://api.example.com/data';
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}
