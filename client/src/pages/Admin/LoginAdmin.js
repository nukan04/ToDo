import React from "react"
import axios from "axios"
import {Formik, ErrorMessage, Form, Field} from "formik";
import * as Yup from "yup"
function LoginAdmin(){
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Email is required").min(4).max(16),
    })
    const onSubmit = (values) => {
        axios.post("http://localhost:5000/auth/loginAdmin", values).then((response)=>{
            console.log(response.data);
        });
    };
    return(
        <div className="LoginAdminPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="FormContainer">
                    <label>Email: </label>
                    <Field id="inputLogAdmin" name="email" placeholder="email"/>
                    <ErrorMessage name={"email"} component="email"/>
                    <label>Password: </label>
                    <Field id="inputLogAdmin" name="password" placeholder="password"/>
                    <ErrorMessage name={"password"} component="password"/>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
}
export default LoginAdmin;