/**
 * @providesModule ReduxReducers
 */
import { combineReducers } from "redux";
import { sidebar } from "./sidebarReducer";
import user from "./userReducer";

export default combineReducers({
	sidebar,
  user
});
