import React from "react";
import ProductForm from "../../components/ProductForm";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../utils/apiCalls";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.slice.loading.updateProduct);
  const initialValues = location?.state?.initialValues || {};
  console.log("initialValues", initialValues);

  // Format due date using dayjs library so that default value can be setted to ant design datepicker
  initialValues.dueDate = dayjs(initialValues.dueDate);

  // Function to handle form submission for updating a product
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

    // Append additional data if needed
    formData.append("id", initialValues._id);

    // Dispatch API call to update the product
    await dispatch(updateProduct({ id: initialValues._id, formData })).then(
      (res) => {
        console.log(res);
        if (res?.payload?.success) {
          navigate("/");
        }
      }
    );
  };
  return (
    <div>
      <ProductForm
        isEditing={true} // Flag indicating it's in editing mode
        onFinish={onFinish}
        initialValues={initialValues}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditProduct;
