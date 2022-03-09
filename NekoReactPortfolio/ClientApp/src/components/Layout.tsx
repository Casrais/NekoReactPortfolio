import React, { useEffect, useState } from "react";
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import Carousel from "./CarouselFiles";
import { Route } from 'react-router';
import Home from './Home';
import LoginForm from './LoginForm';
import {User} from "../models/user";

const Layout = () => {

    const [users, setUsers] = useState({
        username: '',
        displayName: '',
        token: '' })

    const changeUserData = (user) => {setUsers(user);}

    return (
    <React.Fragment>
                <div className="Gradient">
                   <Carousel/>
                </div>
                <NavMenu Props={users} />
                
                <Container>
                    <Route exact path='/' render={(props) => <Home {...props} userdata = {users} />}/>
                             <Route path={'/(.+)'}
                        render={() => (
                <>
                    <Container style={{ marginTop: '1em', marginBottom:'1em'}}>
                        <Route path='/login' render={(props) => <LoginForm {...props} ParentCallBack={changeUserData} />} />
                </Container>
                </>
            )}
            />
                </Container>
            </React.Fragment>
);
};

export default Layout;