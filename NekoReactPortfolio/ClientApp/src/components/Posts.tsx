import axios from "axios";
import { Console } from "console";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import PostsFiles from "./PostsFilesContainer";
import { Card, CardActions, CardContent, CardHeader, IconButton, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const PostManagement = () => {
    const [myPosts, setPosts] = useState({});



    const RetrieveData = async () => {
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/Post`).then(response => { setPosts(response.data.Items);});
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            margin: '1em',
            height:'auto',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        }
    }));


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const maptype = function (myPosts) {
        if (Object.keys(myPosts).length !== 0) {
            return myPosts.map((response, idx) => <div><div className="ItemRow" key={idx}><Card className={classes.root}>
                <CardHeader
                    title={response.PostTitle}
                    subheader={ dateConvert(response.PostDate)}
                />
                <PostsFiles Props={response.id} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { response.PostDesc }
                    </Typography>
                </CardContent>
                {/*<CardActions disableSpacing>*/}
                {/*    <IconButton aria-label="add to favorites">*/}
                {/*        <FavoriteIcon />*/}
                {/*    </IconButton>*/}
                {/*    <IconButton aria-label="share">*/}
                {/*        <ShareIcon />*/}
                {/*    </IconButton>*/}
                {/*    <IconButton*/}
                {/*        onClick={handleExpandClick}*/}
                {/*        aria-expanded={expanded}*/}
                {/*        aria-label="show more"*/}
                {/*    >*/}
                {/*        <ExpandMoreIcon />*/}
                {/*    </IconButton>*/}
                {/*</CardActions>*/}
            </Card></div></div>)
        }
        else {
            return <div></div>
        }

    }


    useEffect(() => {
    RetrieveData()
}, []);

    const dateConvert = (dateinput) => {
        var date = new Date(dateinput);
        var DateCon = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return DateCon
    }

    return (
        <div>
            <div>
                <div className="Files">{maptype(myPosts)}</div>
            </div>
        </div>
    );
};

export default PostManagement;