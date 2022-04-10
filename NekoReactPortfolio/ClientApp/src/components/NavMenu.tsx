import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';


const NavMenu = ({ Props }) => {

    const [state, setState] = useState({ isOpen: false })

const toggle = () => {
       setState({
            isOpen: !state.isOpen
        });
    }

    return (
    <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 NavWhite" light>
            <Container>
                <NavbarBrand tag={Link} to="/">NekoReactPortfolio</NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={state.isOpen} navbar>
                    <ul className="navbar-nav flex-grow">
                            <NavItem>
                            {Props.username != '' ? (<div>Welcome {Props.username}!<NavLink tag={Link} className="text-dark" to="/logout">Log Out</NavLink></div>) : (<div><NavLink tag={Link} className="text-dark" to="/login">Sign In</NavLink><NavLink tag={Link} className="text-dark" to="/register">Register</NavLink></div>)}
                        </NavItem>
                    </ul>
                </Collapse>
            </Container>
        </Navbar>
    </header>
);
};

export default NavMenu;
//