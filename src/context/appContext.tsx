import React, { useState, useReducer, useContext } from "react";
import axios, { AxiosError } from "axios";

import reducer from "./reducer";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actions";

const user = localStorage.getItem("user");

interface AppContextValue {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: any;
  registerUser: any;
  user: any;
}

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: "",
  registerUser: "",
  user: user ? JSON.parse(user) : null,
  token: null,
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

  const addUserToLocalStorage = ({ user }: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  const removeUserToLocalStorage = ({ user }: any) => {
    localStorage.removeItem("user");
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

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
