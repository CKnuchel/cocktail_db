import React, { useState } from "react";

export default function Zutaten() {
  const [cocktailData, setCocktailData] = useState(null);
  const [ingredientName, setIngredientName] = useState("");

  async function fetchCocktailData() {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`
      );
      const data = await response.json();

      if (data.ingredients && data.ingredients.length > 0) {
        setCocktailData(data.ingredients[0]);
      } else {
        alert("Es wurde keine Zutat mit diesem Namen gefunden");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  }

  return (
    <div className="cocktail-page bg-dark text-light">
      <div className="cocktail-title text-center mb-4">
        <h1>Cocktail DB</h1>
      </div>
      <div className="searchBar text-center d-flex align-items-center justify-content-center">
        <input
          type="text"
          placeholder="Zutatenname"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          className="form-control mr-2"
          style={{ width: "20%" }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              fetchCocktailData();
            }
          }}
        />
        <button className="btn btn-light" onClick={fetchCocktailData}>Suchen</button>
      </div>
      {cocktailData && (
        <div className="infos text-center mt-4">
          <h3>Alkoholwert: {cocktailData.strABV}</h3>
          <p>{cocktailData.strDescription}</p>
        </div>
      )}
    </div>
  );
}
