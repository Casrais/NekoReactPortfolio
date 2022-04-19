import axios from "axios";
import { Console } from "console";
import React, * as react from "react";
import { Input } from "reactstrap";
import File from "./File";
import { Form } from "react-bootstrap";

interface iFiles {response: [{
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
    const [FileContainer, setFileContainer] = react.useState<iFiles>({response: [{
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
        setChecked((prev) => !prev);
    };

    const RetrieveData = async (id : string | null) => {
        if(id){
        const token = user.token;
        await axios.get(`https://nekocosmosapi.azurewebsites.net/api/PostFiles/` + id, { headers: { "Authorization": `Bearer ${token}` } }).then(response => { response.data.Items ? setFileContainer(response.data.Items) : null;});
    }
    }

    react.useEffect(() => {
    RetrieveData(Props)
}, []);


    const maptype = function (files : iFiles["response"]) {
        if (Object.keys(files).length !== 0) {
            return files.map((response, idx) => <div><div className="ItemRow" key={idx}><File Props={response.id} user={user} /></div></div>)
        }
        else {
            return <div></div>
        }

    }


    return (
        <div>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                    checked={checked} onChange={handleChange}
                />
            </Form>
        <div className="root">
                {FileContainer.response && maptype(FileContainer.response)}
            </div>
            </div>
    );
};

export default FileUpdate;

