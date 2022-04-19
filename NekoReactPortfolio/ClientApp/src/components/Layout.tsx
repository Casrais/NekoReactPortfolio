import React, * as react from "react";
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import Carousel from "./CarouselFiles";
import { Route } from 'react-router';
import Home from './Home';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LogOut from './LogOut';
import { User } from "../models/user";
import * as bootstrap from "react-bootstrap"
import axios from "axios";

interface iUser {
    username: string;
    displayName: string;
    token: string | null;
}


const Layout = () => {

    const [users, setUsers] = react.useState<iUser>({
        username: '',
        displayName: '',
        token: window.localStorage.getItem('jwt') })

    const GetUserFromToken = async (tkn : string | null) => {
        if (tkn) { var user = await axios.get(`https://nekocosmosapi.azurewebsites.net/api/Account`, { headers: { "Authorization": `Bearer ${tkn}` } }); 
                    setUsers(user.data)}
    }

    const isnullToken = (token : string | null) => { return token == null ? '' : String(token) }

    react.useEffect( () => {
        if (users.token != '') { GetUserFromToken(users.token); 
                            window.localStorage.setItem('jwt', isnullToken(users.token))
                            };
    }, []);

    react.useEffect( () => {
        if (users.token != '') { window.localStorage.setItem('jwt', isnullToken(users.token)) }
        else {window.localStorage.removeItem('jwt')}
    }, [users]);


    const changeUserData = (user : iUser) => {setUsers(user);}

    return (
    <React.Fragment>
                <div className="Gradient">
                   <Carousel/>
                </div>
                <NavMenu userdata={users} />
                
                <bootstrap.Container>
                    <Route exact path='/' render={(props) => <Home userdata = {users} />}/>
                             <Route path={'/(.+)'}
                        render={() => (
                <>
                    <bootstrap.Container style={{ marginTop: '1em', marginBottom:'1em'}}>
                        <Route path='/login' render={(props) => <LoginForm {...props} ParentCallBack={changeUserData} />} />
                        <Route path='/register' render={(props) => <RegisterForm {...props} ParentCallBack={changeUserData} />} />
                        <Route path='/logout' render={(props) => <LogOut {...props} ParentCallBack={changeUserData} userdata={users}/>} />
                </bootstrap.Container>
                </>
            )}
            />
                </bootstrap.Container>
            </React.Fragment>
);
};

export default Layout;