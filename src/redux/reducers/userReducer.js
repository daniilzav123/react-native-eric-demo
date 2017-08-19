import { DemoActions } from "ReduxActions";
import defaultState from "./defaultState";

export default (state = defaultState.user, action) => {
  switch (action.type) {
		case DemoActions.SET_USER_ID: {
			const newState = { ...state };
			newState.id = action.payload;
			return newState;
		}
		case DemoActions.SET_USER_PASS: {
			const newState = { ...state };
			newState.pass = action.payload;
			return newState;
		}
    default:
      return state;
  }
};
