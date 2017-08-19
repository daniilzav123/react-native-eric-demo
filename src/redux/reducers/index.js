/**
 * @providesModule ReduxReducers
 */
import { combineReducers } from "redux";
import { sidebar } from "./sidebarReducer";
import demo from "./userReducer";

export default combineReducers({
	sidebar,
  demo
});
