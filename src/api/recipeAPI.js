import axios from "axios";
import { useQuery } from "react-query";

export const useRecipe = (ingredients) => {
  return useQuery(
    ["recipe", ingredients],
    () => {
      if (!ingredients) {
        return;
      }
      console.log("ingredients: ", ingredients);
      const text = `create a recipe with title, ingredients and instructions, including the ingredients: ${ingredients}. Return fallback message if any of the previous items is not a valid ingredient.`;
      return axios.get(
        `https://ichef-server.herokuapp.com/recipe?question=${text}`
      );
    },
    {
      enabled: !!ingredients,
      refetchOnWindowFocus: false,
    }
  );
};
