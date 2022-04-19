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
     response: [{   PostTitle : string;
                    PostDate : Date;
                    id: string;
                    PostDesc: string;
                    }]
    };

const PostManagement : react.FC<iProps> = ({user}) => {
    const [myPosts, setPosts] = react.useState<iPost>({response : [{PostTitle: "", PostDate: new Date("1/1/1900"), id: "", PostDesc: ""}]});

    const RetrieveData = async () => {
        const token = user.token;
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/Post`, { headers: { "Authorization": `Bearer ${token}` } }).then(response => { setPosts(response.data.Items);});
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const maptype = function (myPosts : iPost["response"]) {
        if (Object.keys(myPosts).length !== 0) {
            return myPosts.map((response, idx) => <div><div className="ItemRow" key={idx}><Card className="root">
                <Card.Title> {response.PostTitle} { dateConvert(response.PostDate)}</Card.Title>
                <PostsFiles Props={response.id} user={user} />
                <Card.Body>
                        { response.PostDesc }
                </Card.Body>
            </Card></div>
            </div>)
        }
        else {
            return <div></div>
        }

    }


    react.useEffect(() => {
    RetrieveData()
}, []);

    const dateConvert = (dateinput : Date) => {
        var date = new Date(dateinput);
        var DateCon = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return DateCon
    }

    return (
        <div className="indFront">
            <div>
                <div className="Files">{myPosts.response && maptype(myPosts.response)}</div>
            </div>
        </div>
    );
};

export default PostManagement;