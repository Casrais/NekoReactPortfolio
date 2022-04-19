import axios from "axios";
import { Console } from "console";
import React, * as react from "react";
import { Input } from "reactstrap";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

interface iProps { Props: string; }

interface iItem {
    id: string;
    Title: string;
    PostId: { id: string };
    Excerpt: string;
    URL: string;
    LightBoxURL: string;
    FileType: string;
    Medium: {};
    Category: {};
    CreatedBy: {};
    DateCreated: Date;
    Rating: number;
}

const FileCarouselItem : react.FC<iProps> = ({ Props }) => {
    const [item, setItem] = react.useState<iItem>({ id:"", Title: "", PostId: {id:""},Excerpt: "", URL: "", LightBoxURL: "", FileType: "", Medium: [{}], Category: [{}], CreatedBy: [{}], DateCreated: new Date(), Rating:0});
    const [open, setOpen] = React.useState(false);

    const RetrieveData = async (id : string) => {
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/File/` + id).then(response => { setItem(response.data.Items[Object.keys(response.data.Items)[0]]);});
    }

    react.useEffect(() => {
    RetrieveData(Props)
    }, []);

    

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

    return (
        <div className="Carousel">
            <img className="image" src={"https://nekoportfoliofiles.blob.core.windows.net/portfolio-files/" + item.URL} alt={item.Title}/>
        </div>
    );
};

export default FileCarouselItem;

