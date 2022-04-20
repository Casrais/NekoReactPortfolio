import axios from "axios";
import { Console } from "console";
import React, * as react from "react";
import { Input } from "reactstrap";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Modal, Card, Carousel } from 'react-bootstrap';


interface iProps {
    Props: string | null;
    user: {username: string;
            displayName: string;
            token: string | null;};
}

interface iItem {
    id: string | null;
    Title: string;
    PostId: [{id : string}];
    Excerpt: string;
    URL: string;
    LightBoxURL: string;
    FileType: string;
    Medium: [{id : string}];
    Category: [{id : string}];
    CreatedBy: [{id : string}];
    DateCreated: Date;
    Rating: number;
}

const File : react.FC<iProps> = ({ Props, user }) => {
    const [item, setItem] = react.useState<iItem>({
        id: "",
        Title: "",
        PostId: [{id: ""}],
        Excerpt: "",
        URL: "",
        LightBoxURL: "",
        FileType: "",
        Medium: [{id: ""}],
        Category: [{id: ""}],
        CreatedBy: [{id: ""}],
        DateCreated: new Date("1/1/1900"),
        Rating: 0,
});
    const [isOpen, setOpen] = react.useState(false);

    const RetrieveData = async (id : string | null) => {
        if(id) {
        const token = user.token;
        var file = await axios.get(`https://nekocosmosapi.azurewebsites.net/api/File/` + id, { headers: { "Authorization": `Bearer ${token}` } }).then(response => { console.log(response); if(response.data) { setItem(response.data.Items[Object.keys(response.data.Items)[0]])}});
        }
        }

    react.useEffect(() => {
    RetrieveData(Props)
    }, []);

react.useEffect(() => {
    RetrieveData(Props)
    }, [user]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


        const smallItemStyles: React.CSSProperties = {
            cursor: 'pointer',
            objectFit: 'cover',
            width: '100%',
            maxHeight: '100%',
    }

    const dateConvert = (dateinput : Date) => {
        var date = new Date(dateinput);
        var DateCon = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
        return DateCon
    }

const FileURL = () => {if (item.URL) { return "https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.URL } else { return "" } }

const LightboxURL = () => {if (item.LightBoxURL) { return "https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.LightBoxURL } else { return "" } }

    return (
        <Carousel.Item>
            <img className="image" src={FileURL()} alt={item.Title} onClick={handleOpen}/>
            <Carousel.Caption>
          <h3>{item.Title}</h3>
          <p>{item.Excerpt}</p>
        </Carousel.Caption>
            <Modal show={isOpen} onHide={handleClose}><div className="imageModal">
                    <img className="imageModalwdth" src={LightboxURL()} alt={item.Title} />
                    
                    <Modal.Title>{ item.Title+" - "+ dateConvert(item.DateCreated)}</Modal.Title>
                            <Modal.Footer><p>{item.Excerpt}</p>
                            <h3>Neko's rating:</h3><Rating value={item.Rating / 2.00} readOnly precision={0.1} icon={<FavoriteIcon fontSize="inherit" />}/>
                            </Modal.Footer>
                    </div>
            </Modal>
</Carousel.Item>
    )
};

export default File;

