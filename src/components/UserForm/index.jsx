import React from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import "./styles.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserForm = ({ initialValues, onFinish, isEditing, isLoading }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
   console.log(isLoading)
  return (
    <div className="create-user-container">
      {/* Button to navigate back */}
      <Button type="primary" onClick={() => navigate("/")}>
        <ArrowLeftOutlined />
        Back
      </Button>
      {/* Title based on whether editing or creating User */}
      <h1 className="create-user-title">
        {isEditing ? "Edit User" : "Create User"}
      </h1>

      {/* Form component for User details */}
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        {/* Title input field */}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the Name!" }]}
        >
          <Input placeholder="Enter name" className="input-field" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter the Email!" }]}
        >
          <Input placeholder="Enter email" className="input-field" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter the password!" }]}
        >
          <Input placeholder="Enter password" className="input-field" />
        </Form.Item>
        <Form.Item
          name="phone_no"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter the phone!" }]}
        >
          <Input placeholder="Enter phone" className="input-field" />
        </Form.Item>
        {/* Description input field */}
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input.TextArea
            placeholder="Enter Address"
            rows={4}
            className="input-field"
          />
        </Form.Item>

        {/* Status selection for editing */}
        {isEditing && (
          <Form.Item name="status" label="Status">
            <Select
              options={[
                { value: "Completed", label: "Completed" },
                { value: "Not Completed", label: "Not Completed" },
              ]}
            />
          </Form.Item>
        )}
        {/* Submit button */}
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="submit-button"
          >
            {isEditing ? "Update User" : "Create User"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
