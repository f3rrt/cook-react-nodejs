import React, { useState } from "react";
import { RecipeItem } from "../recipe-item/recipeItem";

export function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  return (
    <div>
      {recipes?.map((recipe) => (
        <RecipeItem key={recipe.id.toString()} recipe={recipe} />
      ))}
    </div>
  );
}
