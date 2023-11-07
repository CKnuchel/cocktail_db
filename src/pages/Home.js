import homeImage from "../images/home.png";

export default function Cocktail() {
  return (
    <div className="home bg-dark d-flex flex-column justify-content-center align-items-center text-light h-100">
      <div className="titel">
        <h1>Cocktail DB</h1>
      </div>
      <div className="home-image">
        <img src={homeImage} alt="Cocktail" style={{ maxWidth: '100%', maxHeight: '60vh', marginBottom: '-5px' }} />
      </div>
    </div>
  );
}
