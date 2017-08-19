import React from "react";
import { Provider } from "react-redux";
import { store } from "ReduxStore";
import { default as MainPage } from "./main";

export const App = () => (
	<Provider store={store}>
		<MainPage />
	</Provider>
);
