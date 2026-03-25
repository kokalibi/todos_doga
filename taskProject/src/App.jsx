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
              <p>Ezt az alkalmazást a backend és frontend gyakorlás keretében készítettem.</p>
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