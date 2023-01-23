import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import axios from "axios"
import * as Yup from "yup"
import parse from "date-fns/parse";

function RegistrateVolontier(){
    const initialValues = {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        phone: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required").min(4).max(12),
        firstname: Yup.string().required("Name is required").min(2).max(15),
        lastname: Yup.string().required("Name is required").min(2).max(15),
        birthdate: Yup.date()
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
        phone: Yup.number().required("Phone is required")   
    });
    const onSubmit = (values) => {
        axios.post("http://localhost:5000/auth/registrateVolontaire", values).then((response) => {
            console.log("It work");
        });
    };
    return (
        <div classsName="RegistrateVolontierPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name={"email"} component={"span"}/>
                    <Field id="inputRegVol" name="email" placeholder="email"/>
                    <label>Password: </label>
                    <ErrorMessage name={"password"} component={"span"}/>
                    <Field id="inputRegVol" name="password" placeholder="password"/>
                    <label>Firstname: </label>
                    <ErrorMessage name={"firstname"} component={"span"}/>
                    <Field id="inputRegVol" name="firstname" placeholder="firstname"/>
                    <label>Lastname: </label>
                    <ErrorMessage name={"lastname"} component={"span"}/>
                    <Field id="inputRegVol" name="lastname" placeholder="lastname"/>
                    <label>Birthdate: </label>
                    <ErrorMessage name={"birthdate"} component={"span"}/>
                    <Field id="inputRegVol" name="birthdate" placeholder="dd.mm.yyyy"/>
                    <label>Phone number: </label>
                    <ErrorMessage name={"phone"} component={"span"}/>
                    <Field id="inputRegVol" name="phone" placeholder="phone"/>
                    <button type="submit">Registrate</button>
                </Form>
            </Formik>
        </div>
    );
}
export default RegistrateVolontier;