import axios from "axios";
import { useQuery } from "react-query";
import { languagesMap } from "../constants";

export const useRecipe = (ingredients, language = "en") => {
  return useQuery(
    ["recipe", ingredients],
    () => {
      if (!ingredients) {
        return;
      }
      return axios.get(
        `https://ichef-server.herokuapp.com/recipe?language=${languagesMap[language]}&search=${ingredients}`
        // `http://localhost:3001/recipe?language=${languagesMap[language]}&search=${ingredients}`
      );
    },
    {
      enabled: !!ingredients,
      refetchOnWindowFocus: false,
    }
  );
};
