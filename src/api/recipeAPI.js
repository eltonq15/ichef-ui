import axios from "axios";
import {useQuery} from "react-query";

export const useRecipe = (ingredients) => {
    const {data, loading, error} = useQuery("recipe", () => {
        if (!ingredients) {
            return {data: null, loading: true, error: null};
        }
        const text = `create a recipe with title, ingredients and instructions, including the ingredients: ${ingredients}. Return fallback message if any of the previous items is not a valid ingredient.`;
        return axios.get(`http://localhost:3001/recipe?question=${text}`);
    }
  );
  return {data, loading, error};
}