import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useRecipe } from "./api/recipeAPI";

const App = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { data, loading, error } = useRecipe(ingredients);

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
  };

  return (
    <div className="App">
      <div className="card">
        <h1 className="title">iChef</h1>
        <p className="description">
          Not sure what to cook? <br />
          Type the ingredients you have and we'll give you the best recipe we
          can find!
        </p>
        <input
          ref={ingredientsRef}
          onChange={handleChange}
          className="ingredients-input"
          type="text"
          placeholder="i.e. Rice, beans, egg and beef"
          id="ingredients"
          name="ingredients"
          onKeyDown={handleKeyDown}
        />
        <button
          className="search-btn"
          disabled={disabled}
          onClick={generateRecipe}
        >
          Search
        </button>
        {loading && <div>Loading...</div>}
        {error && <div>Error on generating recipe :(</div>}
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
