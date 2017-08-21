import AppConfig from "AppConfig";

export const RequestApi = (url, body, method="POST") => {
	let header;

	header = {
		method,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body
	};

	return new Promise((resolve, reject) => {
		fetch("http://amapi.ezymlm.net/" + url, header)
			.then(response => resolve(response.json()))
			.catch(error => reject(error));
	});
};
