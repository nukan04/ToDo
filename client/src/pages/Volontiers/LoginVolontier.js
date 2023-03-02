import React from "react";
import {Formik, Field, ErrorMessage} from "formik";
import axios from "axios"
import * as Yup from "yup"
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import './Vcss.css';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginVolontier(){

    const onFinish = (values) => {
        axios.post("http://localhost:5000/auth/loginVolontaire", values).then((response) => {
           // console.log(response.status);
            if(response.status === 200){
                sessionStorage.setItem("token", response.data);
                window.location.href = "/";
            }
            else {
                console.log("Wrong email or password");
                alert("Wrong email or password");
            }
        });
    };
    return (
        <Row>
            <Col span={8}></Col>
            <Col span={8}>
                <h1>Volontier Login</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        email: "",
                        password: "",
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}></Col>
        </Row>
    )
}
export default LoginVolontier;