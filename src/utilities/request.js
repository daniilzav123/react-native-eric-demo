import AppConfig from "AppConfig";

export const RequestApi = (url, body = "", method = "GET") => {
	let header;
	if (method === "GET") {
		header = {
			method,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		};
	} else {
		header = {
			method,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		};
	}

	return new Promise((resolve, reject) => {
		fetch(url, header)
			.then(response => resolve(response.json()))
			.catch(error => reject(error));
	});
};

export const GetEvents = () => RequestApi(`${AppConfig.apiUrl}events`);
export const GetEventsWithState = region =>
	RequestApi(`${AppConfig.apiUrl}events?region=${region}`);

export const GetRushtixEventsWithState = region =>
	RequestApi(`${AppConfig.apiUrl}rushtix?region=${region}`);

export const PostFavorite = () =>
	RequestApi(`${AppConfig.apiUrl}favourite`, "", "POST");
export const Login = email =>
	RequestApi(`${AppConfig.apiUrl}login`, { email: email }, "POST");
export const Profile = user =>
	RequestApi(`${AppConfig.apiUrl}user`, user, "POST");
export const Subscribe = user =>
	RequestApi(`${AppConfig.apiUrl}subscribe`, user, "POST");

export const GetCategories = () => RequestApi(`${AppConfig.apiUrl}discover`);
