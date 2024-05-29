import axios from 'axios';

// Set the base URL for the API requests
const API_URL = 'http://localhost:3000';

// Function to get all recipes
export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Function to create a new recipe
export const createRecipe = async (recipe) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, recipe, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    console.log('Recipe created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// Add more functions as needed
