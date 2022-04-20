import { Card } from 'react-bootstrap';
import React, * as react from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Posts from "./Posts";

interface iProps {
    ParentCallBack: any;
    userdata: {
        username: string;
        displayName: string;
        token: string | null;
    };
}



const LogOut : react.FC<iProps> = ({ParentCallBack, userdata}) => {

const handleReset = () => {
  const newUser = {...userdata};
  newUser.username = '';
  newUser.displayName = '';
  newUser.token = '';
  return newUser;
}

react.useEffect( () => {
    window.localStorage.removeItem('jwt')
    ParentCallBack(handleReset());
    }, []);

return (
<div style={{margin: "1em"}}>
        <Card>
            <Card.Title title="Logged Out!">Logged Out!</Card.Title>
            <Card.Body>
            You are logged out now. Have a nice day!
            </Card.Body>
        </Card>
</div>
);
};

export default LogOut;