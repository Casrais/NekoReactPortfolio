import React, { useEffect, useState } from "react";
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import Carousel from "./CarouselFiles";
import { Route } from 'react-router';
import Home from './Home';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LogOut from './LogOut';
import {User} from "../models/user";
import axios from "axios";

const Layout = () => {

    const [users, setUsers] = useState({
        username: '',
        displayName: '',
        token: window.localStorage.getItem('jwt') })

    const GetUserFromToken = async (tkn) => {
        if (tkn) { var user = await axios.get(`https://nekocosmosapi.azurewebsites.net/api/Account`, { headers: { "Authorization": `Bearer ${tkn}` } }); 
                    setUsers(user.data)}
    }

    useEffect( () => {
        if (users.token != '' && users.token != null) { GetUserFromToken(users.token); 
                            window.localStorage.setItem('jwt', users.token)
                            };
    }, []);

useEffect( () => {
        if (users.token != '' && users.token != null) { window.localStorage.setItem('jwt', users.token) }
        else {window.localStorage.removeItem('jwt')}
    }, [users]);


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
                        <Route path='/register' render={(props) => <RegisterForm {...props} ParentCallBack={changeUserData} />} />
                        <Route path='/logout' render={(props) => <LogOut {...props} ParentCallBack={changeUserData} userdata={users}/>} />
                </Container>
                </>
            )}
            />
                </Container>
            </React.Fragment>
);
};

export default Layout;