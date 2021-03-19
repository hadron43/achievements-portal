import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container, NavbarText } from 'reactstrap';


function Navigation() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Container fluid className="navigation">
      <Navbar light expand="md">
        <NavbarBrand className="m-2 mr-5 d-none d-md-block" href="/">
          <img src="IIITDLogo.png" alt="AP" height="50" />
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} className="mr-2" />

        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem className="mr-4 mt-2 mb-2" >
              <Link className="m-auto text-center d-block" to="/">Home</Link>
            </NavItem>
            <NavItem className="mr-4 mt-2 mb-2 d-block">
              <Link className="m-auto text-center d-block" to="/">About</Link>
            </NavItem>
            <NavItem className="mr-4 mt-2 mb-2 d-block">
              <Link className="m-auto text-center d-block" to="/">Sign Up</Link>
            </NavItem>
            <NavItem className="mr-4 mt-2 mb-2 d-block">
              <Link className="m-auto text-center d-block" to="/">Login</Link>
            </NavItem>
          </Nav>
        </Collapse>

        <NavbarText className="h2 font-weight-bold text-color-main text-center">
        Achievements Portal
        </NavbarText>
      </Navbar>
    </Container>
  );
}

export default Navigation;
