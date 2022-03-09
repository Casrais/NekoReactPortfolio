import axios from "axios";
import { Console } from "console";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { makeStyles } from "@material-ui/core";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const FileCarouselItem = ({ Props }) => {
    const [item, setItem] = useState({ id:"", Title: "", PostId: [{}],Excerpt: "", URL: "", LightBoxURL: "", FileType: "", Medium: [{}], Category: [{}], CreatedBy: [{}], DateCreated: "", Rating:""});
    const [open, setOpen] = React.useState(false);

    const RetrieveData = async (id) => {
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/File/` + id).then(response => { setItem(response.data.Items[Object.keys(response.data.Items)[0]]);});
    }

    useEffect(() => {
    RetrieveData(Props)
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: theme.palette.background.paper,
        },
        image: {
            zIndex: 4,
            width: '100%',
            height: '100%',
            transform: 'translateY(0%)',
            left:'0%',
        },
        title: {
            position:'absolute',
            width: 'auto',
        },
        item: {
            overflow: 'hidden',
            borderRadius: '1em',
            position:'relative',
            height: '100%',
            
            width: 'auto',
            flex:'shrink',
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        Carousel: {
            zIndex:4,
            height: 'auto',
            width: '100%',
        }
    }));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

        const smallItemStyles: React.CSSProperties = {
            cursor: 'pointer',
            objectFit: 'cover',
            width: '100%',
            maxHeight: '100%',
    }

    const dateConvert = (dateinput) => {
        var date = new Date(dateinput);
        var DateCon = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return DateCon
    }

    return (
        <div className={classes.Carousel}>
            <img className={classes.image}src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.URL} alt={item.Title}/>
        </div>
    );
};

export default FileCarouselItem;

