import { Card } from 'react-bootstrap';;
import { Form as FormikForm, Formik } from 'formik';
import React, * as react from "react";
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Posts from "./Posts";
import ValidationErrors from "./ValidationErrors";
import {UserFormValues} from "../models/user";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { Form } from "react-bootstrap";

interface iProps {
ParentCallBack: any;
}

interface iError { errors : [{}] }

const LoginForm : react.FC<iProps> = ({ParentCallBack}) =>
{

const [redirect, setRedirect] = react.useState({ goHome: false})
const [Errors, setErrors] = react.useState<iError>({errors: [{error:""}]})
const [FormValues, setFormValues] = react.useState<UserFormValues>({ username: "", email: "", password: ""})

const login = async (creds: UserFormValues) => {
    try {
        await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/login`, creds).catch(error => setErrors({ errors: error }));
        if (!Errors.errors[0]) {
            const user = await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/login`, creds);
            ParentCallBack(user.data);
            setRedirect({ goHome: true });
        }
}
    catch (error) {throw error;}
}

    return (

        <Card>
                <Card.Header
                    title="Log in!"
                />
            <Card.Body>
                <Form className='ui form' onSubmit={login(FormValues)} autoComplete='off'>
                    <ValidationErrors errors={ Errors.errors }/>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name = "password" type="password" placeholder="Password" />
                            </Form.Group>
                            <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
                    
                </Card.Body>
            { redirect.goHome ? (<Redirect push to="/home"/>) : null }
            </Card>

        
        )
}

export default LoginForm;