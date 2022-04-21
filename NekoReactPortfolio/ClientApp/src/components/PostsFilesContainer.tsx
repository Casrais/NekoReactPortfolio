import axios from "axios";
import { Console } from "console";
import React, * as react from "react";
import { Input } from "reactstrap";
import File from "./File";
import * as bootstrap from "react-bootstrap";

interface iFiles {Items: [{
    id: string | null;
    Title: string;
    PostId: null;
    Excerpt: string;
    URL: string;
    LightBoxURL: string;
    FileType: null;
    Medium: null;
    Category: null;
    CreatedBy: null;
    DateCreated: any;
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
        PostId: null,
        Excerpt: "",
        URL: "",
        LightBoxURL: "",
        FileType: null,
        Medium: null,
        Category: null,
        CreatedBy: null,
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
try {
        const token = user.token;
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/PostFiles/` + id, { headers: { "Authorization": `Bearer ${token}` } }).then(response => { setFileContainer(response.data)});
    }
catch (error) { throw error;}
}
    }

    react.useEffect(() => {
    RetrieveData(Props)
}, [checked]);


    const maptype = (files : iFiles["Items"]) => {
        if (Object.keys(files).length !== 0) {
            return files.map((files, idx) => 
                <File Props={files.id} user={user} key={idx}/>
            )}
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
            {checked && <bootstrap.Collapse in={checked}>
                        <div className="root">
                    {maptype(FileContainer.Items)}
                </div>
                </bootstrap.Collapse>}
            </div>
    );
};

export default FileUpdate;

