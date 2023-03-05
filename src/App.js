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
  SAMPLE_RECIPES,
  SAMPLE_RECIPE_1_MSG,
  SAMPLE_RECIPE_1_TITLE,
  SAMPLE_RECIPE_2_MSG,
  SAMPLE_RECIPE_2_TITLE,
  SEARCH_BTN_MSG,
  SEARCH_RESULTS_MSG,
  SEARCH_RESULTS_TITLE,
  SEARCH_TITLE,
  TYPEWRITER_ITEMS,
} from "./constants";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const App = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [language, setLanguage] = useState("en");
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isError } = useRecipe(ingredients, language);

  const ingredientsRef = useRef(null);
  const recipeRef = useRef(null);
  const recipe1TitleRef = useRef(null);
  const recipe1DescriptionRef = useRef(null);
  const recipe2TitleRef = useRef(null);
  const recipe2DescriptionRef = useRef(null);

  const [text] = useTypewriter({
    words: TYPEWRITER_ITEMS[language],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 60,
  });

  useEffect(() => {
    if (data) {
      setRecipe(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (recipe1TitleRef.current && recipe1DescriptionRef.current) {
      recipe1TitleRef.current.innerHTML = SAMPLE_RECIPE_1_TITLE[language];
      recipe1DescriptionRef.current.innerHTML = SAMPLE_RECIPE_1_MSG[language];
    }
    if (recipe2TitleRef.current && recipe2DescriptionRef.current) {
      recipe2TitleRef.current.innerHTML = SAMPLE_RECIPE_2_TITLE[language];
      recipe2DescriptionRef.current.innerHTML = SAMPLE_RECIPE_2_MSG[language];
    }
  }, [language]);

  useEffect(() => {
    if (recipeRef.current && recipe) {
      recipeRef.current.innerHTML = recipe;
    }
  }, [recipe, recipeRef]);

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
          {/* also include options for spanish, french, german and italian */}

          <option value="es" selected={isLanguageSelected("es")}>
            🇪🇸 Español {isLanguageSelected("es") && "⬇"}
          </option>
          <option value="fr" selected={isLanguageSelected("fr")}>
            🇫🇷 Français {isLanguageSelected("fr") && "⬇"}
          </option>
          <option value="de" selected={isLanguageSelected("de")}>
            🇩🇪 Deutsch {isLanguageSelected("de") && "⬇"}
          </option>
          <option value="it" selected={isLanguageSelected("it")}>
            🇮🇹 Italiano {isLanguageSelected("it") && "⬇"}
          </option>
        </select>
      </nav>

      <div className="card">
        <h1 className="title icon">iChef</h1>
        <p className="description">{CARD_MSG[language]}</p>
        <span className="text-border typewriter">
          {text}
          <span style={{ color: "#fff" }}>
            <Cursor />
          </span>
        </span>
        <input
          ref={ingredientsRef}
          onChange={handleChange}
          className="ingredients-input"
          type="text"
          placeholder={PLACEHOLDER_MSG[language]}
          id="ingredients"
          name="ingredients"
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
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
        {recipe && <div ref={recipeRef} className="recipe" />}
      </div>
      <div className="card">
        <details>
          <summary>
            <h1 className="title">{INTRODUCTION_TITLE[language]}</h1>
          </summary>
          <h2 className="subtitle">{PURPOSE_TITLE[language]}</h2>
          <p className="description">{PURPOSE_MSG[language]}</p>
        </details>
      </div>

      <div className="card">
        <details>
          <summary>
            <h1 className="title">{SEARCH_TITLE[language]}</h1>
          </summary>
          <h2 className="subtitle">{INPUT_INGREDIENTS_TITLE[language]}</h2>
          <p className="description">{INPUT_INGREDIENTS_MSG[language]}</p>

          <h2 className="subtitle">{INPUT_RECIPE_TITLE[language]}</h2>
          <p className="description">{INPUT_RECIPE_MSG[language]}</p>

          <h2 className="subtitle">{SEARCH_RESULTS_TITLE[language]}</h2>
          <p className="description">{SEARCH_RESULTS_MSG[language]}</p>
        </details>
      </div>

      <div className="card">
        <details>
          <summary>
            <h1 className="title">{RECIPE_GENERATOR_TITLE[language]}</h1>
          </summary>
          <h2 className="subtitle">{ALGORITHM_TITLE[language]}</h2>
          <p className="description">{ALGORITHM_MSG[language]}</p>
        </details>
      </div>

      <div className="card">
        <details>
          <summary>
            <h1 className="title">{SAMPLE_RECIPES[language]}</h1>
          </summary>

          {/* RECIPE 1 */}
          <details>
            <summary className="no-icon no-marker">
              <h2 ref={recipe1TitleRef} className="subtitle no-line">
                {SAMPLE_RECIPE_1_TITLE[language]}
              </h2>
            </summary>
            <p ref={recipe1DescriptionRef} className="description align-left">
              <h3>Peanut Butter Cookies</h3>
              <b>Ingredients:</b>
              <ul>
                <li>1 cup salted butter, at room temperature</li>
                <li>1 cup creamy peanut butter</li>
                <li>1 cup packed light brown sugar</li>
                <li>1 cup granulated sugar</li>
                <li>2 large eggs, lightly beaten</li>
                <li>2 teaspoons pure vanilla extract</li>
                <li>3 cups all-purpose flour</li>
                <li>2 teaspoons baking powder</li>
                <li>1 teaspoon baking soda</li>
              </ul>

              <b>Preparation:</b>
              <ol>
                <li>Preheat oven to 350°F.</li>
                <li>
                  In the bowl of an electric mixer, combine butter, peanut
                  butter and sugars. Cream together until light and fluffy.
                </li>
                <li>Add eggs and vanilla; beat until just combined.</li>
                <li>
                  In another bowl, whisk together flour, baking powder, and
                  baking soda; stir into peanut butter mixture until combined.
                </li>
                <li>
                  Drop dough by heaping spoonfuls onto an ungreased baking
                  sheet, at least 2 inches apart.
                </li>
                <li>
                  Bake for 10-12 minutes or until cookies are golden brown
                  around the edges.
                </li>
                <li>
                  Remove from oven and let stand for 3 minutes before
                  transferring to a wire rack to cool completely.
                </li>
              </ol>

              <p>Yield: 30 cookies</p>
            </p>
          </details>

          {/* RECIPE 2 */}
          <details>
            <summary className="no-icon no-marker">
              <h2 ref={recipe2TitleRef} className="subtitle no-line">
                {SAMPLE_RECIPE_2_TITLE[language]}
              </h2>
            </summary>
            <p ref={recipe2DescriptionRef} className="description align-left">
              <h3>Fish and Chips</h3>
              <h4>Ingredients</h4>
              <ul>
                <li>
                  2 large potatoes (about 1½ lbs), peeled and cut into strips
                </li>
                <li>2 tablespoons vegetable oil</li>
                <li>1¾ cups flour</li>
                <li>½ teaspoon garlic powder</li>
                <li>1 teaspoon paprika</li>
                <li>1 teaspoon salt</li>
                <li>1 teaspoon freshly ground black pepper</li>
                <li>1 cup beer</li>
                <li>4 (4 oz) cod fillets</li>
                <li>Vegetable oil for frying</li>
              </ul>
              <h4>Preparation</h4>
              <ol>
                <li>
                  Preheat oven to 425°F. Place potatoes on an ungreased baking
                  sheet and drizzle with oil. Bake for 25 minutes or until
                  golden brown and crispy.
                </li>
                <li>
                  In a shallow dish, mix together flour, garlic powder, paprika,
                  salt, and pepper. Pour in beer and mix with a fork until
                  mixture is smooth and lump-free.
                </li>
                <li>
                  Dip each cod fillet into the beer batter and coat evenly.
                  Place in a large skillet over medium heat with about 1 inch of
                  oil. Fry for about 5 minutes per side or until golden brown
                  and cooked through.
                </li>
                <li>Serve cod with potatoes.</li>
              </ol>
              <p>Yields: 4 servings</p>
            </p>
          </details>
        </details>
      </div>

      <div className="card">
        <details open>
          <summary>
            <h1 className="title">{ABOUT_THE_DEVELOPER_TITLE[language]}</h1>
          </summary>
          <figure className="developer-avatar-container">
            <a
              href="https://www.linkedin.com/in/elton-alves-ribeiro"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="developer-avatar"
                src="developer-avatar.jpg"
                alt="Photograph of Elton Alves Ribeiro, a fullstack software developer and site developer for iChef Recipe Generator"
              />
              <figcaption className="developer-name text-border">
                {`Elton Alves Ribeiro `}
                <sup>
                  <i class="fa fa-linkedin" style={{ color: "#0a66c2" }} />
                </sup>
              </figcaption>
              {/* insert linkedin icon */}
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
        </details>
      </div>
    </div>
  );
};

export default App;
