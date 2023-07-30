import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AppNavbar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">HDBMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/person">Person</Nav.Link>
            <Nav.Link href="/patient">Patient</Nav.Link>
            <Nav.Link href="/doctor">Doctor</Nav.Link>
            <Nav.Link href="/appointment">Appointment</Nav.Link>
            <Nav.Link href="/room">Rooms</Nav.Link>
            <Nav.Link href="/department">Departments</Nav.Link>
            <Nav.Link href="/Is_In">Reserve Room</Nav.Link>
            <Nav.Link href="/disease">Diseases</Nav.Link>
            <Nav.Link href="/hasDisease">Has Disease</Nav.Link>
            <Nav.Link href="/interesting">Analytics</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;