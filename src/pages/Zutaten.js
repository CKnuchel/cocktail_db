import React, { useState } from 'react';
import '../css/zutaten.css';

export default function Zutaten() {
    const [cocktailData, setCocktailData] = useState(null);
    const [ingredientName, setIngredientName] = useState('');

    async function fetchCocktailData() {
        try {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`
            );
            const data = await response.json();

            if (data.ingredients && data.ingredients.length > 0) {
                setCocktailData(data.ingredients[0]);
            } else {
                alert('Keine Zutaten mit diesem Namen gefunden');
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    return (
        <div className="cocktail-page">
            <div className="cocktail-title">
                <h1>Cocktail DB</h1>
            </div>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Zutatenname"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                />
                <button className='ing-btn' onClick={fetchCocktailData}>Suchen</button>
            </div>
            {cocktailData && (
                <div className="infos">
                    <div className="">
                        <h3>Alkoholwert: {cocktailData.strABV}</h3>
                        <p>{cocktailData.strDescription}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
