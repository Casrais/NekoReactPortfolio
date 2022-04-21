
import axios from "axios";
import { Console } from "console";
import React, * as react from "react";
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface iRating {
id: string | null;
    Rate: number;
UserName: string;
FileId: string | null;
DateCreated: any;
}

interface iProps {
    Props: string | null;
    user: {username: string;
            displayName: string;
            token: string | null;};
}


const RateMe : react.FC<iProps> = ({ Props, user }) => {

    const [item, setItem] = react.useState<iRating>({
        id: "",
        Rate: 0,
UserName: "",
FileId: Props,
DateCreated: "",
    });

    const [rating, setRating] = react.useState(0
    );

    const RetrieveData = async (id : string | null) => {
        const token = user.token;
        var file = await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Rating/UserFileRating`, {"FileId": Props, "UserName" : user.username},
                                                                { headers: { "Authorization": `Bearer ${token}` }}
                                                        ).then(response => { 
                                                                    if(response.data.Items[Object.keys(response.data.Items)[0]] != null) { 
                                                                                                            setItem(response.data.Items[Object.keys(response.data.Items)[0]]);
                                                                                                             }
                                                                            }
                                    )};

    react.useEffect(() => {
    RetrieveData(Props)
    }, [Props]);

react.useEffect(() => {
    RetrieveData(Props)
    }, [user]);

react.useEffect(() => {
    sendRating();
    RetrieveData(Props);
    }, [rating]);

    const sendRating = async () => { await axios.post(`https://nekocosmosapi.azurewebsites.net/api/Rating`, { "id": item.id, "Rate": rating, "UserName": user.username, "FileId": Props, "DateCreated": new Date().toISOString() }
                                                                                                    , { headers: { "Authorization": `Bearer ${user.token}` } });}


    const handleChange = async (event: any , rate : number | null) => {
        if (rate) {
        setRating(rate * 2);
                    }
    };

    const divStyle = {
        color: 'salmon'
    };

    return (
                    <div>
            <h3>Do you like it?:</h3><Rating style={divStyle} value={item.Rate / 2.00} onChange={(e, v) => handleChange(e, v)} precision={0.5}  className="Rating" icon={<FavoriteIcon fontSize="inherit"/>}/>
                    </div>
    )
};

export default RateMe;