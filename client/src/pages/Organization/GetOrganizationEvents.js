
import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function GetOrganizationEvents() {
    const [listOfEvents, setListOfEvents] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            }
        }
        axios.get("http://localhost:5000/auth/getEvents", config).then((response) => {
            console.log(response.data);
            // response.data.map((d) => d)
            setListOfEvents(response.data);
        });
    }, []);
    return (
        <div>
            {listOfEvents.map((value, key) => {
                console.log(value);
                return (
                    <div className="get">
                        <br/>
                        <div className="event" onClick={()=>{navigate(`/getEvents/${value._id}`)}}>
                            <div>{value.title}</div>
                            <div>{value.description}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GetOrganizationEvents;
