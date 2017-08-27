import { createAction } from "redux-actions";

export const SET_USER_ID = "SET_USER_ID";
const setUserName$ = createAction(SET_USER_ID);
export const setUserName = id => dispatch => dispatch(setUserName$(id));

export const SET_USER_PASS = "SET_USER_PASS";
const setUserAge$ = createAction(SET_USER_PASS);
export const setUserPass = pass => dispatch => dispatch(setUserAge$(pass));

export const SET_USER_AVATAR = "SET_USER_AVATAR";
const setUserAvatar$ = createAction(SET_USER_AVATAR);
export const setUserAvatar = avatar => dispatch => dispatch(setUserAvatar$(avatar));
