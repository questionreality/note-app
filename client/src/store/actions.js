import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LOGOUT_USER,
  //UI reducer types
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  //Data reducer types
  SET_NOTES,
  SET_NOTE,
  DELETE_NOTE,
  POST_NOTE,
  EDIT_NOTE,
  MARK_IMP,
} from "./types";
import axios from "axios";

//USER-ACTIONS

export const loginUser = async ({ userData, history, route, dispatch }) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post(route, userData);
    setAuthorizationHeader(res.data.token);
    getUserData(dispatch);
    dispatch({ type: CLEAR_ERRORS });
    history.push("/notes");
  } catch (e) {
    dispatch({
      type: SET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const getUserData = async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const response = await axios.get("/users/me");
    dispatch({
      type: SET_USER,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
  }
};
const setAuthorizationHeader = (token) => {
  const setToken = `Bearer ${token}`;
  localStorage.setItem("token", setToken);
  axios.defaults.headers.common["Authorization"] = setToken;
};

export const editUserDetails = async (userDetails, dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.patch("/users/me", userDetails);
    getUserData(dispatch);
  } catch (e) {
    console.log(e);
  }
};
export const logOutUser = async (dispatch, history) => {
  try {
    await axios.post("/users/logout");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear();
    dispatch({ type: LOGOUT_USER });

    // history.push("/login");
  } catch (e) {
    console.log(e);
  }
};
export const logOutAllUser = async (dispatch, history) => {
  try {
    await axios.post("/users/logoutAll");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear();
    dispatch({ type: LOGOUT_USER });
    // history.push("/login");
  } catch (e) {
    console.log(e);
  }
};
//NOTE ACTIONS

export const getNotes = async (dispatch, queryParams) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(
      `/notes?sortBy=createdAt:desc&limit=${queryParams.limit}&skip=${queryParams.skip}`
    );
    dispatch({
      type: SET_NOTES,
      payload: res.data,
    });
    // dispatch({ type: STOP_LOADING_UI });
  } catch (e) {
    dispatch({
      type: SET_ERRORS,
      payload: [],
    });
  }
};
export const getNote = async (dispatch, id) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/notes/${id}`);
    dispatch({
      type: SET_NOTE,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      SET_ERRORS,
      payload: {},
    });
  }
};
export const editNote = async ({ dispatch, data, id }) => {
  try {
    const res = await axios.patch(`/notes/${id}`, data);
    // dispatch({
    //   type: EDIT_NOTE,
    //   payload: res.data,
    // });
  } catch (e) {
    console.log(e);
  }
};
export const postNote = async ({ data, dispatch }) => {
  try {
    dispatch({ type: LOADING_UI });
    const res = await axios.post("/notes", data);
    dispatch({
      type: POST_NOTE,
      payload: res.data,
    });
    // dispatch(clearErrors());
    dispatch({ type: STOP_LOADING_UI });
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: SET_ERRORS,
    //   payload: e.response.data,
    // });
  }
};
export const deleteNote = async (dispatch, id) => {
  try {
    console.log(id);
    const res = await axios.delete(`/notes/${id}`);
    dispatch({ type: DELETE_NOTE, payload: res.data });
  } catch (e) {
    console.log(e);
  }
};
export const clearErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
