import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cocktail from './pages/Cocktail';
import Zufall from './pages/Zufall';

function App() {
  return (
    <>
    <Navbar />
    <div className="titel-component"> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pages/cocktail" element={<Cocktail />} />
      <Route path="/pages/zufall" element={<Zufall />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
