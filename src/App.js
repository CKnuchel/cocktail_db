import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cocktail from './pages/Cocktail';
import Zufall from './pages/Zufall';
import Zutaten from './pages/Zutaten';

function App() {
  return (
    <>
    <Navbar />
    <div className="titel-component"> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pages/cocktail" element={<Cocktail />} />
      <Route path="/pages/zufall" element={<Zufall />} />
      <Route path="/pages/zutaten" element={<Zutaten />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
