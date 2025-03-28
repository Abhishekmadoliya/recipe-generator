import { useState } from "react";
import "./Searchbox.css";

function Searchbox() {
  const [meal, setMeal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [dishName, setDishName] = useState("");

  const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  async function getDish() {
    setErrorMessage(""); // Clear previous error message
    let dish = inputValue.trim();
    
    try {
      let data = await fetch(API_URL + dish);
      let response = await data.json();
      console.log(response);

      if (response.meals) {
        setMeal(response.meals[0]);
        setDishName(response.meals[0].strMeal);
      } else {
        setMeal(null);
        setDishName("");
        setErrorMessage("No dish found. Please enter a valid dish name.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching the dish.");
    }
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  // Create a list of ingredients
  const ingredients = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
  }

  return (
    <div className="container" id="searchbox">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-bowl-food"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for your Dish"
          aria-label="DishName"
          aria-describedby="basic-addon1"
          value={inputValue}
          id="inputbox"
          onChange={handleInputChange}
        />
        <button type="button" className="btn btn-info" onClick={getDish}>
          Generate
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Display the meal if it exists */}
      {meal && (
        <div className="card text-center" id="card">
          <div className="card-header">{dishName}</div>
          <div className="card-body">
            <h5 className="card-title">Ingredients </h5>
            <div className="ingredients">
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <p className="card-text">{meal.strInstructions}</p>
            <div className="footer-content">

            <img src={meal.strMealThumb} alt={dishName} id="dishimage" />
            <a href={meal.strYoutube} className="btn btn-primary">
              {"Open " + dishName + " recipe video"}
            </a>
            </div>
          </div>
          <div className="card-footer text-body-secondary">2 days ago</div>
        </div>
      )}
    </div>
  );
}

export default Searchbox;
