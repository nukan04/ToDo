import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function SubscribeUnsubscribe() {
    let {id} = useParams();
    const [eventObject, setEventObject] = useState({});
    const [statusObject, setStatusObject] = useState();
    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            }
        }
        axios.get(`http://localhost:5000/auth/v/getEvent/${id}`, config).then((response) => {
            console.log(response);
            setEventObject(response.data.event);
            setStatusObject(response.data.status);
            //console.log(status);
        });
    }, []);
    function onSubmit(id, subscribe){
        console.log("submitting...");
        const data = {id};
        console.log(data);
        const config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            }
        }
        if (subscribe == "subscribe") {
            axios.post("http://localhost:5000/auth/v/subscribe", data, config).then((response) => {

                console.log("subscribed");
                window.location.reload();
            });
        } else {
            axios.post("http://localhost:5000/auth/v/unsubscribe", data, config).then((response) => {
                console.log("unsubscribed");
                window.location.reload();
            });
        }
    }
    return (
        <div>
            <div className="event" >
                <div>{eventObject.title}</div>
                <div>{eventObject.description}</div>
                <div>{eventObject.date}</div>
                <div>{eventObject.numberOfParticipants}</div>
                <div>{eventObject._id}</div>
                <button onClick={() => onSubmit(eventObject._id, statusObject)}>{statusObject}</button>
            </div>
        </div>
    );
};

export default SubscribeUnsubscribe;
