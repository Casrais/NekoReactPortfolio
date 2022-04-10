import { Card, CardContent, CardHeader } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Posts from "./Posts";

const LogOut = ({ParentCallBack, userdata}) => {

const handleReset = () => {
  const newUser = {...userdata};
  newUser.username = '';
  newUser.displayName = '';
  newUser.token = '';
  return newUser;
}

useEffect( () => {
    window.localStorage.removeItem('jwt')
    ParentCallBack(handleReset());
    }, []);

return (
<div style={{margin: "1em"}}>
        <Card>
            <CardHeader
                title="Logged Out!"
            />
            <CardContent>
            You are logged out now. Have a nice day!

            </CardContent>
        </Card>
</div>
);
};

export default LogOut;