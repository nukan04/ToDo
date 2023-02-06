import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function GetById() {
    let {id} = useParams();
    const [eventObject, setEventObject] = useState({});
    const [listOfParticipantObject, setParticipantObject] = useState([]);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            }
        }
        axios.get(`http://localhost:5000/auth/getEvents/${id}`, config).then((response) => {
            console.log(response.data);
            setEventObject(response.data.event);
            setParticipantObject(response.data.participant);
        });
    }, []);
    return (
        <div>
            <div className="event">
                <div>{eventObject.title}</div>
                <div>{eventObject.description}</div>
                <div>{eventObject.date}</div>
                <div>{eventObject.numberOfParticipants}</div>
            </div>
            <div className="event">
                <div>Participants:</div>
                {listOfParticipantObject.map((value, key) => {
                    // console.log(value);
                    return (
                        <div className="get">
                            <br/>
                            <div className="event">
                                <div>{value.firstname}, {value.lastname} </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GetById;
