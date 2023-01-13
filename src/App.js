import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useRecipe } from "./api/recipeAPI";
import { CARD_MSG, ERROR_MSG, LOADING_MSG, PLACEHOLDER_MSG, SEARCH_BTN_MSG} from "./constants";

const App = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [language, setLanguage] = useState("en");
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isError  } = useRecipe(ingredients, language);

  useEffect(() => {
    if (data) {
      setRecipe(data.data);
    }
  }, [data]);

  const ingredientsRef = useRef(null);

  const handleChange = () => {
    setDisabled(ingredientsRef.current.value?.length === 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateRecipe();
    }
  };

  const generateRecipe = () => {
    setIngredients(ingredientsRef.current.value);
    setHasSearched(true);
  };

  const isLanguageSelected = (value) => {
    return language === value;
  };

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
    ingredientsRef.current.value = "";
    setDisabled(true);
    setRecipe("");
    setHasSearched(false);
  };

  return (
    <div className="App">
      {/* navbar with dropdown select tag with two options, including flag icons to choose site language, english or portuguese */}

      <nav className="navbar">
        <select className="language-select" onChange={handleChangeLanguage}>
          <option value="en" selected={isLanguageSelected('en')} >English {isLanguageSelected('en') && '⬇'}</option>
          <option value="pt" selected={isLanguageSelected('pt')} >Português {isLanguageSelected('pt') && '⬇'}</option>
        </select>
      </nav>

      <div className="card">
        <h1 className="title">iChef</h1>
        <p className="description">
          {CARD_MSG[language]}
        </p>
        <input
          ref={ingredientsRef}
          onChange={handleChange}
          className="ingredients-input"
          type="text"
          placeholder={PLACEHOLDER_MSG[language]}
          id="ingredients"
          name="ingredients"
          onKeyDown={handleKeyDown}
        />
        <button
          className="search-btn"
          disabled={disabled}
          onClick={generateRecipe}
        >
          {SEARCH_BTN_MSG[language]}
        </button>
        {isLoading && hasSearched && <div className="status">{LOADING_MSG[language]}</div>}
        {isError && hasSearched && <div className="status error">{ERROR_MSG[language]}</div>}
        {recipe && (
          <textarea
            readOnly
            className="recipe"
            defaultValue={recipe}
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default App;
