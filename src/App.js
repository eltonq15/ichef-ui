import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useRecipe } from "./api/recipeAPI";
import {
  ABOUT_THE_DEVELOPER_MSG,
  ABOUT_THE_DEVELOPER_TITLE,
  ALGORITHM_MSG,
  ALGORITHM_TITLE,
  CARD_MSG,
  ERROR_MSG,
  INPUT_INGREDIENTS_MSG,
  INPUT_INGREDIENTS_TITLE,
  INPUT_RECIPE_MSG,
  INPUT_RECIPE_TITLE,
  INTRODUCTION_TITLE,
  LOADING_MSG,
  PLACEHOLDER_MSG,
  PURPOSE_MSG,
  PURPOSE_TITLE,
  RECIPE_GENERATOR_TITLE,
  SEARCH_BTN_MSG,
  SEARCH_RESULTS_MSG,
  SEARCH_RESULTS_TITLE,
  SEARCH_TITLE,
} from "./constants";
import DeveloperAvatar from "./assets/developer-avatar.jpg";

const App = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [language, setLanguage] = useState("en");
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isError } = useRecipe(ingredients, language);

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
          <option value="en" selected={isLanguageSelected("en")}>
            🇬🇧 English {isLanguageSelected("en") && "⬇"}
          </option>
          <option value="pt" selected={isLanguageSelected("pt")}>
            🇧🇷 Português {isLanguageSelected("pt") && "⬇"}
          </option>
        </select>
      </nav>

      <div className="card">
        <h1 className="title icon">iChef</h1>
        <p className="description">{CARD_MSG[language]}</p>
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
        {isLoading && hasSearched && (
          <div className="status">{LOADING_MSG[language]}</div>
        )}
        {isError && hasSearched && (
          <div className="status error">{ERROR_MSG[language]}</div>
        )}
        {recipe && (
          <textarea
            readOnly
            className="recipe"
            defaultValue={recipe}
          ></textarea>
        )}
      </div>
      <div className="card">
        <h1 className="title">{INTRODUCTION_TITLE[language]}</h1>
        <h2 className="subtitle">{PURPOSE_TITLE[language]}</h2>
        <p className="description">{PURPOSE_MSG[language]}</p>
      </div>

      <div className="card">
        <h1 className="title">{SEARCH_TITLE[language]}</h1>
        <h2 className="subtitle">{INPUT_INGREDIENTS_TITLE[language]}</h2>
        <p className="description">{INPUT_INGREDIENTS_MSG[language]}</p>

        <h2 className="subtitle">{INPUT_RECIPE_TITLE[language]}</h2>
        <p className="description">{INPUT_RECIPE_MSG[language]}</p>

        <h2 className="subtitle">{SEARCH_RESULTS_TITLE[language]}</h2>
        <p className="description">{SEARCH_RESULTS_MSG[language]}</p>
      </div>

      <div className="card">
        <h1 className="title">{RECIPE_GENERATOR_TITLE[language]}</h1>
        <h2 className="subtitle">{ALGORITHM_TITLE[language]}</h2>
        <p className="description">{ALGORITHM_MSG[language]}</p>
      </div>
      <div className="card">
        <h1 className="title">{ABOUT_THE_DEVELOPER_TITLE[language]}</h1>
        <figure className="developer-avatar-container">
          <a
            href="https://www.linkedin.com/in/elton-alves-ribeiro"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="developer-avatar"
              src={DeveloperAvatar}
              alt="Developer Avatar"
            />
            <figcaption className="developer-name">
              Elton Alves Ribeiro
            </figcaption>
          </a>
        </figure>

        <p className="description">
          {ABOUT_THE_DEVELOPER_MSG[language].first}
          <br />
          <br />
          {ABOUT_THE_DEVELOPER_MSG[language].second}
          <br />
          <br />
          {ABOUT_THE_DEVELOPER_MSG[language].third}
          <br />
          <br />
          {ABOUT_THE_DEVELOPER_MSG[language].fourth}
        </p>
      </div>
    </div>
  );
};

export default App;
