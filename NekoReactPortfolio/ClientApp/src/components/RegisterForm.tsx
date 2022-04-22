import React, * as react from "react";
import {UserFormValues} from "../models/user";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert, Card } from "react-bootstrap";

interface iProps { ParentCallBack: any; }

interface iError { errors : [{}] }

const RegisterForm : react.FC<iProps> = ({ParentCallBack}) =>
{

    const [redirect, setRedirect] = react.useState({ goHome: false })
    const [Errors, setErrors] = react.useState("")
    const [FormValues, setFormValues] = react.useState<UserFormValues>({ username: "", email: "", password: "" })
    const [password2, setPassword2] = react.useState({ password: "" })
    const [isLoading, setLoading] = react.useState(false);

const register = async (creds: UserFormValues) => {
    try {
        setErrors("");
        setLoading(true)
        await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/register`, creds).catch((reason) => { setErrors(String(reason)); setLoading(false); });
        if (Errors == "") {
            const user = await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Account/login`, creds)
            ParentCallBack(user.data);
            setRedirect({ goHome: true });
        }
            
        setLoading(false)
            
        }
        
    catch (error) {throw error;}
    }

    const handleChangeEmail = (event: string) => {
        setFormValues({ username: FormValues.username, email: event, password: FormValues.password })
    }
    const handleChangePW = (event: string) => {
        setFormValues({ username: FormValues.username, email: FormValues.email, password: event })
    }
    const handleChangeUserName = (event: string) => {
        setFormValues({ username: event, email: FormValues.email, password: FormValues.password })
    }

    const handleChangePW2 = (event: string) => {
        setPassword2({ password: event })
    }


    const onSubmitLogin = () => {
        if (FormValues.password == password2.password) { register(FormValues) }
    else { setErrors("Passwords don't match.") }}

    return (
        <Card>
            <Card.Header title="Register!">Register!</Card.Header>
            <Card.Body>
                <Form className='ui form' autoComplete='off'>
                    {Errors != "" && <Alert variant="danger" onClose={() => setErrors("") } dismissible>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            {Errors}
                        </p>
                    </Alert> }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="username" type="text" disabled={isLoading} placeholder="Enter User Name" defaultValue={FormValues.username} onChange={(e) => handleChangeUserName(e.target.value)} />
                        <Form.Text className="text-muted">
                            Your username cannot be changed after this and can't be the same as anyone else's. Choose wisely!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" disabled={isLoading} placeholder="Enter email" defaultValue={FormValues.email} onChange={(e) => handleChangeEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            I'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" disabled={isLoading} placeholder="Password" defaultValue={FormValues.password} onChange={(e) => handleChangePW(e.target.value)} />
                        <Form.Text className="text-muted">
                            Passwords must be 8 characters or longer, contain an uppercase, a lowercase, a number, and a special character. Record your password somewhere because I haven't implemented a method to reset them.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Password confirmation</Form.Label>
                        <Form.Control name="password2" disabled={isLoading} type="password" placeholder="Password again" defaultValue={password2.password} onChange={(e) => handleChangePW2(e.target.value)} />
                        <Form.Text className="text-muted">
                            Passwords must match.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" disabled={isLoading} onClick={onSubmitLogin}> {isLoading ? 'Loading…' : 'Submit'} </Button>
                </Form>

            </Card.Body>
            {redirect.goHome ? (<Redirect push to="/home" />) : null}
        </Card>
        
        )
}

export default RegisterForm;