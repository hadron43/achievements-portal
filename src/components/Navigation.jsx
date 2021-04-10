import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavbarText, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    admin: state.user.admin,
    email: state.user.email,
    name: state.user.name,
    picture: state.user.picture
  }
}

function UserIcon({admin}) {
  // const [userOptionsCollapsed, setUserOptionsCollapsed] = useState(true);
  // const toggleUserOptions = () => setUserOptionsCollapsed(!userOptionsCollapsed);

  return (
    <div className="">
      <UncontrolledDropdown inNavbar>
        <DropdownToggle className="m-auto p-auto" nav caret>
          <img className={`rounded-circle mr-2 ${admin?"red-glow":""}`} width="50" height="50"
            src="../../assets/Profile/dp.png" alt="Display" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            Add Achievement
          </DropdownItem>
          <DropdownItem>
            My Achievements
          </DropdownItem>
          <DropdownItem>
            My Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

function Navigation(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar light expand="md" className="navigation pr-lg-3 pl-lg-3">
      <NavbarBrand className="mr-sm-3 d-flex" href="/">
        <img src="IIITDLogo.png" className="" alt="AP" height="50" />
        <NavbarText className="h1 font-weight-bold text-color-main d-flex d-sm-none my-auto ml-3 p-0">
        AP
        </NavbarText>
        <NavbarText className="h3 font-weight-bold text-color-main d-none d-sm-flex d-md-none my-auto ml-3 p-0">
        Achievements Portal
        </NavbarText>
      </NavbarBrand>

      <NavbarToggler onClick={toggleNavbar} />

      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem className="mr-4 my-2" >
            <Link className="m-auto text-center d-block" to="/">Home</Link>
          </NavItem>
          <NavItem className="mr-4 my-2 d-block">
            <Link className="m-auto text-center d-block" to="/">About</Link>
          </NavItem>
          <NavItem className="mr-4 my-2 d-block">
            <Link className="m-auto text-center d-block" to="/">Sign Up</Link>
          </NavItem>
          <NavItem className="mr-4 my-2 d-block">
            <Link className="m-auto text-center d-block" to="/">Login</Link>
          </NavItem>
          <NavItem className="d-block d-md-none my-2">
            <div className="m-auto text-center d-block">
              <UserIcon admin={true}/>
            </div>
          </NavItem>
        </Nav>
      </Collapse>

      <NavbarText className="h2 font-weight-bold text-color-main text-center d-none d-md-block">
      Achievements Portal
      </NavbarText>
      <div className="d-none d-md-block ml-4">
        <UserIcon admin={true} />
      </div>
    </Navbar>
  );
}

export default withRouter(connect(mapStateToProps)(Navigation));
