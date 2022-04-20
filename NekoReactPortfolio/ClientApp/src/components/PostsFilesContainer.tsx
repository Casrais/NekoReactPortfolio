import axios from "axios";
import { Console } from "console";
import React, * as react from "react";
import { Input } from "reactstrap";
import File from "./File";
import * as bootstrap from "react-bootstrap";

interface iFiles {Items: [{
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
}]}

interface iProps {
    Props: string;
    user: {
        username: string;
        displayName: string;
        token: string | null;
    };
}

const FileUpdate : react.FC<iProps> = ({ Props, user }) => {
    const [FileContainer, setFileContainer] = react.useState<iFiles>({Items: [{
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
}]});
    const [checked, setChecked] = react.useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

  const [index, setIndex] = react.useState(0);

  const handleSelect = (selectedIndex : number, e : any) => {
    setIndex(selectedIndex);
  };

    const RetrieveData = async (id : string | null) => {
        if(id){
        const token = user.token;
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/PostFiles/` + id, { headers: { "Authorization": `Bearer ${token}` } }).then(response => { console.log(response); setFileContainer(response.data)});
    }
    }

    react.useEffect(() => {
    RetrieveData(Props)
}, []);


    const maptype = (files : iFiles["Items"]) => {
        if (Object.keys(files).length !== 0) {
            return files.map((files, idx) => 
                <div className="ItemRow" key={idx}>
                <File Props={files.id} user={user} />
            </div>)}
        else {
            return  <div><bootstrap.Carousel.Item></bootstrap.Carousel.Item></div>
        }

    }


    return (
        <div>
            <bootstrap.Form>
  <bootstrap.Button
    onClick={() => {handleChange()}}
  >click to expand</bootstrap.Button>
</bootstrap.Form>
        {checked && <div className="root">
                <bootstrap.Carousel activeIndex={index} onSelect={handleSelect}>
                    {maptype(FileContainer.Items)}
                </bootstrap.Carousel>
            </div>}
            </div>
    );
};

export default FileUpdate;

