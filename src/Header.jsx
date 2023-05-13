import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';
import DropdownMenu from './Dropdown.jsx';
import Logo from './Images/logo.png';
import SecondLogo from './Images/secondlogo.png';
import DropdownMenuTwo from './DropdownTwo.jsx';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid style={{marginLeft: "0px"}}>
        <Navbar.Brand href="#">
          <img src={Logo} alt="Logo" />
        </Navbar.Brand>
        <DropdownMenu />
        <img src={SecondLogo} style={{marginLeft: "50px"}} alt="SecondLogo" height="30px" width="80px"/>
        <DropdownMenuTwo />
        
      </Container>
    </Navbar>
  );
}

export default Header;

