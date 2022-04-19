import { Card } from 'react-bootstrap';
import React, * as react from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Posts from "./Posts";

interface iProps {
    userdata: { username: string;
            displayName: string;
            token: string | null;
            }
    
}

const Home : react.FC<iProps> = ({userdata}) => {

return (
<div style={{margin: "1em"}}>
    {userdata.username == '' ? (
        <Card>
            <Card.Header
                title="Log in!"
            />
            <Card.Body>
                <Button as={Link} to='Login' size='huge' inverted>
            Log in to see my art!
        </Button>

            </Card.Body>
        </Card>)
: (<Posts user={userdata} />)}
</div>
);
};

export default Home;
