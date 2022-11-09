import React, { useReducer, useContext } from "react";
import axios from "axios";

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
  CREATE_BOOKING_BEGIN,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_ERROR,
  GET_BOOKINGS_BEGIN,
  GET_BOOKINGS_SUCCESS,
  SET_EDIT_BOOKING,
  DELETE_BOOKING_BEGIN,
  EDIT_BOOKING_BEGIN,
  EDIT_BOOKING_SUCCESS,
  EDIT_BOOKING_ERROR,
  CLEAR_FILTERS,
  CREATE_EMPLOYEE_BEGIN,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  GET_EMPLOYEES_BEGIN,
  GET_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEE_BEGIN,
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
  createBooking: any;
  bookings: any[];
  totalBookings: number;
  numOfPages: number;
  page: number;
  getBookings: any;
  setEditBooking: any;
  deleteBooking: any;
  editBooking: any;
  search: string;
  searchStatus: string;
  sort: string;
  sortOptions: string[];
  clearFilters: any;
  employeeName: string;
  employeeLastName: string;
  employeeEmail: string;
  employeePassword: string;
  employeeSalary: number;
  createEmployee: any;
  employees: any[];
  getEmployees: any;
  deleteEmployee: any;
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
  createBooking: "",
  bookings: [],
  totalBookings: 0,
  numOfPages: 1,
  page: 1,
  getBookings: "",
  setEditBooking: "",
  deleteBooking: "",
  editBooking: "",
  search: "",
  searchStatus: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  clearFilters: "",
  employeeName: "",
  employeeLastName: "",
  employeeEmail: "",
  employeePassword: "",
  createEmployee: "",
  employeeSalary: 0,
  employees: [],
  getEmployees: "",
  deleteEmployee: null,
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

  const registerUser = async (currentUser: object) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
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

  const loginUser = async (currentUser: object) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
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

  const updateUser = async (currentUser: object) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/auth/updateUser`,
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

  const createBooking = async () => {
    dispatch({ type: CREATE_BOOKING_BEGIN });
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
        `${process.env.REACT_APP_API_URL}/bookings`,
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
        type: CREATE_BOOKING_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error: any) {
      if (error.response.status === 401) {
        setTimeout(() => {
          logoutUser();
        }, 3000);
      }
      dispatch({
        type: CREATE_BOOKING_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  /* CRUD BOOKINGS */
  const getBookings = async () => {
    const { search, searchStatus, sort } = state;
    let url = `${process.env.REACT_APP_API_URL}/bookings?status=${searchStatus}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_BOOKINGS_BEGIN });
    try {
      const response = await axios.get(url, { withCredentials: true });
      const { bookings, totalBookings, numOfPages } = response.data;
      console.log(response.data);

      dispatch({
        type: GET_BOOKINGS_SUCCESS,
        payload: {
          bookings,
          totalBookings,
          numOfPages,
        },
      });
    } catch (error: any) {
      console.log(error.response);
      if (error.response.status === 401) {
        setTimeout(() => {
          //logoutUser();
        }, 3000);
      }
    }
    clearAlert();
  };
  const deleteBooking = async (id: number) => {
    dispatch({ type: DELETE_BOOKING_BEGIN });
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/bookings/${id}`, {
        withCredentials: true,
      });
      getBookings();
    } catch (error: any) {
      if (error.response.status === 401) {
        setTimeout(() => {
          //logoutUser();
        }, 3000);
      }
    }
  };
  const setEditBooking = (id: number) => {
    dispatch({ type: SET_EDIT_BOOKING, payload: { id } });
  };
  const editBooking = async () => {
    dispatch({ type: EDIT_BOOKING_BEGIN });
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

      await axios.patch(
        `${process.env.REACT_APP_API_URL}/bookings/${state.editBookingId}`,
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
        {
          withCredentials: true,
        }
      );
      dispatch({ type: EDIT_BOOKING_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error: any) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_BOOKING_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  /* CRUD EMPLOYEES */
  const createEmployee = async () => {
    dispatch({ type: CREATE_EMPLOYEE_BEGIN });
    try {
      const {
        employeeName,
        employeeLastName,
        employeeEmail,
        employeePassword,
        employeeSalary,
      } = state;
      await axios.post(
        `${process.env.REACT_APP_API_URL}/employees`,
        {
          name: employeeName,
          lastName: employeeLastName,
          email: employeeEmail,
          password: employeePassword,
          salary: employeeSalary,
        },
        { withCredentials: true }
      );
      dispatch({
        type: CREATE_EMPLOYEE_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error: any) {
      if (error.response.status === 401) {
        setTimeout(() => {
          logoutUser();
        }, 3000);
      }
      dispatch({
        type: CREATE_EMPLOYEE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
    getEmployees();
  };
  const getEmployees = async () => {
    dispatch({ type: GET_EMPLOYEES_BEGIN });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/employees`,
        {
          withCredentials: true,
        }
      );
      const { employees } = response.data;
      dispatch({
        type: GET_EMPLOYEES_SUCCESS,
        payload: {
          employees,
        },
      });
    } catch (error: any) {
      console.log(error);
      clearAlert();
    }
  };
  const deleteEmployee = async (id: number) => {
    dispatch({ type: DELETE_EMPLOYEE_BEGIN });
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        withCredentials: true,
      });
      getEmployees();
    } catch (error: any) {
      if (error.response.status === 401) {
        setTimeout(() => {
          //logoutUser();
        }, 3000);
      }
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
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
        createBooking,
        getBookings,
        setEditBooking,
        deleteBooking,
        editBooking,
        clearFilters,
        createEmployee,
        getEmployees,
        deleteEmployee,
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
