import React, { useState } from 'react';
import '../css/cocktail.css';

export default function Cocktail() {
    const [cocktailData, setCocktailData] = useState(null);

    async function getCocktailInfosAsJSON() {
        const searchName = document.getElementById('cocktailName').value;
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`
        );
        const data = await response.json();

        if (data.drinks === null) {
            alert('Kein Cocktail mit diesem Namen gefunden');
        } else {
            setCocktailData(data.drinks[0]);
        }
    }

    return (
        <div className="cocktail-page">
            <div className="cocktail-title">
                <h1>Cocktail DB</h1>
            </div>
            <div className="searchBar">
                <input id="cocktailName" type="text" placeholder="Cocktailname" />
                <button onClick={getCocktailInfosAsJSON}>Suchen</button>
            </div>
            {cocktailData && (
                <div className="infos">
                    <div className="cocktail-img">
                        <img
                            id="cocktailImg"
                            src={cocktailData.strDrinkThumb}
                            alt={cocktailData.strDrink}
                            width="400"
                            height="400"
                        />
                    </div>
                    <div className="cocktail-ingredients">
                        <h3>Zutaten</h3>
                        <ul id="ingredients">
                            {[...Array(15).keys()].map((i) => {
                                const ingredient = cocktailData[`strIngredient${i + 1}`];
                                const measure = cocktailData[`strMeasure${i + 1}`];
                                return ingredient && measure ? (
                                    <li key={i}>
                                        {measure} {ingredient}
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                    <div className="cocktail-instructions">
                        <h3>Zubereitung</h3>
                        <p id="instructions">{cocktailData.strInstructionsDE}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
