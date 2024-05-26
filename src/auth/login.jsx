  // src/LoginPage.js
  import React from "react";
  import { Form, Input, Button, Checkbox } from "antd";
  import { UserOutlined, LockOutlined } from "@ant-design/icons";
  import "./styles.scss";
  import {  login } from "../utils/apiCalls";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";

  const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
      await dispatch(login(values)).then((res) => {
        const NotAnyErrorOccurred = res.payload.success;
        if (NotAnyErrorOccurred) {
          // save the token to localStorage
          const token = res.payload.token;
          const role = res.payload.data.type;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          //define user role
          const userRole = res.payload.data.type;

          if (userRole === "admin" && NotAnyErrorOccurred) {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }
      });
    };

    return (
      <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please log in to your account</p>
          </div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item></Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  export default LoginPage;
