import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavbarText, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { clearUserData, fetchUserProfile } from '../redux/ActionCreators'
import { useEffect } from 'react';

const mapStateToProps = state => ({
  authorized: state.user.authorized,
  token: state.user.token,
  profile: state.user.profile,
  profileLoaded: state.user.profileLoaded
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(clearUserData()),
  fetchUserProfile: (key) => dispatch(fetchUserProfile(key))
});

function UserIcon({authorized, admin, logout}) {
  return (
    (authorized) ?
    <div>
      <UncontrolledDropdown inNavbar>
        <DropdownToggle className="m-auto p-auto" nav caret>
          <img className={`rounded-circle mr-2 ${admin?"red-glow":""}`} width="50" height="50"
            src="/assets/Profile/dp.png" alt="Display" />
        </DropdownToggle>
        <DropdownMenu right>

          <Link to="/addachievement">
            <DropdownItem>
            Add Achievement
            </DropdownItem>
          </Link>

          <Link to="/addproject">
            <DropdownItem>
            Add Project
            </DropdownItem>
          </Link>

          <Link to="/myachievements">
            <DropdownItem>
            My Achievements
            </DropdownItem>
          </Link>

          <Link to="/myprojects">
            <DropdownItem>
            My Projects
            </DropdownItem>
          </Link>

          <Link to="/profile">
            <DropdownItem>
              My Profile
            </DropdownItem>
          </Link>

          <Link className={admin ? '' : 'd-none'} to="/pending-projects">
            <DropdownItem>
              Pending Projects
            </DropdownItem>
          </Link>

          <Link className={admin ? '' : 'd-none'} to="/pending-achievements">
            <DropdownItem>
              Pending Achievements
            </DropdownItem>
          </Link>

          <DropdownItem divider />
          <DropdownItem onClick={logout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
    :
    <>
    </>
  )
}

function Navigation(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if(props.authorized && !props.profileLoaded)
      props.fetchUserProfile(props.token);
    setAdmin(props.profile && props.profile.designation === 3)
  }, [props])

  return (
    <Navbar light expand="md" className="navigation pr-lg-3 pl-lg-3">
      <NavbarBrand className="mr-sm-3 d-flex" href="/">
        <img src="/IIITDLogo.png" className="" alt="AP" height="50" />
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
            <Link className="m-auto text-center d-block" to="/about">About</Link>
          </NavItem>

          {/* SHOW ONLY WHEN AUTHORIZED  */}
          <NavItem className={`mr-4 my-2 ${!props.authorized ? "d-none" : "d-block"}`}>
            <Link className="m-auto text-center d-block" to="/projects">Projects</Link>
          </NavItem>
          <NavItem className={`mr-4 my-2 ${!props.authorized ? "d-none" : "d-block"}`}>
            <Link className="m-auto text-center d-block" to="/achievements">Achievements</Link>
          </NavItem>

          {/* SHOW ONLY WHEN NOT AUTHORIZED  */}
          {/* <NavItem className={`mr-4 my-2 ${props.authorized ? "d-none" : "d-block"}`}>
            <Link className="m-auto text-center d-block" to="/signup">Sign Up</Link>
          </NavItem> */}
          <NavItem className={`mr-4 my-2 ${props.authorized ? "d-none" : "d-block"}`}>
            <Link className="m-auto text-center d-block" to="/login">Login</Link>
          </NavItem>

          <NavItem className="d-block d-md-none my-2">
            <div className="m-auto text-center d-block">
              <UserIcon authorized={props.authorized} admin={admin}  logout={props.logout} />
            </div>
          </NavItem>
        </Nav>
      </Collapse>

      <NavbarText className="h2 font-weight-bold text-color-main text-center d-none d-lg-block">
      Achievements Portal
      </NavbarText>
      <div className="d-none d-md-block ml-4">
        <UserIcon authorized={props.authorized} admin={admin} logout={props.logout} />
      </div>
    </Navbar>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
