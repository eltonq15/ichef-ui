import axios from "axios";
import { useQuery } from "react-query";
import { RECIPE_MSG, LANGUAGE_MSG } from "../constants";

export const useRecipe = (ingredients, language = 'en') => {
  return useQuery(
    ["recipe", ingredients],
    () => {
      if (!ingredients) {
        return;
      }
      const text = `${RECIPE_MSG[language]} ${ingredients} ${LANGUAGE_MSG[language]}`;
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
