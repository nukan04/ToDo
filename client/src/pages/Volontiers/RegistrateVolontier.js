import React from "react";
import axios from "axios"
import "./Vcss.css"
import { useState } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
    DatePicker, Col, Row
} from 'antd';
const { Option } = Select;


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
function RegistrateVolontier(){

    const onFinish = (values) => {
        axios.post("http://localhost:5000/auth/registrateVolontaire", values).then((response) => {
            console.log("It work");
        });
    };

    const [form] = Form.useForm();
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="+7">+7</Option>
            </Select>
        </Form.Item>
    );

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    return (
        <Row>
            <Col span={6}></Col>
            <Col span={10}>
            <h1>Registration Volontier</h1>
            <Form
            className="register"
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{

                prefix: '+7',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="firstname"
                label="firstname"
                tooltip="Your name?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="lastname"
                label="lastname"
                tooltip="Your surname?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            {/*birthday*/}
            <Form.Item
                name="birthdate"
                label="birthdate"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    placeholder={"yyyy.mm.dd"}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
            </Col>
            <Col span={8}></Col>
        </Row>
    );
}
export default RegistrateVolontier;