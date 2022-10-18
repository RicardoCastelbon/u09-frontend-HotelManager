import React, { useState, useReducer, useContext } from "react";
import axios, { AxiosError } from "axios";

import reducer from "./reducer";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
} from "./actions";

const user = localStorage.getItem("user");

interface AppContextValue {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: any;
  registerUser: any;
  loginUser: any;
  user: any;
  showSidebar: boolean;
  toggleSidebar: any;
  logoutUser: any;
  updateUser: any;
  isEditing: boolean;
  editBookingId: string;
  roomTypeOptions: string[];
  roomType: string;
  checkin: string;
  checkout: string;
  price: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  statusOptions: string[];
  status: string;
  handleChange: any;
  clearValues: any;
  createJob: any;
}

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: "",
  registerUser: "",
  loginUser: "",
  user: user ? JSON.parse(user) : null,
  token: null,
  showSidebar: false,
  toggleSidebar: "",
  logoutUser: false,
  updateUser: "",
  isEditing: false,
  editBookingId: "",
  roomTypeOptions: ["single", "double", "triple"],
  roomType: "single",
  checkin: "",
  checkout: "",
  price: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  statusOptions: ["confirmed", "cancelled", "checkedIn", "checkedOut"],
  status: "confirmed",
  handleChange: "",
  clearValues: "",
  createJob: "",
};

const AppContext = React.createContext<AppContextValue>(initialState);

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const addUserToLocalStorage = ({ user }: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  const removeUserToLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalStorage();
  };

  const registerUser = async (currentUser: any) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        currentUser,
        { withCredentials: true }
      );
      console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user });
    } catch (error: any) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser: any) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        currentUser,
        { withCredentials: true }
      );
      console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user });
    } catch (error: any) {
      console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const updateUser = async (currentUser: any) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/v1/auth/updateUser",
        currentUser,
        { withCredentials: true }
      );
      const { user, token } = response.data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          logoutUser();
        }, 3000);
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }: any) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const {
        roomType,
        checkin,
        checkout,
        price,
        firstName,
        lastName,
        email,
        phone,
        status,
      } = state;
      await axios.post(
        "http://localhost:5000/api/v1/bookings",
        {
          roomType,
          checkin,
          checkout,
          price,
          firstName,
          lastName,
          email,
          phone,
          status,
        },
        { withCredentials: true }
      );
      dispatch({
        type: CREATE_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error: any) {
      if (error.response.status === 401) logoutUser();
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
