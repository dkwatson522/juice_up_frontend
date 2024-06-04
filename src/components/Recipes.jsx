import React, { useState, useEffect } from "react";
import { getRecipes, createRecipe, deleteRecipe, updateRecipe } from "../api";
import { Button } from "./ui/button";
import UpdateRecipeModal from "./UpdateRecipeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients_attributes: [],
  });
  const [ingredient, setIngredient] = useState({
    name: "",
    amount: "",
    unit: "",
  });
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleAddIngredient = () => {
    setNewRecipe((prevState) => ({
      ...prevState,
      ingredients_attributes: [...prevState.ingredients_attributes, ingredient],
    }));
    setIngredient({ name: "", amount: "", unit: "" });
  };

  const handleRemoveIngredient = (index) => {
    setNewRecipe((prevState) => ({
      ...prevState,
      ingredients_attributes: prevState.ingredients_attributes.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleCreateRecipe = async () => {
    try {
      const createdRecipe = await createRecipe(newRecipe);
      setRecipes([...recipes, createdRecipe]);
      setNewRecipe({ name: "", ingredients_attributes: [] });
      setError(null);
    } catch (error) {
      console.error("Error creating recipe:", error);
      setError("Failed to create recipe. Please try again.");
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to delete recipe. Please try again.");
    }
  };

  const handleOpenModal = (recipe) => {
    setSelectedRecipe({
      ...recipe,
      ingredients_attributes: recipe.ingredients || [],
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    try {
      const recipe = await updateRecipe(updatedRecipe);
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
      handleCloseModal();
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Recipes</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="list-disc pl-6 mb-6">
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className="mb-4 flex justify-between items-center"
          >
            <span className="text-lg text-gray-700">{recipe.name}</span>
            <div>
              <Button
                onClick={() => handleOpenModal(recipe)}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mr-2"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <button
                onClick={() => handleDeleteRecipe(recipe.id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h2 className="text-xl font-bold mb-4 text-gray-700">Ingredients</h2>
        <div className="flex mb-4 space-x-2">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) =>
              setIngredient({ ...ingredient, name: e.target.value })
            }
            className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) =>
              setIngredient({ ...ingredient, amount: e.target.value })
            }
            className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) =>
              setIngredient({ ...ingredient, unit: e.target.value })
            }
            className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleAddIngredient}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Add Ingredient
          </Button>
        </div>

        <ul className="list-disc pl-5 mb-4">
          {newRecipe.ingredients_attributes.map((ing, index) => (
            <li
              key={index}
              className="mb-2 text-gray-700 flex items-center justify-between"
            >
              <span>
                {ing.name} - {ing.amount} {ing.unit}
              </span>
              <button
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleCreateRecipe}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          Create Recipe
        </Button>
      </div>

      {isModalOpen && (
        <UpdateRecipeModal
          recipe={selectedRecipe}
          onClose={handleCloseModal}
          onUpdate={handleUpdateRecipe}
        />
      )}
    </div>
  );
};

export default Recipes;
