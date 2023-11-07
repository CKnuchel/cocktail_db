import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function MyNavbar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Link to="/" className="navbar-brand">Cocktail DB</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/pages/cocktail" className="nav-link">Cocktail suchen</Nav.Link>
          <Nav.Link as={Link} to="/pages/zutaten" className="nav-link">Zutaten suchen</Nav.Link>
          <Nav.Link as={Link} to="/pages/zufall" className="nav-link">Zufälliger Cocktail</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
