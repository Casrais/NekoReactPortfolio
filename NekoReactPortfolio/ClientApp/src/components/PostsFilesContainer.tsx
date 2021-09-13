import axios from "axios";
import { Console } from "console";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import File from "./File";
import { FormControlLabel, ImageList, makeStyles, Switch } from "@material-ui/core";
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';

const FileUpdate = ({ Props }) => {
    const [FileContainer, setFileContainer] = useState({});
    const [checked, setChecked] = React.useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const RetrieveData = async (id) => {
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/PostFiles/` + id).then(response => { setFileContainer(response.data.Items);});
    }

    useEffect(() => {
    RetrieveData(Props)
}, []);


    const maptype = function (myPosts) {
        if (Object.keys(myPosts).length !== 0) {
            return myPosts.map((response, idx) => <div><div className="ItemRow" key={idx}><File Props={response.id} /></div></div>)
        }
        else {
            return <div></div>
        }

    }

    const useStyles = makeStyles((theme) => ({
        root: {
            justifyContent: 'space-around',
            backgroundColor: theme.palette.background.paper,
            height: 'auto',
        },
        imageList: {
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
    }));

    const classes = useStyles();

    return (
        <div>
         <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Show"
            />
        <div className={classes.root}>
                <Collapse in={checked}>
            <Grow in={checked}>
                <ImageList rowHeight="auto" className={classes.imageList} cols={3}>{maptype(FileContainer)}</ImageList>
                    </Grow>
                    </Collapse>
            </div>
            </div>
    );
};

export default FileUpdate;

