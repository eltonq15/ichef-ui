import axios from "axios";
import { useQuery } from "react-query";
import { RECIPE_MSG } from "../constants";

export const useRecipe = (ingredients, language = 'en') => {
  return useQuery(
    ["recipe", ingredients],
    () => {
      if (!ingredients) {
        return;
      }
      const text = `${RECIPE_MSG[language]} ${ingredients}`;
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
