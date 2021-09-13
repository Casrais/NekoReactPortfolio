import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import Posts from "./Posts";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FileCarouselItem from "./FileCarouselItem";
import "./App.css";

const CarouselFiles = ({  }) => {
    const [items, setItems] = useState([{ id: "", Title: "", PostId: [{}], Excerpt: "", URL: "", LightBoxURL: "", FileType: "", Medium: [{}], Category: [{}], CreatedBy: [{}], DateCreated: "", Rating: "" }]);

    const RetrieveData = async () => {
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/File/`).then(response => { setItems(response.data.Items); });
    }

    useEffect(() => {
        RetrieveData()
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: theme.palette.background.paper,
            width:'100%',
        },
        image: {
            maxHeight: '300px',
            width: '100%',
            height: '100%',
            transform: 'translateY(0%)',
            left: '0%',
        },
        title: {
            position: 'absolute',
            width: 'auto',
        },
        item: {
            overflow: 'hidden',
            borderRadius: '1em',
            position: 'relative',
            height: '100%',

            width: '100%',
            flex: 'shrink',
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
        slide: {
            minWidth:'0px',
        },
        Carousel: {
            display:'flex',
            minWidth: '0px',
            margin: '0em',
            padding: '0em',
            height: '200px',
            overflow:'hidden',
        },
        Container: {
            display: 'flex',
            maxWidth: '25%',
            margin: '0em',
            padding: '0em',
        }
    }));

    const classes = useStyles();

    const smallItemStyles: React.CSSProperties = {
        cursor: 'pointer',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%',
    }

    const maptype = function (myPosts) {
        if (Object.keys(myPosts).length !== 0) {
            return myPosts.map((response, idx) => <div key={idx}>
                <FileCarouselItem Props={response.id}/>
            </div>)
        }
        else {
            return <div></div>
        }

    }


    const dateConvert = (dateinput) => {
        var date = new Date(dateinput);
        var DateCon = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return DateCon
    }

    const selectedRange = (myPosts) => {
        var upper = Object.keys(myPosts).length;
        var range = Math.floor((Math.random() * (upper)))
        if (range === upper) { range = range - 1 }
        if (range <= 1) { range = 3 }
        return range
    }

    const modthing = (index, item) => {
       return <Modal
            aria-labelledby={item.Title}
            aria-describedby={item.Excerpt}
            className={classes.modal}
            open={true}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        ><div>
                <img src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.LightBoxURL} alt={item.Title} />

                <Fade in={true}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{item.Title + " - " + dateConvert(item.DateCreated)}</h2>
                        <p id="transition-modal-description">{item.Excerpt}</p>
                    </div>
                </Fade>
            </div>
        </Modal>

    }

    return (
        <div className={classes.root}>
            <div className={classes.Container}><Carousel className={classes.Carousel} onClickItem={ modthing } autoPlay={true} infiniteLoop={true} stopOnHover={false} axis="vertical" showThumbs={false} showArrows={false} showStatus={false} showIndicators={false} selectedItem={selectedRange(items) }>
            {maptype(items)}
        </Carousel></div>
            <div className={classes.Container}><Carousel className={classes.Carousel} onClickItem={modthing} autoPlay={true} infiniteLoop={true} stopOnHover={false} axis="vertical" showThumbs={false} showArrows={false} showStatus={false} showIndicators={false} selectedItem={selectedRange(items)}>
            {maptype(items)}
        </Carousel></div>
            <div className={classes.Container}><Carousel className={classes.Carousel} onClickItem={modthing}  autoPlay={true} infiniteLoop={true} stopOnHover={false} axis="vertical" showThumbs={false} showArrows={false} showStatus={false} showIndicators={false} selectedItem={selectedRange(items)}>
            {maptype(items)}
        </Carousel></div>
            <div className={classes.Container}><Carousel className={classes.Carousel} onClickItem={modthing} autoPlay={true} infiniteLoop={true} stopOnHover={false}  axis="vertical" showThumbs={false} showArrows={false} showStatus={false} showIndicators={false} selectedItem={selectedRange(items)}>
            {maptype(items)}
            </Carousel></div>
            </div>
    );
};


export default CarouselFiles;
