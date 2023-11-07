import React, { useState } from "react";

export default function Zufall() {
  const [cocktailData, setCocktailData] = useState(null);

  async function fetchCocktailData() {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();

      if (data.drinks && data.drinks.length > 0) {
        setCocktailData(data.drinks[0]);
      } else {
        alert("Es konnte kein Cocktail gefunden werden");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  }

  function renderIngredients() {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      // Max 16 Zutaten
      const ingredient = cocktailData[`strIngredient${i}`];
      const measure = cocktailData[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push({ ingredient, measure });
      }
    }

    if (ingredients.length === 0) {
      return <tr><td colSpan="2">Keine Zutaten gefunden</td></tr>;
    } else {
      return ingredients.map((ingredient, index) => (
        <tr key={index}>
          <td>{ingredient.ingredient}</td>
          <td>{ingredient.measure}</td>
        </tr>
      ));
    }
  }

  return (
    <div className="cocktail-page bg-dark text-light">
      <div className="RandomButton text-center">
        <button className="random btn btn-light" onClick={fetchCocktailData}>
          Zufälliger Cocktail
        </button>
        {cocktailData && <h2 className="text-light">{cocktailData.strDrink}</h2>}
      </div>
      {cocktailData && (
        <div className="infos d-flex flex-column align-items-center mt-4">
          <div className="cocktail-img col-md-4">
            <img src={cocktailData.strDrinkThumb} alt={cocktailData.strDrink} className="img-fluid" />
          </div>
          <div className="cocktail-ingredients text-center mt-4">
            <h3>Zutaten</h3>
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Zutat</th>
                  <th scope="col">Menge</th>
                </tr>
              </thead>
              <tbody>
                {renderIngredients()}
              </tbody>
            </table>
          </div>
          <div className="cocktail-instructions text-center mt-4">
            <h3>Zubereitung</h3>
            <p>{cocktailData.strInstructionsDE}</p>
          </div>
        </div>
      )}
    </div>
  );
}
