import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import parse from "date-fns/parse";

function CreateEvent() {
    const initialValues = {
        name: "",
        birthDate: "",
        description: "",
        numberOfParticipants: "",

    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        date: Yup.date()
            .transform(function (value, originalValue) {
                if (this.isType(value)) {
                    return value;
                }
                const result = parse(originalValue, "dd.MM.yyyy", new Date());
                return result;
            })
            .typeError("please enter a valid date")
            .required()
            .min("1969-11-13", "Date is too early"),
        description: Yup.string().required("Description is required"),
        numberOfParticipants: Yup.number().required("Number of participants is required"),
    });
    const onSubmit = (values) => {
        const config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            }
        }
        axios.post("http://localhost:5000/auth/createEvent", values, config).then((response) => {
                console.log("It work");
        });
    };
    return (
        <div className="createEventPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name={"title"} component={"span"}/>
                    <Field id="inputCreateEvent" name="title" placeholder="title"/>

                    <label>Description: </label>
                    <ErrorMessage name={"description"} component={"span"}/>
                    <Field id="inputCreateEvent" name="description" placeholder="description"/>
                    <label>Date: </label>
                    <ErrorMessage name={"date"} component={"span"}/>
                    <Field id="inputCreateEvent" name="date" placeholder="date"/>
                    <label>numberOfParticipants: </label>
                    <ErrorMessage name={"numberOfParticipants"} component={"span"}/>
                    <Field id="inputCreateEvent" name="numberOfParticipants" placeholder="numberOfParticipants"/>
                    <button type="submit">Create Event</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateEvent;