import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import axios from "axios"
import * as Yup from "yup"
import parse from "date-fns/parse";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

function LoginVolontier(){
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required").min(4).max(12),
    });
    const onSubmit = (values) => {
        axios.post("http://localhost:5000/auth/loginVolontaire", values).then((response) => {
            console.log(response.status);
            if(response.status === 200){
                sessionStorage.setItem("token", response.data);
                window.location.href = "/";
            }
            else alert(response.data.error);
        });
    };
    return (
        <div classsName="LoginVolontierPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name={"email"} component={"span"}/>
                    <Field id="inputLogVol" name="email" placeholder="email"/>
                    <label>Password: </label>
                    <ErrorMessage name={"password"} component={"span"}/>
                    <Field id="inputLogVol" name="password" placeholder="password"/>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
}
export default LoginVolontier;