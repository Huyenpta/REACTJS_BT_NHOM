import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import '../App.css';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="images/logo.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="FPT Aptech logo"
          />{' '}
          FPT Aptech
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Thêm class nav-link-hover vào đây */}
            <Nav.Link href="#about" className="nav-link-hover">About Us</Nav.Link>
            <Nav.Link href="#products" className="nav-link-hover">Products</Nav.Link>
            <Nav.Link href="#booking" className="nav-link-hover">Booking</Nav.Link>
            <Nav.Link href="#locations" className="nav-link-hover">Locations</Nav.Link>
          </Nav>
          <Button variant="warning" className="me-2">Sign In</Button>
          <Button variant="outline-primary">Sign Up</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;