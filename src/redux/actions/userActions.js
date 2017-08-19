import { createAction } from "redux-actions";

export const SET_USER_ID = "SET_USER_ID";
const setUserName$ = createAction(SET_USER_ID);
export const setUserName = id => dispatch => dispatch(setUserName$(id));

export const SET_USER_PASS = "SET_USER_PASS";
const setUserAge$ = createAction(SET_USER_PASS);
export const setUserPass = pass => dispatch => dispatch(setUserAge$(pass));
