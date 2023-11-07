import React, { useState } from "react";

export default function Cocktail() {
  const [cocktailData, setCocktailData] = useState(null);
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailList, setCocktailList] = useState([]);

  function renderIngredients(cocktail) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      // Max 16 Zutaten
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
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

  async function fetchCocktailData() {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
      );
      const data = await response.json();

      if (data.drinks && data.drinks.length > 1) {
        // Mehrere Ergebnisse gefunden
        setCocktailList(data.drinks);
        setCocktailData(null);
      } else if (data.drinks && data.drinks.length === 1) {
        // Ein Ergebnis gefunden
        setCocktailData(data.drinks[0]);
        setCocktailList([]);
      } else {
        // Keine Ergebnisse gefunden
        setCocktailData(null);
        setCocktailList([]);
        alert("Es wurden keine Cocktails mit diesem Namen gefunden");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetchCocktailData();
    }
  }

  function handleCocktailSelect(selectedCocktail) {
    setCocktailData(selectedCocktail);
    setCocktailList([]);
  }

  return (
    <div className="cocktail-page bg-dark text-light">
      <div className="searchBar text-center d-flex align-items-center justify-content-center">
        <input
          type="text"
          placeholder="Cocktailname"
          value={cocktailName}
          onChange={(e) => setCocktailName(e.target.value)}
          className="form-control mr-2"
          style={{ width: "20%" }}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchCocktailData} className="btn btn-light">Suchen</button>
      </div>
      {cocktailList.length > 0 && (
        <div className="cocktail-list text-center mt-4">
          <h3>Mögliche Ergebnisse:</h3>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Cocktail</th>
              </tr>
            </thead>
            <tbody>
              {cocktailList.map((cocktail) => (
                <tr
                  key={cocktail.idDrink}
                  onClick={() => handleCocktailSelect(cocktail)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{cocktail.strDrink}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cocktailData && (
        <div className="cocktail-results">
          <div className="cocktail-title text-center mb-4">
            <h2>{cocktailData.strDrink}</h2>
          </div>
          <div className="infos d-flex flex-column align-items-center">
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
                  {renderIngredients(cocktailData)}
                </tbody>
              </table>
            </div>
            <div className="cocktail-instructions text-center mt-4">
              <h3>Zubereitung</h3>
              <p>{cocktailData.strInstructionsDE}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
