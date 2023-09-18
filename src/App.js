import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cocktail from './pages/Cocktail';
import Zufall from './pages/Zufall';
import Zutaten from './pages/Zutaten';

function App() {
  let component;
  switch(window.location.pathname){
    case "/":
      component = <Home />
      break
    case "/pages/cocktail":
      component = <Cocktail />
      break
    case "/pages/zutaten":
      component = <Zutaten />
      break
    case "/pages/zufall":
      component = <Zufall />
      break
    default:
      component = <Home />
      break
  }

  return (
    <>
    <Navbar />
    {component}
    </>
  );
}

export default App;
