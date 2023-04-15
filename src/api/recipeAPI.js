import axios from "axios";
import { useQuery } from "react-query";
import { languagesMap } from "../constants";

const fetchRecipe = async ({ queryKey: [_, ingredients, language] }) => {
  const question = `create a very detailed recipe with title, ingredients, preparation mode, how much it yields, including only the ingredients (do not add many extra ingredients) or recipe name equal to ${ingredients}. It must be written in ${languagesMap[language]} language and format the response to html syntax, using tags h3 for titles, h4 for subtitles, br, p, ul for ingredient list and ol for preparation instructions`;

  return axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: question }],
      max_tokens: 1000,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_CHATGPT_API_KEY,
      },
    }
  );
};
export const useRecipe = (ingredients = "", language = "en") => {
  return useQuery(["recipe", ingredients, language], fetchRecipe, {
    enabled: !!ingredients,
    refetchOnWindowFocus: false,
  });
};
