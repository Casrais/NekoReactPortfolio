import React, { useEffect, useState } from "react";
//import { connect } from 'react-redux';
//import axios from "axios";
//import Posts from "./Posts";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
//import { makeStyles } from "@mui/base";
//import Modal from '@mui/base/Modal';
//import Backdrop from '@mui/base/Backdrop';
//import Fade from '@mui/base/Fade';
/*import FileCarouselItem from "./FileCarouselItem";*/
import "./App.css";

const CarouselFiles = ({  }) => {
    const [items, setItems] = useState([{ id: "", Title: "", PostId: [{}], Excerpt: "", URL: "", LightBoxURL: "", FileType: "", Medium: [{}], Category: [{}], CreatedBy: [{}], DateCreated: "", Rating: "" }]);

    //const RetrieveData = async () => {
    //    await axios.get(`https://nekocosmosapi.azurewebsites.net/api/File/`).then(response => { setItems(response.data.Items); });
    //}

    //useEffect(() => {
    //    RetrieveData()
    //}, []);

    const smallItemStyles: React.CSSProperties = {
        cursor: 'pointer',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%',
    }

//    const maptype = function (myPosts) {
//        if (Object.keys(myPosts).length !== 0) {
//            return myPosts.map((response, idx) => <img key={idx} className={classes.image} src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + response.URL} alt={response.Title} />
//)
//        }
//        else {
//            return <div></div>
//        }

//    }


    //const dateConvert = (dateinput) => {
    //    var date = new Date(dateinput);
    //    var DateCon = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    //    return DateCon
    //}

    //const selectedRange = (myPosts) => {
    //    var upper = Object.keys(myPosts).length;
    //    var range = Math.floor((Math.random() * upper)+1)
    //    return range
    //}

    //const SelectedObj = (item) => {
    //    return (< div className={classes.Carousel} isSelected={ true } >
    //        <img className={classes.image} src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.URL} alt={item.Title} />
    //    </div >)
    //}

    //const modthing = (index, item) => {
    //   return <Modal
    //        aria-labelledby={item.Title}
    //        aria-describedby={item.Excerpt}
    //        className={classes.modal}
    //        open={true}
    //        closeAfterTransition
    //        BackdropComponent={Backdrop}
    //        BackdropProps={{
    //            timeout: 500,
    //        }}
    //    ><div>
    //            <img src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.LightBoxURL} alt={item.Title} />

    //            <Fade in={true}>
    //                <div className={classes.paper}>
    //                    <h2 id="transition-modal-title">{item.Title + " - " + dateConvert(item.DateCreated)}</h2>
    //                    <p id="transition-modal-description">{item.Excerpt}</p>
    //                </div>
    //            </Fade>
    //        </div>
    //    </Modal>

    //}

    return (
        <div className="root">
            <div className="Container"></div>
            {/*<div><Carousel className="Carousel" transitionTime={ 5000 } dynamicHeight={ true } autoPlay={true} infiniteLoop={true} stopOnHover={false} axis="vertical" showThumbs={false} showArrows={false} showStatus={false} showIndicators={false} selectedItem={selectedRange(items) }>*/}
            {/*{maptype(items)}*/}
        {/*</Carousel></div>*/}
            </div>
    );
};


export default CarouselFiles;
