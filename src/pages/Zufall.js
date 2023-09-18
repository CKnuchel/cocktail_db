import React, { useState } from 'react';
import '../css/zufall.css';

export default function Zufall() {
    const [cocktailData, setCocktailData] = useState(null);

    async function fetchCocktailData() {
        try {
            const response = await fetch(
                'https://www.thecocktaildb.com/api/json/v1/1/random.php'
            );
            const data = await response.json();

            if (data.drinks && data.drinks.length > 0) {
                setCocktailData(data.drinks[0]);
            } else {
                alert('Kein Cocktail gefunden');
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    function renderIngredients() {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) { // Max 16 Zutaten
            const ingredient = cocktailData[`strIngredient${i}`];
            const measure = cocktailData[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }

        if (ingredients.length === 0) {
            return <li>Keine Zutaten gefunden</li>;
        }
        else {
            return ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ));
        }
    }

    return (
        <div className="cocktail-page">
            <div className="cocktail-title">
                <h1>Cocktail DB</h1>
            </div>
            <div className="RandomButton">
                <button onClick={fetchCocktailData}>Zufälliger Cocktail</button>
                {cocktailData && (
                    <h2>{cocktailData.strDrink}</h2>
                )}
            </div>
            {cocktailData && (
                <div className="infos">
                    <div className="cocktail-img">
                        <img
                            src={cocktailData.strDrinkThumb}
                            alt={cocktailData.strDrink}
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
