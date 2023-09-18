import React, { useState } from 'react';
import '../css/cocktail.css';

export default function Cocktail() {
    const [cocktailData, setCocktailData] = useState(null);
    const [cocktailName, setCocktailName] = useState('');

    async function fetchCocktailData() {
        try {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
            );
            const data = await response.json();

            if (data.drinks && data.drinks.length > 0) {
                setCocktailData(data.drinks[0]);
            } else {
                alert('Kein Cocktail mit diesem Namen gefunden');
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    function renderIngredients() {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktailData[`strIngredient${i}`];
            const measure = cocktailData[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        return ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
        ));
    }

    return (
        <div className="cocktail-page">
            <div className="cocktail-title">
                <h1>Cocktail DB</h1>
            </div>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Cocktailname"
                    value={cocktailName}
                    onChange={(e) => setCocktailName(e.target.value)}
                />
                <button onClick={fetchCocktailData}>Suchen</button>
            </div>
            {cocktailData && (
                <div className="infos">
                    <div className="cocktail-img">
                        <img
                            src={cocktailData.strDrinkThumb}
                            alt={cocktailData.strDrink}
                            width="400"
                            height="400"
                        />
                    </div>
                    <div className="cocktail-ingredients">
                        <h3>Zutaten</h3>
                        <ul>{renderIngredients()}</ul>
                    </div>
                    <div className="cocktail-instructions">
                        <h3>Zubereitung</h3>
                        <p>{cocktailData.strInstructionsDE}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
