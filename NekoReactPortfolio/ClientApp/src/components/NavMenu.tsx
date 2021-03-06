import { Link } from "react-router-dom"
import React, * as react from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';

interface iProps {
    userdata: { username: string;
            displayName: string;
            token: string | null;
            }
    
}

const NavMenu : react.FC<iProps> = ({ userdata }) => {

    const [state, setState] = react.useState({ isOpen: false })

const toggle = () => {
       setState({
            isOpen: !state.isOpen
        });
    }

const displayUserName = (usernm : iProps["userdata"]) => {
                                        if(usernm.username) {
                                                                return( <div>Welcome {usernm.username}!<NavLink tag={Link} className="text-dark" to="/logout">Log Out</NavLink></div>) 
                                                                } else 
                                        { return( <div><NavLink tag={Link} className="text-dark" to="/login">Sign In</NavLink><NavLink tag={Link} className="text-dark" to="/register">Register</NavLink></div>)}
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
                            {displayUserName(userdata)}
                        </NavItem>
                    </ul>
                </Collapse>
            </Container>
        </Navbar>
    </header>
);
};

export default NavMenu;