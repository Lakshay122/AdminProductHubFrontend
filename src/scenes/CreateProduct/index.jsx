import React, { useState } from "react";
import ProductForm from "../../components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch loading status from Redux state
  const isLoading = useSelector((state) => state.slice.loading.createProduct);

  const [initialValues, setInitialValues] = useState({});

  // Function to handle form submission
  const onFinish = async (values) => {

    
    const formData = new FormData();
    
    // Append each field from the form values to the FormData object
    Object.keys(values).forEach((key) => {
      if (key === "image" && values[key] instanceof File) {
        // Append image file separately
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });
    
    console.log(formData)

    await dispatch(createProduct(formData)).then((res) => {
      const NotAnyErrorOccurred = res.payload.success;
      if (NotAnyErrorOccurred) {
        setInitialValues({});
        navigate("/");
      }
    });
  };

  return (
    <div>
      <ProductForm
        initialValues={initialValues}
        isEditing={false} // Flag indicating it's not editing
        onFinish={onFinish}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateProduct;
