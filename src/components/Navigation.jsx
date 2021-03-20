import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavbarText } from 'reactstrap';


function Navigation() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar light expand="md" className="navigation pr-lg-3 pl-lg-3">
      <NavbarBrand className="mr-sm-4" href="/">
        <img src="IIITDLogo.png" className="d-none d-md-block" alt="AP" height="50" />
        <NavbarText className="h4 font-weight-bold text-color-main text-center d-inline d-md-none">
        Achievements Portal
        </NavbarText>
      </NavbarBrand>

      <NavbarToggler onClick={toggleNavbar} />

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

      <NavbarText className="h2 font-weight-bold text-color-main text-center d-none d-md-block">
      Achievements Portal
      </NavbarText>
    </Navbar>
  );
}

export default Navigation;
