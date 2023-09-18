export default function Navbar(){

return (
    <nav className="nav">
        <a href="/" className="site-title">Cocktail DB</a>
        <ul>
            <li>
                <a href="../pages/cocktail">Cocktail suchen</a>
            </li>
            <li>
                <a href="../pages/zutaten">Zutaten suchen</a>
            </li>
            <li>
                <a href="../pages/zufall">Zufälliger Cocktail</a>
            </li>
        </ul>
    </nav>
)

}