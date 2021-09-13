import axios from "axios";
import { Console } from "console";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { makeStyles } from "@material-ui/core";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const File = ({ Props }) => {
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
            maxHeight: '300px',
            width: 'auto',
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
        <div><ImageListItem className={classes.item} key={item.id}>
            <img className={classes.image} src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.URL} alt={item.Title} onClick={handleOpen}/>
            <ImageListItemBar className={classes.title}
                    title={item.Title}
                    subtitle={<div>{item.Excerpt}</div>}
            />
            
            </ImageListItem>
        <Modal
                aria-labelledby={ item.Title }
                aria-describedby={ item.Excerpt }
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            ><div>
                    <img src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.LightBoxURL} alt={item.Title} />
                    
                <Fade in={open}>
                    <div className={classes.paper}>
                            <h2 id="transition-modal-title">{ item.Title+" - "+ dateConvert(item.DateCreated)}</h2>
                            <p id="transition-modal-description">{ item.Excerpt }</p>
                    </div>
                </Fade>
                </div>
            </Modal></div>
    );
};

export default File;

