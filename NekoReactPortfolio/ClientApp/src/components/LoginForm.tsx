﻿import { CardContent } from '@material-ui/core';
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

export default function LoginForm({ParentCallBack})
{

const [redirect, setRedirect] = useState({ goHome: false})


const login = async (creds: UserFormValues) => {
    try {
    const user = await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/login`, creds);
    ParentCallBack(user.data);
    setRedirect({ goHome: true })
    }
    catch (error) {throw error;}
}

    return (

        <Card>
                <CardHeader
                    title="Log in!"
                />
                <CardContent>
                   <Formik initialValues={{
                    username: '', email: '', password: ''
        }} onSubmit={values => login(values)} >
            {({ handleSubmit, isSubmitting }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' translate>
                    <MyTextInput name='email' placeholder='Email' />
                            <MyTextInput name='password' placeholder='Password' type='password' />
                            <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik> 
                    
                </CardContent>
            { redirect.goHome ? (<Redirect push to="/home"/>) : null }
            </Card>

        
        )
}