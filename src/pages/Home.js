import '../css/home.css';

import homeImage from '../images/home.png'

export default function Cocktail() {
    return (
        <div className='home'>
        <div className='titel'>
            <h1>Cocktail DB</h1>
        </div>
        <div className='home-image'>
            <img src= {homeImage} alt='Cocktail' />
        </div>
        </div>
    )
}