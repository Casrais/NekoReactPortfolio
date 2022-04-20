﻿import React, * as react from "react";
import Posts from "./Posts";
import {UserFormValues} from "../models/user";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

interface iProps {
ParentCallBack: any;
}

interface iUser {
    username: string;
    displayName: string;
    token: string | null;
}

interface iError { errors : [{}] }

const LoginForm : react.FC<iProps> = ({ParentCallBack}) =>
{

const [redirect, setRedirect] = react.useState({ goHome: false})
const [Errors, setErrors] = react.useState<iError>({errors: [{error:""}]})
const [FormValues, setFormValues] = react.useState<UserFormValues>({ username: "", email: "", password: ""})
const [isLoading, setLoading] = react.useState(false);

 const handleChangeEmail = (event : string) => {
     setFormValues({ username: FormValues.username, email: event, password: FormValues.password })
    }
const handleChangePW = (event : string) => {
        setFormValues({ username: FormValues.username, email: FormValues.email, password: event })
    }

const login = async (creds: UserFormValues) => {
    try {
            setLoading(true)
            const user = await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/login`, creds);
            if (user.data.token != "" && user.data.token != null) {ParentCallBack(user.data)};
            setLoading(false)
            setRedirect({ goHome: true });
        }
    catch (error) {throw error; setLoading(false);}
    }

react.useEffect( () => {
    }, [FormValues]);

    const onSubmitLogin = () => {login(FormValues) }


    return (

        <Card>
                <Card.Header title="Log in!">Log in!</Card.Header>
            <Card.Body>
                <Form className='ui form' autoComplete='off'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" disabled={isLoading} type="email" placeholder="Enter email" defaultValue={FormValues.email} onChange={(e) => handleChangeEmail(e.target.value)}  />
                                <Form.Text className="text-muted">
                                    I'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" disabled={isLoading} type="password" placeholder="Password" defaultValue={FormValues.password} onChange={(e) => handleChangePW(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" disabled={isLoading} onClick={onSubmitLogin}> {isLoading ? 'Loading…' : 'Submit'} </Button>
                </Form>
                    
                </Card.Body>
                {redirect.goHome ? (<Redirect push to="/home" />) : null}
            </Card>

        
        )
}

export default LoginForm;