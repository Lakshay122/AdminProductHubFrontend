import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const ProductForm = ({ initialValues, onFinish, isEditing, isLoading }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(initialValues?.image || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      form.setFieldsValue({ image: file }); // Set the file object in the form state
    }
  };

  const validateImage = (_, value) => {
    if (imageUrl || value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Please provide an image URL or upload a file.")
    );
  };

  return (
    <div className="create-product-container">
      <Button type="primary" onClick={() => navigate("/")}>
        <ArrowLeftOutlined />
        Back
      </Button>
      <h1 className="create-product-title">
        {isEditing ? "Edit Product" : "Create Product"}
      </h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the title!" }]}
        >
          <Input placeholder="Enter title" className="input-field" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <Input
            placeholder="Enter description"
            type="number"
            className="input-field"
          />
        </Form.Item>
        {/* {isEditing && ( */}
        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: true, validator: validateImage }]}
        >
          {imageUrl && (
            <div className="image-preview">
              <img
                src={imageUrl}
                alt="product"
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>
        {/* )} */}
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="submit-button"
          >
            {isEditing ? "Update Product" : "Create Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
