import axios from 'axios';

// Set the base URL for the API requests
const API_URL = 'http://localhost:3000';

// Function to get all recipes
export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/recipes`, {
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
    const response = await axios.post(`${API_URL}/api/v1/recipes`, recipe, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// Function to delete a recipe
export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/v1/recipes/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};
