import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import axios from "axios"
import * as Yup from "yup"

function RegistrateOrganization(){
    const initialValues = {
        email: "",
        password: "",
        name: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required").min(4).max(12),
        name: Yup.string().required("Name is required").min(2).max(15),
    });
    const onSubmit = (values) => {
        axios.post("http://localhost:5000/auth/registrateOrganization", values).then((response) => {
            console.log("It work");
        });
    };
    return (
        <div classsName="RegistrateOrganizationPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name={"email"} component={"span"}/>
                    <Field id="inputRegOrg" name="email" placeholder="email"/>

                    <label>Password: </label>
                    <ErrorMessage name={"Password"} component={"span"}/>
                    <Field id="inputRegOrg" name="password" placeholder="password"/>
                    <label>Name: </label>
                    <ErrorMessage name={"name"} component={"span"}/>
                    <Field id="inputRegOrg" name="name" placeholder="name"/>
                    <button type="submit">Registrate</button>
                </Form>
            </Formik>
        </div>
    );
}
export default RegistrateOrganization;