import React, { useState } from "react";
import UserForm from "../../components/UserForm";
import { useDispatch, useSelector } from "react-redux";
import {  createUser } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch loading status from Redux state
  const isLoading = useSelector((state) => state.slice.loading.createUser);

  const [initialValues, setInitialValues] = useState({});

  // Function to handle form submission
  const onFinish = async (values) => {
    await dispatch(createUser(values)).then((res) => {
      const NotAnyErrorOccurred = res.payload.success;
      if (NotAnyErrorOccurred) {
        setInitialValues({});
        navigate("/");
      }
    });
  };

  return (
    <div>
      <UserForm
        initialValues={initialValues}
        isEditing={false} // Flag indicating it's not editing
        onFinish={onFinish}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateUser;
