import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Posts from "./Posts";

const Home = ({props, userdata}) => {

return (
<div style={{margin: "1em"}}>
    {userdata.username == '' ? (
        <Card>
            <CardHeader
                title="Log in!"
            />
            <CardContent>
                <Button as={Link} to='Login' size='huge' inverted>
            Log in to see my art!
        </Button>

            </CardContent>
        </Card>)
: (<Posts user={userdata} />)}
</div>
);
};

export default Home;
