import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import TodoList from './components/TodoList'; 

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">TODO App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/todos">Teendők</Nav.Link>
              <Nav.Link as={Link} to="/about">Rólunk</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-5">
              <h1>Üdvözöljük a TODO alkalmazásban!</h1>
              <p>Használja a menüt a feladatok kezeléséhez.</p>
            </div>
          } />

          <Route path="/todos" element={<TodoList />} />

          <Route path="/about" element={
            <div className="mt-5">
              <h2>Rólunk</h2>
              <p>Kedves Látogató! A Teleki Blanka a 19. században mert nagyot álmodni... 
                        Mezőtúron 1897 szeptemberében megnyitotta kapuit egy iskola, 
                        amely kifejezetten a nőnevelés úttörőjének számított.
                    </p>
                    <h5>💡 Érdekesség a Blackjack világából:</h5>
                    <p className="font-italic mb-0">
                            Tudtad, hogy a Blackjack az egyetlen kaszinójáték, ahol a játékosnak 
                            matematikailag esélye van hosszú távon legyőzni a házat? 
                            A "lapszámolás" technikájával a játékos nyomon követheti a pakliban maradt 
                            magas és alacsony lapok arányát, így stratégiailag előnybe kerülhet.
                        </p>
              <p></p>
            </div>
          } />
          
          <Route path="*" element={<h2>A keresett oldal nem található.</h2>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;