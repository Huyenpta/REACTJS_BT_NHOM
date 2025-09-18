import { Navbar, Nav, Button, Container } from 'react-bootstrap';

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
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#booking">Booking</Nav.Link>
            <Nav.Link href="#locations">Locations</Nav.Link>
          </Nav>
          <Button variant="warning" className="me-2">Sign In</Button>
          <Button variant="outline-primary">Sign Up</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
