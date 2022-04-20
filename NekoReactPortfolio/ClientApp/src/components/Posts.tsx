import axios from "axios";
import { Console } from "console";
import React, * as react from "react";
import { Input } from "reactstrap";
import PostsFiles from "./PostsFilesContainer";
import { Card } from 'react-bootstrap';

interface iProps {
    user: {
        username: string;
        displayName: string;
        token: string | null;
    };
}

interface iPost {
     Items: [{      id : string;
                    PostTitle : string;
                    PostDesc: string;
                    PostDate : Date;
                    }]
    };

const PostManagement : react.FC<iProps> = ({user}) => {
    const [myPosts, setPosts] = react.useState<iPost>({Items : [{id: "",PostTitle: "", PostDate: new Date("1/1/1900"),  PostDesc: ""}]});

    const RetrieveData = async () => {
        const token = user.token;
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/Post`, { headers: { "Authorization": `Bearer ${token}` } }).then(response => { if(response.data) {setPosts(response.data)};});
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const maptype = function (myPosts : iPost["Items"]) {
        if (myPosts != null) {
        if (Object.keys(myPosts).length !== 0) {
            return myPosts.map((myPosts, idx) => <div><div className="ItemRow" key={idx}>
                <Card className="Card">
                    <Card.Header> {myPosts.PostTitle} { dateConvert(myPosts.PostDate)}</Card.Header>
                    <Card.Body>
                            <PostsFiles Props={myPosts.id} user={user} />
                            <div>{ myPosts.PostDesc }</div>
                    </Card.Body>
            </Card></div>
            </div>)
        }
        else {
            return <div></div>
        }
        }
        else {
            return <div></div>
        }

    }


    react.useEffect(() => {
    RetrieveData()
}, []);

react.useEffect(() => {
    RetrieveData()
}, [user]);

    const dateConvert = (dateinput : Date) => {
        var date = new Date(dateinput);
        var DateCon = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return DateCon
    }

    return (
        <div className="indFront">
            <div>
                <div className="Files">{myPosts.Items && maptype(myPosts.Items)}</div>
            </div>
        </div>
    );
};

export default PostManagement;