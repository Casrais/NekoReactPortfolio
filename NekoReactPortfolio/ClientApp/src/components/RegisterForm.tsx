import { Card } from 'react-bootstrap';
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

interface iProps { ParentCallBack: any; }

interface iError { errors : [{}] }

const RegisterForm : react.FC<iProps> = ({ParentCallBack}) =>
{

    const [redirect, setRedirect] = react.useState({ goHome: false })
    const [Errors, setErrors] = react.useState<iError>({errors: [{error:""}]})

const register = async (creds: UserFormValues) => {
    try {
        await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/register`, creds).catch(error => setErrors({ errors: error }));
        if (!Errors.errors) {
            const user = await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/login`, creds);
            ParentCallBack(user.data);
            setRedirect({ goHome: true });
        }
        
    }
    catch (error) {throw error;}
}

    return (
        <div>
        <Card>
                <Card.Header
                    title="Register!"
                />
                <Card.Body>
                   <Formik initialValues={{
                    username: '', email: '', password: ''
        }} onSubmit={values => register(values)} >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <FormikForm className='ui form' onSubmit={handleSubmit} autoComplete='off' translate>
                                <ValidationErrors errors={Errors.errors} />
                                <Form.Group className="mb-3" controlId="formBasicUserName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control name="email" type="text" placeholder="Enter username" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password" />
                                </Form.Group>
                    <Button disabled={isSubmitting || !dirty || !isValid} 
                            loading={isSubmitting} positive content='Register' type='submit' fluid />
                </FormikForm>
            )}
        </Formik> 
                    
                </Card.Body>
            { redirect.goHome ? (<Redirect push to="/home"/>) : null }
            </Card>
            </div>
        
        )
}

export default RegisterForm;