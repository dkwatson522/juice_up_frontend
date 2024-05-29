import React, { useState, useEffect } from "react";
import { getRecipes, createRecipe } from "../api";
import { Button } from "./ui/button";

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

  const handleCreateRecipe = async () => {
    try {
      const createdRecipe = await createRecipe(newRecipe);
      setRecipes([...recipes, createdRecipe]);
      setNewRecipe({ name: "", ingredients_attributes: [] });
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <ul className="list-disc pl-5">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mb-2">
            {recipe.name}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <h2 className="text-xl font-bold mt-4">Ingredients</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) =>
              setIngredient({ ...ingredient, name: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) =>
              setIngredient({ ...ingredient, amount: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) =>
              setIngredient({ ...ingredient, unit: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <Button
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Ingredient
          </Button>
        </div>

        <ul className="list-disc pl-5 mt-4">
          {newRecipe.ingredients_attributes.map((ing, index) => (
            <li key={index} className="mb-2">
              {ing.name} - {ing.amount} {ing.unit}
            </li>
          ))}
        </ul>

        <Button
          onClick={handleCreateRecipe}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Create Recipe
        </Button>
      </div>
    </div>
  );
};

export default Recipes;
