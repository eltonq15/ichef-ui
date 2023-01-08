import React, {useState, useRef} from "react";
import "./App.css";
import { useRecipe } from "./api/recipeAPI";

const App = () => {
  const [ingredients, setIngredients] = useState("");
  const {data: recipe, loading, error} = useRecipe(ingredients);

  const ingredientsRef = useRef();

  const generateRecipe = () => {
    setIngredients(ingredientsRef.current.value);
  };

  return (
    <div className="App">
      <div className="card">
        <h1 className="title">iChef</h1>
        <p className="description">
          Not sure what to cook? <br/>Type the ingredients you have and we'll give
          you the best recipe we can find!
        </p>
        <input ref={ingredientsRef} className="ingredients-input" type="text" placeholder="i.e. Rice, beans, egg and beef" />
        <button className="search-btn" onClick={generateRecipe} >Search</button>
        {loading && <div>Loading...</div>}
        {error && <div>Error on generating recipe :(</div>}
        <div className="recipe">
          {recipe && <div>
            {recipe}
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
