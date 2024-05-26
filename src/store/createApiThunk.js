import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";

// Utility function to handle API calls and notifications
export const createApiThunk = (
  name, // Name for the action
  apiCall, //Api url which have to be called
  successMessage, // either we use given success message or use the message we get in the response of the api call
  transformResponse, // get the api response here
  transformErrorMessage = (error) => "An error occurred." // either we use given error message or use the message we get in the response of the api call
) =>
  createAsyncThunk(name, async (requestData) => {
    try {
      // call the api with requested data
      const response = await apiCall(requestData);

      // show success message
      if (successMessage)
        showSuccessNotification(
          typeof successMessage === "function"
            ? successMessage(response) // Call the callback function if it's provided
            : successMessage
        );
      // return the response (which can be accessed in redux slice with name action.payload)
      return transformResponse(response);
    } catch (error) {
      const errorMessage = transformErrorMessage(error);
      //   show error message
      if (errorMessage) showErrorNotification(errorMessage);

      //   return the error response
      return transformResponse(error.response);
    }
  });

//   All the success message shown here
const showSuccessNotification = (message) => {
  notification.success({
    message: message,
  });
};
//   All the error message shown here
const showErrorNotification = (message) => {
  notification.error({
    message: message,
  });
};
