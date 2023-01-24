import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import axios from "axios"
import * as Yup from "yup"
import parse from "date-fns/parse";

function LoginOrganization(){
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required").min(4).max(12),
    });
    const onSubmit = (values) => {
        axios.post("http://localhost:5000/auth/loginOrganization", values).then((response) => {
            if(response.data.error) alert(response.data.error);
            else{
            sessionStorage.setItem("token", response.data);
            console.log(response.data);
            }
        });
    };
    return (
        <div classsName="LoginOrganizationPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name={"email"} component={"span"}/>
                    <Field id="inputLogOrg" name="email" placeholder="email"/>
                    <label>Password: </label>
                    <ErrorMessage name={"password"} component={"span"}/>
                    <Field id="inputLogOrg" name="password" placeholder="password"/>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
}
export default LoginOrganization;