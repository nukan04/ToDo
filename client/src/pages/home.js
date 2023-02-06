
import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [listOfEvents, setListOfEvents] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/auth/GetAllEvents").then((response) => {
            setListOfEvents(response.data);
        });
    }, []);
    return (
        <div>
            <div>Events</div>
        {listOfEvents.map((value, key) => {
            return (
                <div className="event" onClick={()=>{navigate(`/event/${value._id}`)}}>
                    <div className="title"> {value.title}</div>
                    <div className="title"> {value.description}</div>
                </div>
            );
        })}
    </div>
    );
};

export default Home;
