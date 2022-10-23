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
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state: any, action: any) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User created! Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editBookingId: "",
      checkin: "",
      checkout: "",
      price: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    return { ...state, ...initialState };
  }

  if (action.type === CREATE_BOOKING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_BOOKING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Booking created!!",
    };
  }
  if (action.type === CREATE_BOOKING_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_BOOKINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_BOOKINGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      bookings: action.payload.bookings,
      totalBookings: action.payload.totalBookings,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_BOOKING) {
    const booking = state.bookings.find(
      (booking: any) => booking._id === action.payload.id
    );
    const {
      _id,
      roomType,
      checkin,
      checkout,
      price,
      firstName,
      lastName,
      email,
      phone,
      status,
    } = booking;
    return {
      ...state,
      isEditing: true,
      editBookingId: _id,
      roomType,
      checkin,
      checkout,
      price,
      firstName,
      lastName,
      email,
      phone,
      status,
    };
  }

  if (action.type === DELETE_BOOKING_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_BOOKING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_BOOKING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Booking Updated!",
    };
  }
  if (action.type === EDIT_BOOKING_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};
export default reducer;
