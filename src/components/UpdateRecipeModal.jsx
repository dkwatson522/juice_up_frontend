import React, { useState } from "react";
import { deleteIngredient } from "../api";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const UpdateRecipeModal = ({ recipe, onClose, onUpdate }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState({
    ...recipe,
    ingredients_attributes: recipe.ingredients || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...updatedRecipe.ingredients];
    newIngredients[index][field] = value;
    setUpdatedRecipe((prevState) => ({
      ...prevState,
      ingredients: newIngredients,
    }));
  };

  const handleDeleteIngredient = (index) => {
    const ingredientId = updatedRecipe.ingredients[index].id;
    deleteIngredient(ingredientId)
      .then(() => {
        const newIngredients = updatedRecipe.ingredients.filter(
          (_, i) => i !== index
        );
        setUpdatedRecipe((prevState) => ({
          ...prevState,
          ingredients: newIngredients,
        }));
      })
      .catch((error) => {
        console.error("Error deleting ingredient:", error);
      });
  };

  const handleUpdate = () => {
    onUpdate(updatedRecipe);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Update Recipe
        </h2>
        <input
          type="text"
          name="name"
          value={updatedRecipe.name}
          onChange={handleChange}
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Ingredients
        </h3>
        {updatedRecipe.ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center mb-2 space-x-2">
            <input
              type="text"
              name={`ingredient-name-${index}`}
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name={`ingredient-amount-${index}`}
              value={ingredient.amount}
              onChange={(e) =>
                handleIngredientChange(index, "amount", e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name={`ingredient-unit-${index}`}
              value={ingredient.unit}
              onChange={(e) =>
                handleIngredientChange(index, "unit", e.target.value)
              }
              className="border border-gray-300 p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleDeleteIngredient(index)}
              className="text-red-500 hover:text-red-600 p-2"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Update Recipe
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipeModal;
