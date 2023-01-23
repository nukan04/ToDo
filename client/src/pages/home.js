
import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";

function Home() {
    const [listOfEvents, setListOfEvents] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/auth/GetAllEvents").then((response) => {
            setListOfEvents(response.data);
        });
    }, []);
    return (
        <div>
        {listOfEvents.map((value, key) => {
            return (
                <div className="get">
                    <div>Hello</div>
                    <div className="title"> {value._id}</div>
                </div>
            );
        })}
    </div>
    );
};

export default Home;
