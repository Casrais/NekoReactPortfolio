import { CardContent } from '@material-ui/core';
import { Card, CardHeader } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import MyTextInput from './MyTextInput';
import Posts from "./Posts";
import {UserFormValues} from "../models/user";
import axios from "axios";
import { Redirect } from 'react-router-dom';

export default function RegisterForm({ParentCallBack})
{

    const [redirect, setRedirect] = useState({ goHome: false })
    const [Errors, setErrors] = useState({})

const register = async (creds: UserFormValues) => {
    try {
        await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/register`, creds).catch(error => setErrors({ error }));
        if (Errors) {
            const user = await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/login`, creds);
            ParentCallBack(user.data);
            setRedirect({ goHome: true });
        }
        
    }
    catch (error) {throw error;}
}

    return (

        <Card>
                <CardHeader
                    title="Register!"
                />
                <CardContent>
                   <Formik initialValues={{
                    username: '', email: '', password: ''
        }} onSubmit={values => register(values)} >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' translate>
                            <ErrorMessage name='error' render={() => <ValidationErrors errors={ Errors.error }/> } />
                    <MyTextInput name='username' placeholder='UserName' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <Button disabled={isSubmitting || !dirty || !isValid} 
                            loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik> 
                    
                </CardContent>
            { redirect.goHome ? (<Redirect push to="/home"/>) : null }
            </Card>

        
        )
}