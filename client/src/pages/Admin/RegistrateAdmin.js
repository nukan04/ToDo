import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import axios from "axios"
import * as Yup from "yup"

function RegistrateAdmin(){
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required").min(4).max(12),
    });
    const onSubmit = (values) => {
        axios.post("http://localhost:5000/auth/registerAdmin", values).then((response) => {
            console.log("It work");
        });
    };
    return (
        <div classsName="RegistrateAdminPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name={"email"} component={"span"}/>
                    <Field id="inputRegAdmin" name="email" placeholder="email"/>
                    <label>Password: </label>
                    <ErrorMessage name={"password"} component={"span"}/>
                    <Field id="inputRegAdmin" name="password" placeholder="password"/>
                    <button type="submit">Registrate</button>
                </Form>
            </Formik>
        </div>
    );
}
export default RegistrateAdmin;